<template>
  <div>
    <b-form @submit="onSubmit">
      <b-form-group label="Name:" label-for="name">
        <b-form-input id="name" v-model="form.name" type="text" placeholder="Enter name" required></b-form-input>
      </b-form-group>
      <b-form-group label="Address:" label-for="address">
        <b-form-input id="address" v-model="form.address" type="text" placeholder="Enter address" required></b-form-input>
      </b-form-group>
      <br>
      <b-button type="submit" variant="primary">POST</b-button>
    </b-form>

  </div>
</template>
<script>
import { mapActions } from 'vuex';

export default {
  name: 'CreatePublisher',
  data() {
    return {
      form: {
        name: '',
        address: '',
      }
    }
  },
  methods: {
    ...mapActions([
      'createPublisher'
    ]),

    onSubmit(e) {
      e.preventDefault();
      this.createPublisher(this.form);
      this.form.orders = '';

    }
  }
}

</script>

<style scoped>

</style>