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
