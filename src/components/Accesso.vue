<script setup lang='ts'>
  import { ref } from 'vue';
  import { loggedUser, setLoggedUser, clearLoggedUser } from '../states/loggedUser';
  
  import * as Vue from 'vue';
  const { inject } = Vue;
  const $HOST = inject('HOST');

  const HOST = $HOST || `http://localhost:8080`;

  const email = ref('test@gmail.com');
  const password = ref('1234#');
  
  const emit = defineEmits(['login', 'logout']);

  async function login() {
    // https://stackoverflow.com/questions/70772238/javascript-fetch-api-use-custom-error-message
    try {
      const response = await fetch(HOST + '/api/auth/accesso', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: email.value,
          password: password.value
        }),
      })

      if (response.status !== 200) {
        const message = JSON.parse(await response.text());
        alert(message.message)
        return;
      }
      
      const data = await response.json();
      setLoggedUser({ id: data.id, email: data.email, tipoAccount: data.tipoAccount, token: data.token })

      emit('login', loggedUser);
    } catch (error) {
      console.log(error);
    }
  }
  function logout() {
    clearLoggedUser();
    emit('logout');
  }
</script>

<template>
  <div class='modulo'>
    <div v-if="!loggedUser.token">
      <h1 class='green'>Accesso</h1>
      <form>
        <label>Indirizzo email:<input name="email" v-model="email" /></label>
        <label>Password:<input type="password" name="password" v-model="password" /></label>
        <button type="button" @click="login">LogIn</button>
      </form>
    </div>
    <div v-else>
      <h2>Bentornato {{ loggedUser.email }}</h2>
      <button type="button" @click="logout">Logout</button>
    </div>
  </div>
</template>

<style scoped>
/*
  https://stackoverflow.com/questions/17275707/how-do-i-evenly-add-space-between-a-label-and-the-input-field-regardless-of-leng
 */
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

input {
  height: 20px;
  flex: 0 0 200px;
  margin-left: 10px;
}

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
