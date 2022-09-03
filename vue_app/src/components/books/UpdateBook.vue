<template>
  <div>
    <label >Id <input type="text"id="idBook"></label>
    <b-form @submit="onSubmit">
      <b-form-group label="Name:" label-for="name">
        <b-form-input id="name" v-model="form.name" type="text" placeholder="Enter name" required></b-form-input>
      </b-form-group>
      <b-form-group label="Description:" label-for="desc">
        <b-form-input id="description" v-model="form.description" type="text" placeholder="Enter description" ></b-form-input>
      </b-form-group>
      <b-form-group label="Author id:" label-for="authorId">
        <b-form-input id="authorId" v-model="form.authorId" type="number" placeholder="Enter Author's id: " ></b-form-input>
      </b-form-group>
      <b-form-group label="Publisher id:" label-for="publisherId">
        <b-form-input id="publisherId" v-model="form.publisherId" type="number" placeholder="Enter Publiseher's id: " ></b-form-input>
      </b-form-group>
      <br>
      <b-button type="submit" variant="primary">PUT</b-button>
    </b-form>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'UpdateBook',
  data() {
    return {
      form: {
        name:'',
        description: '',
        authorId: '',
        publisherId: ''
      }
    }
  },
  methods: {
    ...mapActions([
      'updatebook',
      'bookformset'
    ]),

    onSubmit(e) {
      e.preventDefault();
      this.bookformset(document.getElementById("idBook").value)
      this.updatebook(this.form);
      this.form.name = '';
      this.form.description = '';
      this.form.authorId = '',
      this.form.publisherId = '',
      document.getElementById("idBook").value = '';
    }
  }
}

</script>

<style scoped>

</style>