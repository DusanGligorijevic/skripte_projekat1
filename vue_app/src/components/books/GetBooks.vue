<template>
  <div>
    <ul id="books">
      <li v-for="b in books">
       Name: {{b.name}}     -      Description: {{b.description}} -      Author ID: {{b.authorId}} - Publisher ID: {{b.publisherId}}
      </li>
    </ul>
  </div>
</template>

<script>
import { mapActions, mapState, mapMutations } from 'vuex';
export default {
  name: 'GetBooks',

  computed: {
    ...mapState([
      'books'
    ])
  },
  mounted() {
    this.getBooks();
  },
  methods:{
    ...mapActions([
      'getBooks'
    ])

  }
}
</script>

<style scoped>

</style>