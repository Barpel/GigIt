<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">
        <h1>
          <i class="fas fa-home"></i>
          Home
        </h1>
      </router-link>
      <router-link to="/about">
        <h1>
          <span>
            Gig<span>It</span>
          </span>
          About
        </h1>
      </router-link>
      <router-link to="/gigs">
        <h1>
          <i class="fas fa-th-large"></i>
          Gigs
        </h1>
      </router-link>
      <router-link to="/login">
        <h1>
          <i class="fas fa-user"></i>
          Login
        </h1>
      </router-link>
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
  max-height: 100px;
  position: fixed;
  bottom: 0;
  width: 100%;
  padding: 20px;
  background-color: #343434;
  color: white;
  border: 1px solid black;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  margin: 20px 0 0;
  
  z-index: 10;
  a {
    text-decoration: none;
    font-weight: bold;
    color: white;
    h1 {
      margin: 0;
      height: 100%;
      display: grid;
      grid-template-rows: 1fr 1fr;
      font-size: 1.5rem;
      span {
        font-family: condiment;
        span {
          color: #97a5a7;
        }
      }
    }
    &.router-link-exact-active {
      color: #2ca2af;
    }
  }
}
</style>
