<template>
  <div>
    <div class="sidenav">
      <div class="login-main-text">
        <h1>{{ msg }}<br /></h1>
        - <img src="../assets/logo-white.png" />
      </div>
    </div>
    <div class="main">
      <div class="col-md-6 col-sm-12">
        <div class="login-form">
          <form>
            <div class="form-group">
              <label>User Name</label>
              <input
                required
                v-model="userName"
                type="text"
                class="form-control"
                placeholder="User Name"
              />
            </div>
            <div class="form-group">
              <label>Password</label>
              <input
                required
                v-model="password"
                type="password"
                class="form-control"
                placeholder="Password"
              />
            </div>
            <button type="submit" class="btn btn-black" v-on:click="login">Login</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MentorAppIndex',
  data () {
    return {
      msg: 'Welcome to ',
      userName: '',
      password: ''
    }
  },
  methods: {
    login: function () {
      let userName = this.userName
      let password = this.password
      this.$store.dispatch('login', { userName, password })
        .then(() => this.$router.push('/list-mentor'))
        .catch(err => console.log(err))
    }
  }
}
</script>

<style scoped>
body {
  font-family: "Roboto";
}

.main-head {
  height: 150px;
  background: #fff;
}

.sidenav {
  height: 100%;
  background-color: #00a3e0;
  overflow-x: hidden;
  padding-top: 20px;
}

.main {
  padding: 0px 10px;
}

@media screen and (max-height: 450px) {
  .sidenav {
    padding-top: 15px;
  }
}

@media screen and (max-width: 450px) {
  .login-form {
    margin-top: 10%;
  }

  .register-form {
    margin-top: 10%;
  }
}

@media screen and (min-width: 768px) {
  .main {
    margin-left: 40%;
  }

  .sidenav {
    width: 40%;
    position: fixed;
    z-index: 1;
    top: 0;
    left: 0;
  }

  .login-form {
    margin-top: 80%;
  }

  .register-form {
    margin-top: 20%;
  }
}

.login-main-text {
  margin-top: 20%;
  padding: 60px;
  color: #fff;
}

.login-main-text h2 {
  font-weight: 300;
}

.btn-black {
  background-color: #00a3e0 !important;
  color: #fff;
}
</style>
