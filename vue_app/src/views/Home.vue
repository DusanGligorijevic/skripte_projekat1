<template>
  <div class="home">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
    <Comments />
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import Comments from "@/components/Comments";

export default {
  name: 'Home',
  components: {
    Comments,
    HelloWorld
  }
}
</script>
