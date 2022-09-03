<template>
  <div v-if="show">
    <GetPublishers />
    <CreatePublisher />
    <UpdatePublisher />
    <DeletePublisher />

  </div>
  <div v-else>
    <GetPublishers />
  </div>
</template>
<script>



import GetPublishers from "@/components/publishers/GetPublishers";
import CreatePublisher from "@/components/publishers/CreatePublisher";
import UpdatePublisher from "@/components/publishers/UpdatePublisher";
import DeletePublisher from "@/components/publishers/DeletePublisher";
export default {
  name: 'Publishers',


  data() {
    return {
      show: false,
    }
  },
  components: {
    DeletePublisher,
    UpdatePublisher,
    CreatePublisher,
    GetPublishers





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