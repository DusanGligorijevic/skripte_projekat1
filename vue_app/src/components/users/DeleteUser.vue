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
  name: 'DeleteUser',
  data() {
    return {
      form: {
        id: '',
      }
    }
  },
  methods: {
    ...mapActions([
      'deleteUser'
    ]),

    onSubmit(e) {
      e.preventDefault();
      this.deleteUser(this.form.id);
      this.form.id = '';

    }
  }
}

</script>

<style scoped>

</style>