<script setup lang='ts'>
  import { ref } from 'vue';
  import { loggedUser } from '../states/loggedUser';
  import { setModifiche } from '../states/modifiche';
  
  import * as Vue from 'vue';
  const { inject } = Vue;
  const $HOST = inject('HOST');

  const HOST = $HOST || `http://localhost:8080`;

  const risultati:any = ref([])
  const testo = ref('Titolo');

  let effettuata = false;

  async function ricerca() {
    try {
      const response = await fetch(HOST + '/api/ricerca/' + testo.value, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json', 'x-access-token': loggedUser.token || "" }
      })
      
      risultati.value = await response.json();
    } catch (error) {
      console.log(error);
    }

    effettuata = true;
  }

  async function aggiungiAiPreferiti(id: string) {
    try {
      const response = await fetch(HOST + '/api/preferiti/modifica', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json', 'x-access-token': loggedUser.token || "" },
        body: JSON.stringify({
          idUtente: loggedUser.id || "",
          idBrano: id,
          azione: 'aggiunta'
        })
      })

      if (response.status !== 200) {
        const message = JSON.parse(await response.text());
        alert(message.message)
        return; 
      }

      alert("Brano aggiunto ai preferiti");
      setModifiche(id);
    } catch (error) {
      console.log(error);
    }
  }

</script>

<template>
  <h2 class="green">Ricerca</h2>
  <label>Titolo di un brano:<input name="testo" v-model="testo"></label><button @click="ricerca()">Cerca</button>
  <br/>
  <h3 v-if="effettuata">Risultati:</h3>
  <ul>
    <li v-for="risultato in risultati" :key=risultato._id>
      {{ risultato.nome }}
      -
      <button v-on:click="aggiungiAiPreferiti(risultato._id)">Aggiungi a preferiti</button>
  </li>
  </ul>
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

  input {
    height: 20px;
    flex: 0 0 200px;
    margin-left: 10px;
  }
</style>