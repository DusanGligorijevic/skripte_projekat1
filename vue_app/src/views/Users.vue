<template>
  <div v-if="show">
    <GetUsers />
    <UpdateUser />
    <DeleteUser />

  </div>
  <div v-else>
    <GetUsers />
  </div>
</template>
<script>




import GetUsers from "@/components/users/GetUsers";
import UpdateUser from "@/components/users/UpdateUser";
import DeleteUser from "@/components/users/DeleteUser";
export default {
  name: 'Users',


  data() {
    return {
      show: false,
    }
  },
  components: {
    DeleteUser,
    UpdateUser,
    GetUsers





  },
  computed: {
  },

  mounted() {

    if(localStorage.token){
      this.show = !this.show
    }

  },


  methods: {

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
  margin-top: 60px;
}
</style>