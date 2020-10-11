<template>
  <div>
    <v-navbar></v-navbar>
    <v-list-mentor-user v-if="isUser"></v-list-mentor-user>
  </div>
</template>
<script>
export default {
  data () {
    return {
      userRole: localStorage.getItem('userRole'),
      userName: localStorage.getItem('userName'),
      isAdmin: localStorage.getItem('isAdmin') === true,
      isUser: localStorage.getItem('userRole') === 'USER',
      isMentor:
        localStorage.getItem('userRole') === 'MENTOR_GROUP_LEADER' ||
        localStorage.getItem('userRole') === 'MENTOR_NORMAL',
      isMentee:
        localStorage.getItem('userRole') === 'MENTEE_GROUP_LEADER' ||
        localStorage.getItem('userRole') === 'MENTEE_NORMAL'
    }
  }
}
</script>
<style scoped>
.jumbotron {
  font-family: Verdana !important;
  height: 94vh;
  background-color: #00a3e0;
  width: 100%;
  color: white;
  margin: 0 auto;
  overflow: hidden;
  padding: 10px 0;
  align-items: center;
  justify-content: space-around;
  display: flex;
  float: none;
}
</style>
