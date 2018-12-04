

<template>
  <section v-if="user" class="user-profile-container grid">
    <div class="user-avatar-card">
      <div class="user-wrapper">
        <img :src="user.img" alt>
        <h5>
          {{user.name.first}} {{user.name.last}}
          <el-rate
            :value="user.reviews.totalAverage"
            disabled
            show-score
            text-color="#ff9900"
            score-template="{value}"
          ></el-rate>
        </h5>
      </div>
      <!-- <ul v-if="user.reviews.completed || user.reviews.published">
        <li>
          <span>Gigs Completed:</span>
          {{user.reviews.completed.length}}
        </li>
        <li>
          <span>Gigs Created:</span>
          {{user.reviews.published.length}}
        </li>
      </ul>-->
      <div class="profile-btns-wrapper" v-if="isOwnProfile">
        <!-- <router-link tag="button" :to="myGigsLink">My Gigs</router-link> -->
        <router-link :to="'/user/' + user._id + '/inbox'" tag="button" class="profile-chats-btn">
          <i class="far fa-comments"></i>
        </router-link>
        <button @click="doLogout" class="profile-logout-btn">
          <i class="fas fa-power-off"></i> Logout
        </button>
        <button class="profile-edit-btn">
          <i class="fas fa-pencil-alt"></i>
        </button>
        <button class="profile-delete-btn">
          <i class="fas fa-trash"></i>
        </button>
      </div>
      <div v-else>
        <button class="user-profile-contact-btn">Contact Me</button>
      </div>
    </div>
    <div class="profile-mid-wrapper">
      <div class="user-profile-desc">
        <h3>About Me</h3>
        <p>{{user.aboutMe}}</p>
        <h3>Skills</h3>
        <div class="user-profile-skills">
          <h4 v-for="skill in user.skills" :key="skill">{{skill}}</h4>
        </div>
      </div>

      <div>
        <ul class="profile-reviews">
          <li v-for="review in user.reviews.completed" :key="review.gigId" class="profile-review">
            <div class="profile-review-giver">
              <img :src="review.givenBy.img">
              {{review.givenBy.name}}
            </div>
            <div class="profile-review-stars">
              <span>
                <span>Work: {{review.review.work}}</span>
                <i class="fas fa-star"></i>
              </span>
              <span>
                <span>Reliable: {{review.review.reliable}}</span>
                <i class="fas fa-star"></i>
              </span>
              <span>
                <span>Overall: {{review.review.overall}}</span>
                <i class="fas fa-star"></i>
              </span>
            </div>
            <div class="profile-review-details-container">
              <p class="profile-review-title">{{ review.title}}</p>
              <p>{{review.review.text}}</p>
            </div>
          </li>
        </ul>
      </div>
      <!-- {{user.reviews.completed}} -->
    </div>
  </section>
</template>
<script>
export default {
  data() {
    return {
      user: null,
      isOwnProfile: false
    };
  },
  computed: {
    totalAverageStars() {
      var stars = "";
      var positive = Math.floor(this.user.reviews.totalAverage);
      for (let i = 0; i < positive; i++) {
        stars += "⭐";
      }
      for (let i = 0; i < 5 - positive; i++) {
        stars += "✰";
      }
      return stars;
    },
    myGigsLink() {
      return `/user/${this.$store.getters.user._id}/gigs`;
    }
  },
  methods: {
    doLogout() {
      this.$router.push("/");
      this.$store.dispatch({ type: "doLogout" });
    },
    loadUser() {
      var userId = this.$route.params.userId;
      this.$store
        .dispatch({ type: "getUserById", userId })
        .then(user => (this.user = user));
      this.$store
        .dispatch({ type: "checkIsProfileOwner", userId })
        .then(isOwner => (this.isOwnProfile = isOwner));
    }
  },
  created() {
    this.loadUser();
  },
  watch: {
    "$route.params.userId": function() {
      this.loadUser();
    }
  }
};
</script>

<style>
</style>
