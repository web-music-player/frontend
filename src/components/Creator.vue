<script setup lang="ts">
  import { loggedUser } from '../states/loggedUser';
  import { ref } from 'vue';

  import * as Vue from 'vue';
  const { inject } = Vue;
  const $HOST = inject('HOST');

  const HOST = $HOST || `http://localhost:8080`;

  const titolo = ref('Titolo');
  const durata = ref('120');
  const tags = ref(['pop', 'rock']);

  async function inserisciBrano() {
    if (!titolo.value || !durata.value) {
        alert('Il titolo e la durata non possono essere omessi');
        return;
    }

    let temp = parseInt(durata.value);

    if (isNaN(temp) || temp < 1) {
        alert('Il valore inserito per la durata deve essere un numero intero positivo');
        return;
    }

    try {
      const response = await fetch(HOST + '/api/brano/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-access-token': loggedUser.token || "" },
      body: JSON.stringify({
        nomeBrano: titolo.value,
        idUtente: loggedUser.id,
        durata: parseInt(durata.value),
        tags: tags.value
      }),
    });

      if (response.status !== 201) {
        const message = JSON.parse(await response.text());
        alert(message.message)
        return;
      }
      alert('Brano caricato!');

      titolo.value = 'Titolo';
      durata.value = '120';
      tags.value = ['pop','rock']
    } catch (error) {
      console.log(error);
    }
  }
</script>

<template>
  <div v-if="loggedUser.tipoAccount==='creator'">
    <h2 class="green">Carica un nuovo brano</h2>
    <form>
        <label>Titolo del brano:<input name="titolo" v-model="titolo" /></label>
        <label>Durata del brano:<input name="durata" v-model="durata" /></label>
        <label>Tags del brano:<input name="tags" v-model="tags" /></label>
        <button type="button" @click="inserisciBrano()">Carica brano</button>
      </form>

  </div>
</template>

<style scoped>


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
