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
  methods:{
    displayMsg(msg) {
      this.msg = msg;
      this.showMsg = true;
      var delay = msg.link? 5000 : 3000
      setTimeout(() => {
        this.msg = null;
        this.showMsg = false;
      }, delay);
    }
  },
  sockets: {
    eventMsgToUser: function (msg) {
      this.displayMsg(msg)
    },
    emitChatMsgToUser: function(msg) {
      var path = this.$route.path
      if(!path.includes('inbox')) {
        console.log('does not include')
        this.displayMsg(msg)
      }
    }
  },
  created() {
    this.$store.dispatch('openUserSocket')
    this.$store.dispatch({ type: "checkLoggedUser" });
    bus.$on(USR_MSG_DISPLAY, msg => this.displayMsg(msg));
  },
  components: {
    homeNav,
    userMsg
  },
};
</script>


<style lang="scss">

</style>
