

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
        <router-link :to="'/user/' + user._id + '/inbox'" tag="button" class="profile-chats-btn" v-if="!isOwnProfile">
          <i class="far fa-comments" ></i>
        </router-link>
        <button @click="doLogout" class="profile-logout-btn">
          <i class="fas fa-power-off"></i> Logout
        </button>
        <button class="profile-edit-btn" @click="goToEditProfile">
          <i class="fas fa-pencil-alt"></i>
        </button>
        <!-- <button class="profile-delete-btn">
          <i class="fas fa-trash"></i>
        </button> -->
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

      <div class="profile-tabs-wrapper">
        <div class="profile-tabs-container">
          <div class="stv-radio-tabs-wrapper">
            <input
              type="radio"
              class="stv-radio-tab"
              name="reviews"
              value="1"
              id="tab1"
              checked
              v-model="tabContent"
            >
            <label for="tab1">Reviews</label>
            <input
              type="radio"
              class="stv-radio-tab"
              name="published gigs"
              value="2"
              id="tab2"
              v-model="tabContent"
            >
            <label for="tab2" v-if="isOwnProfile && gigs.publishedGigs.length">Published Gigs</label>
            <input
              type="radio"
              class="stv-radio-tab"
              name="pending gigs"
              value="3"
              id="tab3"
              v-model="tabContent"
            >
            <label for="tab3" v-if="isOwnProfile && gigs.pendingGigs.length">Pending Gigs</label>
            <input
              type="radio"
              class="stv-radio-tab"
              name="completed gigs"
              value="4"
              id="tab4"
              v-model="tabContent"
            >
            <label for="tab4" v-if="isOwnProfile && gigs.completedGigs.length">Completed Gigs</label>
          </div>
        </div>
        <ul class="profile-reviews" v-if="+tabContent=== 1">
          <li v-for="review in user.reviews.completed" :key="review.gigId" class="profile-review">
            <div class="profile-review-giver">
              <img :src="review.givenBy.img">
              {{review.givenBy.name}}
            </div>
            <div class="profile-review-stars">
              <span>
                <span>Work: {{review.ratings.work}}</span>
                <i class="fas fa-star"></i>
              </span>
              <span>
                <span>Reliable: {{review.ratings.reliable}}</span>
                <i class="fas fa-star"></i>
              </span>
              <span>
                <span>Overall: {{review.ratings.overall}}</span>
                <i class="fas fa-star"></i>
              </span>
            </div>
            <div class="profile-review-details-container">
              <p class="profile-review-title">{{ review.title}}</p>
              <p>{{review.ratings.text}}</p>
            </div>
          </li>
        </ul>
        <ul class="published-gigs" v-if="gigs.publishedGigs.length &&+tabContent === 2">
          <div
            v-for="publishedGig in gigs.publishedGigs"
            :key="publishedGig._id"
            v-if="publishedGig && publishedGig.pendingUsers"
          >
            <gig-accordion
              @removeGig="removeGig"
              @gigsterPicked="gigsterPicked($event, publishedGig)"
              @contactGigster="contactGigster($event, {title: publishedGig.details.title, _id: publishedGig._id})"
              @openReviewForm="openReviewForm"
              :gigsters="publishedGig.pendingUsers"
              :gigId="publishedGig._id"
              :header="publishedGig.details.title"
              :isPickedGigster="publishedGig.isPickedGigster"
              v-if="publishedGig.pendingUsers"
            ></gig-accordion>
          </div>
        </ul>
        <ul v-if="gigs.pendingGigs.length &&+tabContent === 3">
          <pending-gig :gigs="gigs.pendingGigs"></pending-gig>
        </ul>
      </div>
    </div>
    <giger-review
      :reviewStats="currReviewStats"
      v-if="showReviewForm"
      @reviewSumbitted="submitReview"
    />
  </section>
