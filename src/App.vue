<script lang="ts">
  import { RouterView } from "vue-router";
  import { loggedUser } from './states/loggedUser';

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
        moduli: ['Accesso', 'Registrazione'],
        user: loggedUser
      }
    },
    methods: {
      enter() {
        this.$router.push('/home');
      },
      exit() {
        this.$router.push('/')
      }
    }
  }
</script>

<template>
  <header>
    <div class="wrapper">
      <span v-if="!user.token">Ingresso nella piattaforma:
        <button
        v-for="modulo in moduli"
        :key="modulo"
        :class="['tab-button', { active: moduloCorrente === modulo }]"
        @click="moduloCorrente = modulo"
        >
        {{ modulo }}
      </button>
    </span>
    <br/><br/>
    <component :is="moduloCorrente" class="moduli" @login="enter()" @logout="exit()"></component>
    </div>

  </header>

  <RouterView />
</template>

<style scoped>

.tab-button {
  margin: 0 1rem;
}

</style>
