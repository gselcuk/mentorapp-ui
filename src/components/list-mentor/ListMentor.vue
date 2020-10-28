<template>
  <div>
    <v-navbar></v-navbar>
    <v-list-mentor-user v-if="isUser"></v-list-mentor-user>
    <v-list-mentor-mentor v-if="!isUser"></v-list-mentor-mentor>
  </div>
</template>
<script>
export default {
  data () {
    return {
      userName: localStorage.getItem('userName'),
      isAdmin: localStorage.getItem('isAdmin') === true,
      isUser: localStorage.getItem('userRole') === 'USER'
    }
  }
}
</script>
<style scoped>
.jumbotron {
  height: 94vh;
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
