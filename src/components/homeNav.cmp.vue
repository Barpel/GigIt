<template>
  <section>
    <div class="home-nav">
      <router-link to="/" class="home-logo">
        <h1>
          Gig
          <span>It</span>
        </h1>
      </router-link>
      <div class="nav-seperator">
        <router-link to="/gig">
          <h1>
            <i class="fas fa-th-large"></i>
          </h1>
        </router-link>
        <router-link :to="(isLoggedin)?inboxLink: '/user/login'">
          <h1>
            <i class="fas fa-envelope-open-text" v-if="unreadMsg"></i>
            <i class="fas fa-envelope" v-else></i>
          </h1>
        </router-link>
        <router-link :to="(isLoggedin)?myGigsLink: '/user/login'">
          <h1>
            <span class="logo-i">Gigs</span>
          </h1>
        </router-link>

        <h1 v-if="isLoggedin" class="nav-user-container">
          <router-link :to="profileLink">
            <img :src="user.img">
            <span>{{user.name.first}}</span>
          </router-link>
        </h1>
        <router-link v-else to="/login">
          <h1>
            <span>Login</span> &nbsp;
            <i class="fas fa-user"></i>
          </h1>
        </router-link>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "homeNav",
  data() {
    return {
      isUserDropdown: false
    };
  },
  computed: {
    user() {
      if (this.$store.getters.user) return this.$store.getters.user;
      else return {};
    },
    isLoggedin() {
      return this.$store.getters.isLoggedin;
    },
    unreadMsg() {
      return true
      // return this.$store.getters.unreadMsg
    }
    profileLink() {
      return `/user/${this.user._id}`;
    },
    myGigsLink() {
      return `/user/${this.user._id}/gigs`;
    },
    inboxLink() {
      return `/user/${this.user._id}/inbox`;
    }
  }
};
</script>

<style lang="scss">
</style>