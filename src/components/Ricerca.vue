<script setup lang='ts'>
  import { ref, watch } from 'vue';
  import { loggedUser } from '../states/loggedUser';
  import { modifiche } from '../states/modifiche';
  import { setModifiche } from '../states/modifiche';
  
  import * as Vue from 'vue';
  const { inject } = Vue;
  const $HOST = inject('HOST');

  const HOST = $HOST || `http://localhost:8080`;

  const risultati:any = ref([])
  const testo = ref('Titolo');

  let effettuata = false;

  watch(modifiche, async (nuove, vecchie) => {
    await ricerca();
  }, { deep: true, immediate: true});

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

  async function modificaBrano(brano:any) {
    let validi = true;
    let titolo = ""
    let tags

    do {
      validi = true;

      titolo = prompt('Imposta titolo (campo obbligatorio)', brano.nome) || "";
      tags = prompt('Imposta tags', brano.tags) || "";

      if (titolo == "") validi = false;

    } while (!validi);

    try {
      const response = await fetch(HOST + '/api/brano', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json', 'x-access-token': loggedUser.token || "" },
        body: JSON.stringify({
          idBrano: brano._id,
          nomeBrano: titolo,
          tags: tags.split(',')
        }),
      });

      if (response.status !== 200) {
        const message = JSON.parse(await response.text());
        alert(message.message)
        return;
      }
      alert('Brano modificato!');
      setModifiche(brano._id);
    } catch (error) {
      console.log(error);
    }
  }
  async function eliminaBrano(brano:any) {
    // Conferma aggiuntiva
    if (brano.artista !== loggedUser.id) {
      alert('Non puoi eliminare il brano selezionato')
      return;
    }

    let conferma = confirm(`Sei sicuro di voler eliminare il brano ${brano.nome}?`);

    if (!conferma) {
      return;
    }

    try {
      const response = await fetch(HOST + '/api/brano/', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json', 'x-access-token': loggedUser.token || "" },
        body: JSON.stringify({
          idBrano: brano._id
        }),
      });

      if (response.status !== 204) {
        const message = JSON.parse(await response.text());
        alert(message.message)
        return;
      }
      alert('Brano eliminato!');
      setModifiche(brano._id);
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
      {{ risultato.nome }} (durata: {{ risultato.durata }}s), tags: {{ risultato.tags.join(', ') }}
      <br/>
      <button v-on:click="aggiungiAiPreferiti(risultato._id)">Aggiungi a preferiti</button>
      <button v-if="loggedUser.tipoAccount==='creator' && loggedUser.id===risultato.artista" v-on:click="modificaBrano(risultato)">Modifica</button>
      <button v-if="loggedUser.tipoAccount==='creator' && loggedUser.id===risultato.artista" v-on:click="eliminaBrano(risultato)">Elimina</button>
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