<template>
  <section>
    <div id="home-nav">
      <router-link to="/">
        <h1>
          <i class="fas fa-home"></i>
          Home
        </h1>
      </router-link>
      <router-link to="/about">
        <h1>
          <span>
            Gig
            <span>It</span>
          </span>
          About
        </h1>
      </router-link>
      <router-link to="/gig">
        <h1>
          <i class="fas fa-th-large"></i>
          Gigs
        </h1>
      </router-link>
      <a @click="onUserClicked" class="home-nav-user">
        <h1 class="profile-info-container">
          <i class="fas fa-user">
            <div class="notification-circle" v-if="isLoggedin"></div>
          </i>
          {{isLogin}}
        </h1>
      </a>
    </div>
    <div class="user-dropdown" :class="dropdownClass">
      <router-link @click.native="closeDropdown" :to="myGigsLink">
        <h1>
          <span>Gigs</span>
          My Gigs
        </h1>
      </router-link>
      <router-link @click.native="closeDropdown" :to="completedGigsLink">
        <h1>
          <i class="fas fa-check-square"></i>
          Completed
        </h1>
      </router-link>
      <router-link @click.native="closeDropdown" :to="inboxLink">
        <h1>
          <i class="fas fa-envelope"></i>
          Inbox
        </h1>
      </router-link>
      <router-link @click.native="closeDropdown" :to="profileLink">
        <h1>
          <i class="fas fa-id-card"></i>
          My Profile
        </h1>
      </router-link>
      <div class="dropdown-btn-cls" @click="closeDropdown">
        <i class="fas fa-times"></i>
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
      if(this.$store.getters.user) return this.$store.getters.user
      else return {}
    },
    isLoggedin() {
      return this.$store.getters.isLoggedin;
    },
    isLogin() {
      var isLogged = this.isLoggedin;
      if (isLogged) return "Profile";
      else return "Login";
    },
    profileLink() {
      return `/user/${this.user._id}`;
    },
    myGigsLink() {
      return `/user/${this.user._id}/gigs`;
    },
    completedGigsLink() {
      return `/user/${this.user._id}/completed`;
    },
    inboxLink() {
      return `/user/${this.user._id}/inbox`;
    },
    dropdownClass() {
        if(this.isUserDropdown) return 'open'
    }
  },
  methods: {
    closeDropdown() {
      this.isUserDropdown = false;
    },
    onUserClicked() {
      if (this.isLoggedin) {
        this.isUserDropdown = !this.isUserDropdown;
      } else this.$router.push('/user/login');
    }
  }
};
</script>

<style lang="scss">
</style>