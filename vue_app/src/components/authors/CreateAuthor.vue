<template>
  <div>
    <b-form @submit="onSubmit">
      <b-form-group label="Name:" label-for="name">
        <b-form-input id="name" v-model="form.name" type="text" placeholder="Enter name" required></b-form-input>
      </b-form-group>
      <b-form-group label="Address:" label-for="address">
        <b-form-input id="address" v-model="form.address" type="text" placeholder="Enter address" required></b-form-input>
      </b-form-group>
      <b-form-group label="Phone number:" label-for="phoneNumber">
        <b-form-input id="phoneNumber" v-model="form.phoneNumber" type="number" placeholder="Enter phone number: " required></b-form-input>
      </b-form-group>
      <br>
      <b-button type="submit" variant="primary">POST</b-button>
    </b-form>

  </div>
</template>
<script>
import { mapActions } from 'vuex';

export default {
  name: 'CreateAuthor',
  data() {
    return {
      form: {
        name: '',
        address: '',
        phoneNumber: '',
      }
    }
  },
  methods: {
    ...mapActions([
      'createAuthor'
    ]),

    onSubmit(e) {
      e.preventDefault();
      this.createAuthor(this.form);
      this.form.name = '';
      this.form.address = '';
      this.form.phoneNumber = '';
    }
  }
}

</script>

<style scoped>

</style>