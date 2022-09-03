<template>
  <div>
    <ul id="users">
      <li v-for="u in users">
        Name: {{u.name}}     -      Email: {{u.email}}    -      Admin:{{u.admin}}
      </li>
    </ul>
  </div>
</template>

<script>
import { mapActions, mapState, mapMutations } from 'vuex';
export default {
  name: 'GetUsers',

  computed: {
    ...mapState([
      'users'
    ])
  },
  mounted() {
    this.getUsers();
  },
  methods:{
    ...mapActions([
      'getUsers'
    ])

  }
}
</script>
<style scoped>

</style>