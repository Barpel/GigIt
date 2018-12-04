

<template>
  <section class="gig-details-container" v-if="gig && publisher">
    <div class="top-nav">
      <h6 @click="goBack">
        <span>
          <i class="fas fa-arrow-left"></i>
          Back
        </span>
        <button v-if="isGigOwner" @click.stop="editGig">
          <h1>Edit</h1>
        </button>
      </h6>
    </div>
    <div class="detail-container">
      <div class="top-detail-title">
        <h5>
          <span>{{gig.details.title}}</span>
          <div class="category-img-container">
            <h5>Category: {{this.gig.category}}</h5>
          </div>
        </h5>
        <p>{{gig.details.desc}}</p>
        <p>location: {{gig.details.pos.dist}}</p>
        <div class="gigit-detail-container">
          <p>Earn {{this.gig.details.price}}₪ for this Gig</p>
          <button v-if="!isGigOwner" @click="requestGig" class="gigit-btn">
            <h1>
              <span v-if="!isAlreadyPending">
                Gig
                <span>It</span>
              </span>
              <span v-else>Pending</span>
            </h1>
          </button>
        </div>
        <!-- <p>From: {{gig.details.gigTime.from}} To: {{gig.details.gigTime.to}}</p> -->
      </div>
      <div class="avatar-img-container">
        <img :src="publisher.img" alt @click="goToProfile(gig.publisherId)">
        <h4>{{publisher.name.first + ' ' + publisher.name.last}}</h4>
      </div>

      <div class="review-details-container">
        <ul>User Score
          <li>
            <span>Payment</span> &nbsp;
            <span>
              <el-rate value="4" disabled show-score score-template="{value}" text-color="white"></el-rate>
            </span>
          </li>
          <li>
            <span>Reliable</span> &nbsp;
            <span>
              <el-rate value="4.3" disabled show-score score-template="{value}" text-color="white"></el-rate>
            </span>
          </li>
          <li>
            <span>Overall</span> &nbsp;
            <span>
              <el-rate value="4.6" disabled show-score score-template="{value}" text-color="white"></el-rate>
            </span>
          </li>
          <h4>
            More
            Reviews...
          </h4>
        </ul>
      </div>
      <div class="map-img-container">
        <google-map @addMarker="getLocation"/>
        <img src="../assets/mapDemo.jpg" alt>
      </div>
    </div>
  </section>
</template>

<script>
import bus, { USR_MSG_DISPLAY } from "../eventBus.js";
// import GoogleMap from "@/components/googleMap";

export default {
  name: "gigDetails",
  data() {
    return {
      gig: null,
      isGigOwner: true,
      isAlreadyPending: false,
      publisher: null
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
    requestGig() {
      if (this.isAlreadyPending) return;
      setTimeout(() => {
        this.$router.push("/gig");
      }, 20);
      bus.$emit(USR_MSG_DISPLAY, { type: "success", txt: "Gig Signed" });
      this.$store.dispatch({type:'emitToUser',eventMsg:{txt:'New Gig Request', type:'success'}, userId:this.gig.publisherId})
      var currUser = this.user;
      this.gig.isRead = false;
      this.gig.pendingUsers.push({
        name: currUser.name.first,
        id: currUser._id,
        img: currUser.img,
        completedReviewsAverage: currUser.reviews.completedAverage
      });
      var userGigsListToUpdate = this.user.gigsIds.pending;

      // this.user.gigsIds.pending.push(this.gig._id);
      // this.$store.dispatch({ type: "updateUser", user: this.user });
      this.$store.dispatch({
        type: "updateGig",
        gig: this.gig,
        userGigsListToUpdate
      });
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
    this.$store.dispatch({ type: "getGigById", gigId }).then(gig => {
      this.gig = gig;
      this.$store
        .dispatch({ type: "getUserById", userId: gig.publisherId }) //DELETE WHEN AGGREGATION WORKS
        .then(publisher => (this.publisher = publisher)); //DELETE WHEN AGGREGATION WORKS
      this.$store
        .dispatch({ type: "isGigOwner", publisherId: gig.publisherId })
        .then(isOwner => (this.isGigOwner = isOwner));
      if (this.isLoggedin) {
        var matchingGig = this.user.gigsIds.pending.find(
          gigId => gigId === gig._id
        );
        if (matchingGig) this.isAlreadyPending = true;
      }
    });
  },
  mounted() {
  },
  components:{
    // GoogleMap
  }
};
</script>