<template>
  <div id="app">
    <home-nav></home-nav>
    <router-view/>
  </div>
</template>

<script>
import homeNav from './components/homeNav.cmp'
export default {
  components: {
    homeNav
  },
  created() {
    this.$store.dispatch({type:'getDemoUser'}) //to delete when db is ready
    this.$store.dispatch({type:'checkIsLogged'})
  }
}
</script>


<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background-color: #2f2f2f;
  min-height: 100vh;
  min-width: 100%;
}
</style>
