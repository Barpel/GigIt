<template>
  <section>
    <div class="home-nav">
      <router-link to="/">
        <h1>
          <i class="fas fa-home"></i>
          Home
        </h1>
      </router-link>
      <router-link to="/gig">
        <h1>
          <i class="fas fa-th-large"></i>
          Gigs
        </h1>
      </router-link>
      <router-link :to="(isLoggedin)?inboxLink: '/user/login'">
        <h1>
          <i class="fas fa-envelope"></i>
          Inbox
        </h1>
      </router-link>
      <router-link :to="(isLoggedin)?myGigsLink: '/user/login'">
        <h1>
          <span class="logo-i">Gigs</span>
          My Gigs
        </h1>
      </router-link>

      <router-link :to="(isLoggedin)?profileLink : '/user/login' ">
        <h1>
          <i class="fas fa-user"></i>
          {{(isLoggedin)? 'Profile': 'Login'}}
        </h1>
      </router-link>
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
    profileLink() {
      return `/user/${this.user._id}`;
    },
    myGigsLink() {
      return `/user/${this.user._id}/gigs`;
    },
    inboxLink() {
      return `/user/${this.user._id}/inbox`;
    },
    
  },

};
</script>

<style lang="scss">
</style>