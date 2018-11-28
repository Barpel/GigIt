<template>
  <section>
    <h1>Login</h1>
    <input type="text" v-model="creds.username">
    <input type="text" v-model="creds.password">
    <button @click="login">Login</button>
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
  }
};
</script>

<style>
</style>
