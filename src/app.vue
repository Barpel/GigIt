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
    },
    user() {
      return this.$store.getters.user
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
      var audio = new Audio('https://res.cloudinary.com/barpel/video/upload/v1544023238/GigIt%20Sounds/notification.mp3');
      audio.play();
      this.displayMsg(msg)
    },
    emitChatMsgToUser: function(msg) {
      // alert('new msg')
      var path = this.$route.path
      if(!path.includes('inbox')) {
        var audio = new Audio('https://res.cloudinary.com/barpel/video/upload/v1544023238/GigIt%20Sounds/notification.mp3');
        audio.play();
        this.displayMsg(msg)
        this.user.isInboxRead = false
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
