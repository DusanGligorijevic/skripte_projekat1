<template>
  <div>
    <label >Id <input type="text"id="idAuthor"></label>
    <b-form @submit="onSubmit">
      <b-form-group label="Name:" label-for="name">
        <b-form-input id="name" v-model="form.name" placeholder="Enter new nane" required></b-form-input>
      </b-form-group>
      <b-form-group label="Addres:" label-for="addres">
        <b-form-input id="address" v-model="form.address" placeholder="Enter new address" required></b-form-input>
      </b-form-group>
      <b-form-group label="Phone number:" label-for="phoneNumber">
        <b-form-input id="phoneNumber" v-model="form.phoneNumber" placeholder="Enter new phone number" required></b-form-input>
      </b-form-group>

      <br>
      <b-button type="submit" variant="primary">PUT</b-button>
    </b-form>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'UpdateAuthor',
  data() {
    return {
      form: {
        name:'',
        phoneNumber: '',
        address: '',
      }
    }
  },
  methods: {
    ...mapActions([
      'updateAuthor',
      'authorformset'
    ]),

    onSubmit(e) {
      e.preventDefault();
      this.authorformset(document.getElementById("idAuthor").value)
      this.updateAuthor(this.form);
      this.form.name = '';
      this.form.phoneNumber = '';
      this.form.address = '';
      document.getElementById("idAuthor").value = '';
    }
  }
}

</script>

<style scoped>

</style>