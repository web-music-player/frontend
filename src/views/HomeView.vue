<script setup lang="ts">
  import Ricerca from "../components/Ricerca.vue";
  import Preferiti from "../components/Preferiti.vue";
  import Creator from "../components/Creator.vue";
  import Impostazioni from "../components/Impostazioni.vue";
  import { loggedUser } from "../states/loggedUser";
</script>

<template>
  <div id="componenti" v-if="loggedUser.token">
    <Ricerca />
    <br/>
    <Preferiti />
    <br/>
    <Creator />
    <br/>
    <Impostazioni />
  </div>
</template>

<style>
  #componenti {
    margin-left: 3em;
  }
</style>