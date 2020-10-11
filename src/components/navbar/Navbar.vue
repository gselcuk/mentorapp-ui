<template>
  <div>
    <nav class="navbar navbar-expand-md navbar-light bg-light">
      <a class="navbar-brand">
        <img src="../../assets/logo-icon.png" height="28" alt="CoolBrand" />
      </a>
      <button
        type="button"
        class="navbar-toggler"
        data-toggle="collapse"
        data-target="#navbarCollapse"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarCollapse">
        <div class="navbar-nav">
          <a href="#" class="nav-item nav-link">Profile</a>
          <a href="#" class="nav-item nav-link">Messages</a>
          <li class="nav-item dropdown">
            <a
              class="nav-link dropdown-toggle"
              href="#"
              id="navbarDropdown"
              role="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              Relation
            </a>
            <div class="dropdown-menu" aria-labelledby="navbarDropdown">
              <a class="dropdown-item" href="#" v-if="userRole != 'USER'"
                >Be Mentor</a
              >
              <a class="dropdown-item" href="#">Find Mentor</a>
              <div class="dropdown-divider"></div>
              <a class="dropdown-item" href="#">Join Mentor Group</a>
              <a class="dropdown-item" href="#">Join Mentee Group</a>
            </div>
          </li>
        </div>
        <div class="navbar-nav ml-auto">
          <a class="nav-item nav-link d-none d-lg-block">Welcome {{userName}} !</a>
          <br>
          <button class="btn btn-outline-danger my-2 my-sm-0" type="submit" v-on:click="logout">
            Logout
          </button>
        </div>
      </div>
    </nav>
  </div>
</template>
<script>
export default {
  name: 'ListMentor',
  data () {
    return {
      msg: 'Login Success ' + localStorage.getItem('id'),
      userRole: localStorage.getItem('userRole'),
      userName: localStorage.getItem('userName')
    }
  },
  methods: {
    logout () {
      this.$store
        .dispatch('logout')
        .then(() => this.$router.push('/'))
        .catch((err) => console.log(err))
    }
  }
}
</script>
<style scoped>
.logo-image {
  width: 80px;
  height: 40px;
  overflow: hidden;
}
.navbar {
  font-family: Verdana !important;
}
</style>
