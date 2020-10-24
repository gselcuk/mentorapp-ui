<template>
  <div class="jumbotron jumbotron-fluid">
    <div class="container">
      <h1 class="display-4">Welcome to MentorApp {{ userName }}</h1>
      <p class="lead">
        You aren't still mentor or mentee Let's start with deciding.
      </p>
      <button class="btn btn-light btn-lg" role="button" v-on:click="beMentor">Be Mentor</button>
      <button class="btn btn-light btn-lg" role="button" v-on:click="beMentee">Be Mentee</button>
    </div>
  </div>
</template>
<script>
import usertype from '../../state/usertype'

export default {
  name: 'ListMentorUser',
  data () {
    return {
      userName: localStorage.getItem('userName')
    }
  },
  methods: {
    beMentor () {
      usertype.state = 'MENTOR'
      this.$router.push('/be-mentor')
    },
    beMentee () {
      usertype.state = 'MENTEE'
      this.$router.push('/find-mentor')
    }
  }
}
</script>
