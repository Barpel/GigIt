

<template>
  <section v-if="user" class="user-profile-container grid">
    <div class="user-avatar-card">
      <button v-if="isOwnProfile" @click="doLogout" class="profile-logout-btn"><i class="fas fa-power-off"></i> Logout</button>
      <img :src="user.img" alt>
      <h5>{{user.name.first}} {{user.name.last}}</h5>
      <div>
        <!-- <span v-for="(num,idx) in totalAverageStars" :key="idx">⭐</span> -->
        <!-- <span v-for="(num,idx) in (5-totalAverageStars)" :key="idx">✰</span> -->
      </div>
      <ul>
        <li>
          <span>Gigs Completed:</span>
          {{user.reviews.completed.length}}
        </li>
        <li>
          <span>Gigs Created:</span>
          {{user.reviews.published.length}}
        </li>
      </ul>
      <div class="profile-btns-wrapper" v-if="isOwnProfile">
        <button >My Gigs</button>
        <button id="disabled-thing-stuff">My Inbox</button>
      </div>
      <div v-else>
        <button class="user-profile-contact-btn">Contact Me</button>
      </div>
    </div>
    <div class="user-profile-lastest-gigs">
      <div>
        <span>latest Gigs</span>
      </div>
      <img src="@/assets/moving.png" alt>
      <img src="@/assets/delivery.png" alt>
      <img src="@/assets/pet-care.png" alt>
    </div>
    <div class="user-profile-desc">
      <p>{{user.aboutMe}}</p>
      <div class="user-profile-skills">
        <h6 v-for="skill in user.skills" :key="skill">{{skill}}</h6>
      </div>
    </div>
    <div>
      <ul class="profile-reviews">
        <li v-for="review in user.reviews.completed"
          :key="review.gigId" class="profile-review">
          <div class="profile-review-giver">
            <img :src="review.givenBy.img">
            {{review.givenBy.name}}
          </div>
          <div class="profile-review-stars">
            <span>Work: {{review.review.work}}⭐</span>
            <span>Reliable: {{review.review.reliable}}⭐</span>
            <span>Overall: {{review.review.overall}}⭐</span>
          </div>
          <div class="profile-review-details-container">
            <p class="profile-review-title">(for: "{{review.title}}")</p>
            <br>
            <p>{{review.review.text}}</p>
          </div>
        </li>
      </ul>
    </div>
        {{user.reviews.completed}}
  </section>
</template>
<script>
export default {
  data() {
    return {
      user: {
        reviews: []
      },
      isOwnProfile: false
    };
  },
  computed: {
    // user() {
    //   return this.$store.getters.user;
    // },
    totalAverageStars() {
      return Math.floor(this.user.reviews.totalAverage);
    }
  },
  methods: {
      doLogout() {
          this.$router.push('/')
          this.$store.dispatch({type:'doLogout'})
      }
  },
  created() {
    console.log('created')
    var userId = this.$route.params.userId;
    this.$store.dispatch({ type: "getUserById", userId })
      .then(user => this.user = user)
    this.$store.dispatch({type:'checkIsProfileOwner', userId})
      .then(isOwner => {
        console.log('lets see mate:',isOwner)
        this.isOwnProfile = isOwner
      })
  },
  watch: {
  route: function(){
    console.log('hosdalksnaflaskn')
    alert('heyyy')
  }
}
};
</script>

<style>
</style>
