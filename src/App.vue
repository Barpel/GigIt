<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link>
      <router-link to="/about">About</router-link>
      <router-link to="/gigs">Gigs</router-link>
      <router-link to="/login">Login</router-link>
    </div>
    <router-view/>
  </div>
</template>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background-color: #2f2f2f;
  min-height: 100vh;
}
#nav {
  position: fixed;
  bottom: 0;
  width: 100%;
  padding: 30px;
  background-color: #343434;
  color: white;
  border: 1px solid black;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  z-index: 10;
  a {
    text-decoration: none;
    font-weight: bold;
    color: white;
    &.router-link-exact-active {
      color: #2ca2af;
    }
  }
}
</style>
