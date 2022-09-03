<template>
  <div>
    <label >Id <input type="text"id="idUser"></label>
    <b-form @submit="onSubmit">
      <b-form-group label="Email:" label-for="email">
        <b-form-input id="email" v-model="form.email" placeholder="Enter new email" required></b-form-input>
      </b-form-group>

      <br>
      <b-button type="submit" variant="primary">PUT</b-button>
    </b-form>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'UpdateUser',
  data() {
    return {
      form: {
        email: '',
      }
    }
  },
  methods: {
    ...mapActions([
      'updateUser',
      'userformset'
    ]),

    onSubmit(e) {
      e.preventDefault();
      this.userformset(document.getElementById("idUser").value)
      this.updateUser(this.form);
      this.form.address = '';
      document.getElementById("idUser").value = '';
    }
  }
}

</script>

<style scoped>

</style>