<script setup lang='ts'>
  import { ref } from 'vue';
  import { loggedUser, setLoggedUser, clearLoggedUser } from '../states/loggedUser';
  
  import * as Vue from 'vue';
  const { inject } = Vue;
  const $HOST = inject('HOST');

  const HOST = $HOST || `http://localhost:8080`;

  const email = ref('test@gmail.com');
  const password = ref('1234#');
  const conferma = ref('1234#');
  const tipoAccount = ref('standard');
  
  const emit = defineEmits(['login', 'logout']);

  async function registrazione() {

    if (!validateEmail(email.value)) {
      alert('Il campo email deve contenere una stringa non vuota in formato email');
      return;
    }
    if (!validatePassword(password.value)) {
      alert('Il campo password deve avere una lunghezza minima di 8 caratteri, una lettera maiuscola, una lettera minuscola, un carattere speciale (%&#!@*^)');
      return;
    }
    if (password.value !== conferma.value) {
      alert('I valori del campo password e conferma password devono essere uguali');
      return;
    }
    
    try {
      const response = await fetch(HOST + '/api/auth/registrazione', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: email.value,
        password: password.value,
        tipoAccount: tipoAccount.value
      }),
    });

      if (response.status !== 201) {
        const message = JSON.parse(await response.text());
        alert(message.message)
        return;
      }
      
      const data = await response.json();
      setLoggedUser({ id: data.id, email: data.email, tipoAccount: data.tipoAccount, token: data.token })

      emit('login', loggedUser);

      return;
        
    } catch (error) {
      console.log(error);
    }

  }
  function logout() {
    clearLoggedUser();
    emit('logout');
  }
  function validateEmail(text: string) {
      var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(text);
  }
  // Password valida: lunghezza >= 8 caratteri, una maiuscola, una minuscola, un carattere speciale (%&#!@*^)
  function validatePassword(text: string) {
      var re = /^((?=.*[a-z])(?=.*[A-Z])(?=.*[%&#!@\*\^]).{8,})$/;
      return re.test(text);
}
</script>

<template>
  <div class="modulo">
    <div v-if="!loggedUser.token">
      <h1 class="green">Registrazione</h1>
      <form>
          <label>Indirizzo email: <input name="email" v-model="email"></label>
          <label>Password: <input name="password" v-model="password"></label>
          <label>Conferma password: <input name="conferma" v-model="conferma"></label>
          <label>Tipo account:
              <select name="tipoAccount" v-model="tipoAccount">
                <option value="standard">Standard</option>
                <option value="creator">Creator</option>
              </select>
          </label>

          <button type="button" @click="registrazione">Registrati</button>
      </form>
    </div>
    <div v-else>
      <h2>Bentornato {{ loggedUser.email }}</h2>
      <button type="button" @click="logout">Logout</button>
    </div>

  </div>
</template>

<style scoped>

form {
    text-align: center;
}

label {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  text-align: right;
  width: 400px;
  line-height: 26px;
  margin-bottom: 10px;
}

input, select {
  height: 20px;
  flex: 0 0 200px;
  margin-left: 10px;
}

select { width: 400px; text-align-last:center; }

h1 {
  font-weight: 500;
  font-size: 2.6rem;
  top: -10px;
}

h3 {
  font-size: 1.2rem;
}

.modulo h1 {
  text-align: center;
}
</style>
