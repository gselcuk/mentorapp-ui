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
