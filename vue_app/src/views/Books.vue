<template>
  <div v-if="show">
    <GetBooks />
    <PostBook />
    <DeleteBook />
    <UpdateBook />
    <Comments />
  </div>
  <div v-else>
    <GetBooks />
  </div>
</template>
<script>



import GetBooks from "@/components/books/GetBooks";
import PostBook from "@/components/books/PostBook";
import DeleteBook from "@/components/books/DeleteBook";
import UpdateBook from "@/components/books/UpdateBook";
import Comments from "@/components/Comments";
export default {
  name: 'Books',


  data() {
    return {
      show: false,
    }
  },
  components: {
    Comments,
    UpdateBook,
    DeleteBook,
    GetBooks,
    PostBook,



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