</template>
<script>
import gigAccordion from "../components/utils/gigAccordion.cmp";
import pendingGig from "../components/utils/pendingGig.cmp";
import gigerReview from "../components/gigerReview.cmp";
export default {
  
  data() {
    return {
      user: null,
      isOwnProfile: false,
      tabContent: 1,
      gigs: {
        completedGigs: [],
        pendingGigs: [],
        publishedGigs: []
      },
      pickGigster: {
        isPicked: false,
        gigster: []
      },
      showReviewForm: false,
      currReviewStats: null
    };
  },
  methods: {
    goToEditProfile() {
      this.$router.push(`/user/edit/${this.$route.params.userId}`)
    },
    doLogout() {
      this.$router.push("/");
      this.$store.dispatch({ type: "doLogout" });
    },
    removeGig(gigId) {
      this.$confirm(
        "Are you sure you want to delete your gig? ",
        "Warning",
        {
          confirmButtonText: "Yes i'm sure!",
          cancelButtonText: "Cancel",
          type: "warning"
        }
      )
      .then(() => this.$store.dispatch({ type: "removeGig", gigId }))
    },
    loadUser() {
      var userId = this.$route.params.userId;
      this.$store.dispatch({ type: "getUserById", userId }).then(user => {
        this.user = user;
        // console.log('set user', user)
        this.getUserGigs();
      });
      this.$store
        .dispatch({ type: "checkIsProfileOwner", userId })
        .then(isOwner => (this.isOwnProfile = isOwner));
    },
    gigsterPicked(gigster, gig) {
      if(!gigster) {
        gig.isPickedGigster = false
        gig.pendingUsers = gig.holdingUsers
        gig.holdingUsers = null
        this.$store.dispatch({ type: "updateGig", gig });
      }
      else {
        gig.isPickedGigster = true;
        gig.holdingUsers = gig.pendingUsers;
        gig.pendingUsers = [gigster];
        this.$socket.emit("test", "am testing");
        this.$store.dispatch({ type: "updateGig", gig });
      }
    },
    contactGigster(gigster, gigData) {
      this.$store
        .dispatch({ type: "contactUser", gigster, gigData, maister: this.user })
        .then(() => this.$router.push(`/user/${this.user._id}/inbox`));
    },
    getUserGigs() {
      var userGigIds = { ...this.user.gigsIds };
      var completedGigIds = userGigIds.completed;
      var pendingGigIds = userGigIds.pending;
      var publishedGigIds = userGigIds.published;
      
      completedGigIds.forEach(completedGigId => {
        this.$store
          .dispatch({ type: "getGigById", gigId: `${completedGigId}` })
          .then(gig => {
            this.gigs.completedGigs.push(gig);
          });
      });

      pendingGigIds.forEach(pendingGigId => {
        this.$store
          .dispatch({ type: "getGigById", gigId: `${pendingGigId}` })
          .then(gig => {
            this.gigs.pendingGigs.push(gig);
          });
      });
      publishedGigIds.forEach(publishedGigId => {
        this.$store
          .dispatch({ type: "getGigById", gigId: `${publishedGigId}` })
          .then(gig => {
            this.gigs.publishedGigs.push(gig);
            console.log(this.gigs.publishedGigs)
          });
      });
    },
    openReviewForm(reviewStats) {
      reviewStats.maisterId = this.user._id;
      this.currReviewStats = reviewStats;
      this.showReviewForm = true;
    },
    submitReview(ratings = null) {
      var givenReview = {
        ratings,
        gigId: this.currReviewStats.gigId,
        createdAt: Date.now(),
        givenBy: { name: this.user.name.first, img: this.user.img },
        title: this.currReviewStats.title
      };
      this.$store.dispatch({
        type: "reviewAndCompleteGig",
        review: givenReview,
        reviewStats: this.currReviewStats
      });
      this.showReviewForm = false;
      this.currReviewStats = null;
    }
  },
  created() {
    this.loadUser();
    // console.log("gigs", this.gigs);
  },
  watch: {
    "$route.params.userId": function() {
      this.loadUser();
    },
  },
  components: {
    gigAccordion,
    pendingGig,
    gigerReview
  }
};
</script>

