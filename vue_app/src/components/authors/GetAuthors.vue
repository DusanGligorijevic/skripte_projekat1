<template>
  <div>
    <ul id="authors">
      <li v-for="a in authors">
        Name: {{a.name}}     -      Address: {{a.address}} -       Phone number: {{a.phoneNumber}}
      </li>
    </ul>
  </div>
</template>

<script>
import { mapActions, mapState, mapMutations } from 'vuex';
export default {
  name: 'GetAuthors',

  computed: {
    ...mapState([
      'authors'
    ])
  },
  mounted() {
    this.getAuthors();
  },
  methods:{
    ...mapActions([
      'getAuthors'
    ])

  }
}
</script>
<style scoped>

</style>