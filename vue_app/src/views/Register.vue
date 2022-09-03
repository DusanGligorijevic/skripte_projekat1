<template>
  <div id="app">
    <Header subtitle="Create account"/>

    <b-form @submit="onSubmit">
      <b-form-group label="Email address:" label-for="email">
        <b-form-input id="email" v-model="form.email" type="email" placeholder="Enter email" required></b-form-input>
      </b-form-group>

      <b-form-group label="User Name:" label-for="name">
        <b-form-input id="name" v-model="form.name" placeholder="Enter name" required></b-form-input>
      </b-form-group>

      <b-form-group label="Password:" label-for="password">
        <b-form-input id="password" v-model="form.password" type="password" required></b-form-input>
      </b-form-group>

      <b-form-group label="role">
        <b-form-radio v-model="form.role" name="myChoice" value="admin" required>admin</b-form-radio>
        <b-form-radio v-model="form.role" name="myChoice" value="manager" required>manager</b-form-radio>
        <b-form-radio v-model="form.role" name="myChoice" value="employee" required>employee</b-form-radio>
      </b-form-group>


      <br>
      <b-button type="submit" variant="primary">Submit</b-button>
    </b-form>
  </div>
</template>

<script>

import { mapActions } from 'vuex';

export default {
  name: 'Register',

  components: {
  },

  data() {
    return {
      form: {
        name: '',
        email: '',
        role: '',
        password: ''
      }
    }
  },

  methods: {
    ...mapActions([
      'register'
    ]),

    onSubmit(e) {
      e.preventDefault();
      this.register(this.form);
      this.$router.push({ name: '/' });
    }
  }
}
</script>

<style scoped>

</style>
