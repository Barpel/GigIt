<template>
  <section>
    <div class="home-nav">
      <div class="nav-logo-container">
        <router-link to="/" class="home-logo">
          <h1>
            Gig
            <span>It</span>
          </h1>
        </router-link>
      </div>
      <div class="nav-seperator">
        <div class="nav-user-container">
          <a
            v-if="isLoggedin"
            class="nav-user-menu-container"
            @click="dropdownOpen = !dropdownOpen"
          >
            <img :src="user.img">
            <span>{{user.name.first}}</span>
            <div class="user-dropdown" :class="dropdownStatus">
              <router-link :to="profileLink">
                <i class="fas fa-address-card"></i>Profile
              </router-link>
              <a @click="doLogout">
                <i class="fas fa-power-off"></i>Log Out
              </a>
            </div>
          </a>
          <router-link v-else to="/user/login">
            <h1>
              <span>Login</span> &nbsp;
              <i class="fas fa-user"></i>
            </h1>
          </router-link>
        </div>

        <router-link :to="(isLoggedin)?inboxLink: '/user/login'">
          <h1>
            <i class="fas fa-envelope-open-text" v-if="unreadMsg"></i>
            <i class="fas fa-envelope" v-else></i>
          </h1>
        </router-link>
        <router-link to="/about">
          <h1>
            <i class="far fa-question-circle"></i>
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
      dropdownOpen: false
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
      return true;
      // return this.$store.getters.unreadMsg
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
    dropdownStatus() {
      return {
        open: this.dropdownOpen,
        closed: !this.dropdownOpen
      };
    }
  },
  methods: {
    doLogout() {
      this.$store.dispatch({ type: "doLogout" });
      this.$router.push("/");
    }
  }
};
</script>

<style lang="scss">
</style>