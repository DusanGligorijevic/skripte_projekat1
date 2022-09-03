<template>
  <div>
    <ul id="publishers">
      <li v-for="p in publishers">
        Name: {{p.name}}     -      Address: {{p.address}}
      </li>
    </ul>
  </div>
</template>

<script>
import { mapActions, mapState, mapMutations } from 'vuex';
export default {
  name: 'GetPublishers',

  computed: {
    ...mapState([
      'publishers'
    ])
  },
  mounted() {
    this.getPublishers();
  },
  methods:{
    ...mapActions([
      'getPublishers'
    ])

  }
}
</script>
<style scoped>

</style>