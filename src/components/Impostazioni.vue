<script setup lang='ts'>
  import { ref } from 'vue';
  import { loggedUser, clearLoggedUser } from '../states/loggedUser';

  const HOST = import.meta.env.API_HOST || `http://localhost:8080`;

  async function conferma() {
    let risposta = confirm("Sei sicuro di voler eliminare il tuo account dalla piattaforma?");
    if (risposta) {
      
      try {
        const response = await fetch(HOST + '/api/eliminaAccount', {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json', 'x-access-token': loggedUser.token || "" },
          body: JSON.stringify({
            idUtente: loggedUser.id || "",
          })
        })

        if (response.status !== 204) {
          const message = JSON.parse(await response.text());
          alert(message.message)
          return; 
        }
        
        alert("Account eliminato")
        clearLoggedUser();
      } catch(err) {
          console.log(err);
      }
  
    }
  }
</script>

<template>
  <h2 class="green">Impostazioni</h2>
  <h2>Eliminazione account</h2>
  <br/>
  <label>Elimina il tuo account<button @click="conferma()">Clicca qui</button></label>
</template>

<style>
  label {
    display: flex;
    flex-direction: row;
    text-align: right;
    width: 400px;
    line-height: 26px;
    margin-bottom: 10px;
  }

  button {
    height: 20px;
    flex: 0 0 200px;
    margin-left: 10px;
  }
</style>