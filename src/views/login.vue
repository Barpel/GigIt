<template>
  <section>
    <h1>Login</h1>
    <form @submit.prevent="login">
    <input type="text" v-model="creds.username">
    <br>
    <input type="text" v-model="creds.password">
    <br>
    <button type="submit" >Login</button>
    </form>
    <h1>Not a Gigster yet? <router-link to="/user/register">Register</router-link></h1>
  </section>
</template>

<script>
export default {
  data() {
    return {
      creds: {
          username: "",
          password: ""
      }
    };
  },
  methods: {
      login() {
          this.$store.dispatch({type: 'onLogin', userCreds: this.creds})
            .then(() =>this.$router.push('/'))
            .catch((err) => {
              if(err.response.status === 400) this.$message.error('Wrong username or password');
            })
      }
  },
  created() {
        this.$store.dispatch({ type: "checkLoggedUser" });

  }
};
</script>

<style>
</style>
