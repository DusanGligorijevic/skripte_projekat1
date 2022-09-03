<template>
  <div>
    <b-form @submit="onSubmit">
      <b-form-group label="ID:" label-for="id">
        <b-form-input id="id" v-model="form.id" placeholder="Enter id" required></b-form-input>
      </b-form-group>

      <br>
      <b-button type="submit" variant="primary">DELETE</b-button>
    </b-form>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'DeleteAuthor',
  data() {
    return {
      form: {
        id: '',
      }
    }
  },
  methods: {
    ...mapActions([
      'deleteAuthor'
    ]),

    onSubmit(e) {
      e.preventDefault();
      this.deleteAuthor(this.form.id);
      this.form.id = '';

    }
  }
}

</script>

<style scoped>

</style>