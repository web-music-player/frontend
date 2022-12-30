<script setup lang='ts'>
  import { ref, onMounted, watch } from 'vue';
  import { loggedUser } from '../states/loggedUser';
  import { modifiche, setModifiche } from '../states/modifiche';
  
  import * as Vue from 'vue';
  const { inject } = Vue;
  const $HOST = inject('HOST');

  const HOST = $HOST || `http://localhost:8080`;

  const preferiti:any = ref([])
  const temp:any = ref([])

  watch(loggedUser, async (_loggedUser, _prevLoggedUser) => {
    await caricaPreferiti();
  });

  watch(modifiche, async (nuove, vecchie) => {
    await caricaPreferiti()
  }, { deep: true, immediate: true});

  async function caricaPreferiti() {
    if (!loggedUser.token) {
      preferiti.value = []
      temp.value = []
      return;
    }

    try {
      const response = await fetch(HOST + '/api/preferiti/' + loggedUser.id, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json', 'x-access-token': loggedUser.token || "" }
      })
      
      if (response.status !== 200) {
        const message = JSON.parse(await response.text());
        alert(message.message)
        return; 
      }

      const data:string[] = (await response.json()).idBrani;
      temp.value = [];

      await data.forEach(async (id) => {
        let brano = await ottieniBrano(id)
        temp.value.push(brano)
      })

      preferiti.value = temp.value;

    } catch(err) {
        console.log(err);
    }
  }

  async function ottieniBrano(id: string) {

    const brano = await fetch(HOST + '/api/brano/' + id, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json', 'x-access-token': loggedUser.token || "" }
    });
    
    if (brano.status !== 200) {
      const message = JSON.parse(await brano.text());
      alert(message.message)
      return; 
    }
    let oggetto = await brano.json();
    return oggetto;
  }

  async function rimuoviDaiPreferiti(id: string) {
    try {
      const response = await fetch(HOST + '/api/preferiti/modifica', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json', 'x-access-token': loggedUser.token || "" },
        body: JSON.stringify({
          idUtente: loggedUser.id || "",
          idBrano: id,
          azione: 'rimozione'
        })
      })

      if (response.status !== 200) {
        const message = JSON.parse(await response.text());
        alert(message.message)
        return; 
      }

      alert("Brano rimosso dai preferiti");
      await caricaPreferiti();

    } catch (error) {
      console.log(error);
    }
  }

</script>

<template>
  <h2 class="green">Preferiti</h2>
    <h3>Lista preferiti</h3>
    <br/>
    <ul>
      <li v-for="preferito in preferiti">
        {{ preferito.nome }}
        -
        <button v-on:click="rimuoviDaiPreferiti(preferito.id)">Rimouvi dai preferiti</button>
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