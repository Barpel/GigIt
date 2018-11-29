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
            .catch(() => alert('wrong username or password'))
      }
  },
  created() {
        this.$store.dispatch({ type: "checkLoggedUser" });

  }
};
</script>

<style>
</style>
