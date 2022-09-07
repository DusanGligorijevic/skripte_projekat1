<template>
  <div id="app">
    <div>
      <b-navbar toggleable="sm" type="dark" variant="info">

        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
        <b-navbar-nav>
          <b-nav-item to="/Books">Books</b-nav-item>
        </b-navbar-nav>
        <b-navbar-nav>
          <b-nav-item to="/Authors">Authors</b-nav-item>
        </b-navbar-nav>
        <b-navbar-nav>
          <b-nav-item to="/Publishers">Publishers</b-nav-item>
        </b-navbar-nav>
        <b-navbar-nav>
          <b-nav-item to="/Users">Users</b-nav-item>
        </b-navbar-nav>
        <b-navbar-nav>
          <b-nav-item to="/">Home</b-nav-item>
        </b-navbar-nav>

        <b-navbar-nav class="ml-auto">
          <b-nav-item v-if="!token" to="/Register">Register</b-nav-item>
          <b-nav-item v-if="!token" to="/Login">Log In</b-nav-item>
          <b-nav-item v-else @click="logout()">Log Out</b-nav-item>
        </b-navbar-nav>




      </b-navbar>
    </div>

    <router-view/>
  </div>
</template>

<script>
import { mapActions, mapState, mapMutations } from 'vuex';
export default {
  name: 'App',
  computed: {
    ...mapState([
      'token'
    ])
  },

  mounted() {
    if (localStorage.token) {
      this.setToken(localStorage.token);
    }
  },

  methods: {

    ...mapMutations([
      'removeToken',
      'setToken'
    ]),

    logout() {
      this.removeToken();
      this.$router.push({name: 'Home'});

    },
    }
}



</script>
   <style>
   #app {
     font-family: Avenir, Helvetica, Arial, sans-serif;
     -webkit-font-smoothing: antialiased;
     -moz-osx-font-smoothing: grayscale;
     text-align: center;
     color: #2c3e50;
   }
   #nav-collapse {

     color: #ff8181;
   }
   #nav {
     padding: 30px;
   }

   #nav a {
     font-weight: bold;
     color: #2c3e50;
   }

   #nav a.router-link-exact-active {
     color: #42b983;
   }
   </style>
