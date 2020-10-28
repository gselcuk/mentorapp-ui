<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: 'Josefin Slab', sans-serif !important;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.jumbotron {
  background-color:white;
  width: 100%;
  color: black;
  margin: 0 auto;
  overflow: hidden;
  padding: 10px 0;
  align-items: center;
  justify-content: space-around;
  display: flex;
  float: none;
}
</style>
