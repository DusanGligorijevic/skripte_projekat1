<template>
  <div class="hello">
    <h1>WELCOME</h1>
    <p>
      To use Storages,Orders,Watches or Users you have to log in. If you do not have account, go to page Register.
      
    </p>
    <h2>USER TYPES</h2>
    <h3>ADMIN</h3>
    <p>
       Admin has all the priviledges and can use all functions.      
    </p>
    <h3>MANAGER</h3>
    <p>
      Manager can use all functions of Watches,Orders and Storages,but has no ability to work with Users.
      
    </p>
    <h3>EMPLOYEE</h3>
    <p>
      Employee can use all functions of Watches and Orders ,but has no ability to work with Users and Storages.
      
    </p>
    
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
