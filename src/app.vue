<template>
  <div id="app">
    <user-msg :msg="msg"></user-msg>
    <home-nav></home-nav>
    <div class="loader" v-if="isLoading"></div>
    <router-view v-else/>
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
  // sockets: {
  //       connect: function () {
  //           // console.log('socket connected')
  //       },
        // customEmit: function (data) {
        //     console.log('this method was fired by the socket server. eg: io.emit("customEmit", data)')
        // }
    // },
  created() {
    this.$store.dispatch({ type: "checkLoggedUser" });
    this.$store.dispatch({type:'getAllUsers'})
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
      showMsg: false,
      // isLoading: true
    }
  },
  computed: {
    isLoading() {
      return this.$store.getters.isLoading
    }
  },
};
</script>


<style lang="scss">

</style>
