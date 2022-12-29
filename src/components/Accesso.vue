<script setup lang="ts">

</script>

<template>
  <div class="modulo">
    <h1 class="green">Accesso</h1>
    
    <form action="">
        <label>Indirizzo email: <input type="text"></label>
        
        <label>Password: <input type="text"></label>
        
        <label><input type="submit"></label>
    </form>

  </div>
</template>

<style scoped>

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
