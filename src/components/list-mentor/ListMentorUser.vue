<template>
  <div class="jumbotron jumbotron-fluid">
    <div class="container">
      <h1 class="display-4">Welcome to MentorApp {{ userName }}</h1>
      <p class="lead">
        You aren't still mentor or mentee Let's start with deciding.
      </p>
      <a class="btn btn-light btn-lg" href="#" role="button">Be Mentor</a>
      <a class="btn btn-light btn-lg" href="#" role="button">Be Mentee</a>
    </div>
  </div>
</template>
<script>
export default {
  name: 'ListMentorUser',
  data () {
    return {
      userName: localStorage.getItem('userName')
    }
  }
}
</script>
