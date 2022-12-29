<script lang="ts">
import { RouterLink, RouterView } from "vue-router";
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

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
