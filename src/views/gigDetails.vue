

<template>
  <section class="gig-details" v-if="gig">
    <div class="top-detail-container">
      <div class="top-detail-title">
        <h6 @click="goBack">
          <i class="fas fa-arrow-left"></i>
          Back
        </h6>
        <br>
        <h5>{{gig.details.title}}</h5>
        <p>{{gig.details.desc}}</p>
        <p>location: {{gig.details.pos.dist}}</p>
        <!-- <p>From: {{gig.details.gigTime.from}} To: {{gig.details.gigTime.to}}</p> -->
      </div>
      <div class="avatar-img-container">
        <img src="../assets/racheli.png" alt @click="goToProfile(gig.publisherId)">
        <h5>Rachel Bahabua</h5>
        <button v-if="isGigOwner" @click="editGig" class="gigit-btn">
          <h1>Edit</h1>
        </button>
      </div>
    </div>
    <div class="mid-details-container">
      <div class="gigit-detail-container">
        <p>Earn {{this.gig.details.price}} for this Gig</p>
        <button v-if="!isGigOwner" @click="requestGig" class="gigit-btn">
          <h1>
            <span v-if="!isAlreadyPending">Gig<span>It</span></span>
            <span v-else>Pending</span>
          </h1>
        </button>
      </div>
      <div class="category-img-container">
        <h5>{{this.gig.category}}</h5>
        <img :src="`@/assets/${this.gig.category}.jpg`" alt>
      </div>
    </div>
    <div>
      <div class="details-container-nav"></div>
      <div class="review-details-container">
        <ul>User Score
          <li>
            Payment
            <span>⭐⭐⭐⭐✰</span>
          </li>
          <li>
            Reliable
            <span>⭐⭐⭐⭐✰</span>
          </li>
          <li>
            Overall
            <span>⭐⭐⭐⭐✰</span>
          </li>
          <h4>
            More
            Reviews...
          </h4>
        </ul>
      </div>
    </div>
    <div class="map-img-container">
      <img src="../assets/mapDemo.png" alt>
    </div>
  </section>
</template>

<script>
import bus, { USR_MSG_DISPLAY } from "../eventBus.js";

export default {
  name: "gigDetails",
  data() {
    return {
      gig: null,
      isGigOwner: true,
      isAlreadyPending: false,
    };
  },
  computed: {
    user() {
      return this.$store.getters.user;
    },
    isLoggedin() {
      return this.$store.getters.isLoggedin;
    }
  },
  methods: {
    goBack() {
      this.$router.push("/gig");
    },
    requestGig(ev) {
      if (this.isAlreadyPending) return;
      setTimeout(() => {
        this.$router.push("/gig");
      }, 20);
      bus.$emit(USR_MSG_DISPLAY, { type: "success", txt: "Gig Signed" });
      var currUser = this.user
      this.gig.isRead = false;
      this.gig.pendingUsers.push({
        name: currUser.name.first,
        id: currUser._id,
        img: currUser.img,
        completedReviewsAverage: currUser.reviews.completedAverage
      }),
        this.user.gigsIds.pending.push(this.gig._id);
      this.$store.dispatch({ type: "updateUser", user: this.user });
      this.$store.dispatch({ type: "updateGig", gig: this.gig });
    },
    editGig() {
      console.log("edit");
    },
    goToProfile(publisherId) {
      this.$router.push(`/user/${publisherId}`);
    }
  },
  created() {
    var gigId = this.$route.params.gigId;
    this.$store.dispatch({ type: "getGigById", gigId })
      .then(gig => {
          this.gig = gig;
          this.$store.dispatch({ type: "isGigOwner", publisherId: gig.publisherId })
            .then(isOwner => (this.isGigOwner = isOwner));
          if(this.isLoggedin) {
            var matchingGig = this.user.gigsIds.pending.find(gigId => gigId === gig._id)
            if(matchingGig) this.isAlreadyPending = true;
          }
      });
    
  }
};
</script>