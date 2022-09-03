<template>
  <div>
    <label >Id <input type="text"id="idPublisher"></label>
    <b-form @submit="onSubmit">
      <b-form-group label="Name:" label-for="name">
        <b-form-input id="name" v-model="form.name" type="text" placeholder="Enter name" required></b-form-input>
      </b-form-group>
      <b-form-group label="Address:" label-for="address">
        <b-form-input id="address" v-model="form.address" type="text" placeholder="Enter address" required></b-form-input>
      </b-form-group>
      <br>
      <b-button type="submit" variant="primary">PUT</b-button>
    </b-form>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'UpdatePublisher',
  data() {
    return {
      form: {
        name:'',
        address: '',
      }
    }
  },
  methods: {
    ...mapActions([
      'updatePublisher',
      'publisherformset'
    ]),

    onSubmit(e) {
      e.preventDefault();
      this.publisherformset(document.getElementById("idPublisher").value);
      this.updatePublisher(this.form);
      this.form.name= '';
      this.form.address = '';
      document.getElementById("idPublisher").value = '';

    }
  }
}

</script>

<style scoped>

</style>