<template>
  <div>
    <nav class="navbar navbar-expand-md navbar-light bg-light">
      <a class="navbar-brand" href="#/list-mentor" @click="setStateList()">
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
          <a href="#/profile" class="nav-item nav-link">Profile</a>
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
              <a
                class="dropdown-item"
                href="#/be-mentor"
                v-if="userRole == 'USER'"
                @click="setState('MENTOR')"
                >Be Mentor</a
              >
              <a
                class="dropdown-item"
                href="#/find-mentor"
                @click="setState('MENTEE')"
                >Find Mentor</a
              >
              <div class="dropdown-divider"></div>
              <a
                class="dropdown-item"
                href="#/join-mentor"
                v-if="
                  userRole == 'MENTOR_GROUP_LEADER' ||
                  userRole == 'MENTOR_NORMAL'
                "
                >Join Mentor Group</a
              >
            </div>
          </li>
        </div>
        <div class="navbar-nav ml-auto">
          <a class="nav-item nav-link d-none d-lg-block"
            >Welcome {{ userName }} !</a
          >
          <br />
          <button
            class="btn btn-outline-danger my-2 my-sm-0"
            type="submit"
            v-on:click="logout"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  </div>
</template>
<script>
import usertype from '../../state/usertype'
import listrelation from '../../state/list-relation'
import expertises from '../../state/expertises'

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
    },
    setState (state) {
      usertype.state = state
    },
    setStateList () {
      if (localStorage.getItem('isAdmin') === 'true') { expertises.state = [] }
      listrelation.state = 'user'
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
