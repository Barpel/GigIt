

<template>
  <section class="gig-details-container" v-if="gig && publisher">
    <div class="top-container">
      <h6 @click="goBack">
        <span>
          <i class="fas fa-arrow-left"></i>
        </span>
      </h6>

      <div class="top-user-container">
        <div class="publisher-info">
          <img :src="publisher.img" alt @click="goToProfile(gig.publisherId)">
          <div>
            <h4>{{publisher.name.first + ' ' + publisher.name.last}}</h4>
            <h4 class="publisher-review">
              <el-rate
                :value="publisher.reviews.totalAverage"
                disabled
                show-score
                text-color="#ff9900"
                score-template="({value})"
              ></el-rate>
            </h4>
          </div>
        </div>
        <button v-if="isGigOwner" @click.stop="editGig">
          <i class="fas fa-pencil-alt"></i>
        </button>
      </div>
    </div>

    <div class="mid-container">
      <div class="gig-details-left-container">
        <h4>{{gig.details.title}}</h4>
        <h5>Category: {{this.gig.category}}</h5>
        <h6>Description:
          <br>
          <p>“ {{gig.details.desc}} ”</p>
        </h6>
        <h6>Distance: {{gig.details.pos.dist}} KM Away</h6>
        <p>
          From: {{gig.details.gigTime[0] | localTime}}
          <br>
          <br>
          To: {{gig.details.gigTime[1] | localTime}}
        </p>
      </div>

      <div class="gig-details-right-container">
        <div class="call-to-action-container">
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

        <div class="map-container">
          <google-map :editPage="editPage" :gig="gig"/>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import bus, { USR_MSG_DISPLAY } from "../eventBus.js";
import GoogleMap from "@/components/googleMap";

export default {
  name: "gigDetails",
  data() {
    return {
      editPage: false,
      gig: null,
      isGigOwner: null,
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
  filter: {
    localTime(time) {
      if (!time) return "";

      return time;
    }
  },
  methods: {
    goBack() {
      this.$router.push("/");
    },
    requestGig() {
      if (this.isAlreadyPending) return;

      let publisherId = this.gig.publisherId;
      bus.$emit(USR_MSG_DISPLAY, { type: "success", txt: "Gig Signed" });
      this.$store.dispatch({
        type: "emitToUser",
        eventMsg: {
          txt: `${this.user.name.first} wants to be your gigster!`,
          type: "success",
          link: `/user/${this.user._id}`,
          gigsterImg: this.user.img,
        },
        action: "toProfile",
        userId: publisherId
      });
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
      this.publisher.notficCount++
      this.$store.dispatch({ type: "updateUser", user:this.publisher})
      this.$store.dispatch({ type: "updateGig", gig: this.gig, userGigsListToUpdate })
        .then(() => this.$router.push("/"));
    },
    editGig() {
      this.$router.push(`/gig/edit/${this.gig._id}`);
    },
    goToProfile(publisherId) {
      this.$router.push(`/user/${publisherId}`);
    }
  },
  created() {
    var gigId = this.$route.params.gigId;
    this.$store.dispatch({ type: "getGigById", gigId }).then(gig => {
      this.gig = gig;
      if(this.user && gig.publisherId === this.user._id) this.isGigOwner = true
      this.$store.dispatch({ type: "getUserById", userId: gig.publisherId }) //DELETE WHEN AGGREGATION WORKS
        .then(publisher => (this.publisher = publisher)); //DELETE WHEN AGGREGATION WORKS
      if (this.isLoggedin) {
        var matchingGig = this.user.gigsIds.pending.find(
          gigId => gigId === gig._id
        );
        if (matchingGig) this.isAlreadyPending = true;
      }
    });
  },
  mounted() {},
  components: {
    GoogleMap
  }
};
</script>