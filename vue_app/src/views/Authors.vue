<template>
  <div v-if="show">
    <GetAuthors />
    <UpdateAuthor />
    <DeleteAuthor />
    <CreateAuthor />

  </div>
  <div v-else>
    <GetAuthors />
  </div>
</template>
<script>



import GetAuthors from "@/components/authors/GetAuthors";
import UpdateAuthor from "@/components/authors/UpdateAuthor";
import DeleteAuthor from "@/components/authors/DeleteAuthor";
import CreateAuthor from "@/components/authors/CreateAuthor";
export default {
  name: 'Authors',


  data() {
    return {
      show: false,
    }
  },
  components: {
    CreateAuthor,
    DeleteAuthor,
    UpdateAuthor,
    GetAuthors




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