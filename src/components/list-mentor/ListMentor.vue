<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <a class="navbar-brand" href="/">
        <div class="logo-image">
          <img src="../../assets/logo-icon-dark.png"  class="img-fluid" />
        </div>
      </a>
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item active">
            <a class="nav-link" href="#"
              >Home <span class="sr-only">(current)</span></a
            >
          </li>
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
              Relation Management
            </a>
            <div class="dropdown-menu" aria-labelledby="navbarDropdown">
              <a
                class="dropdown-item"
                href="#"
                v-if="userRole == 'MENTOR_NORMAL' || userRole == 'USER'"
                >Find Mentee</a
              >
              <a
                class="dropdown-item"
                href="#"
                v-if="userRole == 'MENTEE_NORMAL' || userRole == 'USER'"
                >Find Mentor</a
              >
              <div class="dropdown-divider"></div>
              <a class="dropdown-item" href="#">Something else here</a>
            </div>
          </li>
        </ul>
        <form class="form-inline my-2 my-lg-0">
          <input
            class="form-control mr-sm-2"
            type="search"
            placeholder="Search"
            aria-label="Search"
          />
          <button class="btn btn-outline-success my-2 my-sm-0" type="submit">
            Search
          </button>
        </form>
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
      userRole: localStorage.getItem('userRole')
    }
  }
}
</script>
<style scoped>
 .logo-image{
    width: 80px;
    height: 40px;
    overflow: hidden;
}
</style>
