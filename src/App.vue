<script lang="ts">
  import { RouterView } from "vue-router";

  import Registrazione from "./components/Registrazione.vue";
  import Accesso from "./components/Accesso.vue";

  export default {
    components: {
      Accesso,
      Registrazione,
    },
    data() {
      return {
        moduloCorrente: 'Accesso',
        moduli: ['Accesso', 'Registrazione']
      }
    }
  }
</script>

<template>
  <header>

    <div class="wrapper">
      Ingresso nella piattaforma:<button
      v-for="modulo in moduli"
      :key="modulo"
      :class="['tab-button', { active: moduloCorrente === modulo }]"
      @click="moduloCorrente = modulo"
      >
      {{ modulo }}
    </button>
    <br/><br/>
    <component :is="moduloCorrente" class="moduli"></component>
    </div>

  </header>

  <RouterView />
</template>

<style scoped>

.tab-button {
  margin: 0 1rem;
}

</style>
