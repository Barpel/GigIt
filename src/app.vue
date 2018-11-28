<template>
  <div id="app">
    <user-msg v-if="showMsg" :msg="msg"></user-msg>
    <home-nav></home-nav>
    <router-view/>
  </div>
</template>

<script>
import homeNav from "./components/homeNav.cmp";
import bus, { USR_MSG_DISPLAY } from "./eventBus.js";
import userMsg from "./components/user-msgs.vue";

export default {
  components: {
    homeNav,
    userMsg
  },
  created() {
    this.$store.dispatch({ type: "checkLoggedUser" });
    bus.$on(USR_MSG_DISPLAY, msg => {
      this.msg = msg;
      this.showMsg = true;
      var delay = 3000;
      setTimeout(() => {
        this.msg = null;
        this.showMsg = false;
      }, delay);
    });
  },
  data() {
    return {
      msg: "",
      showMsg: false
    };
  }
};
</script>


<style lang="scss">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background-color: #2f2f2f;
  min-height: 100vh;
  min-width: 100%;
}
</style>
