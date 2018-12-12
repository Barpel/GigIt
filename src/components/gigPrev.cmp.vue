<template>
  <li v-if="gig && publisher">
    <div
      :class="classByCategory"
      class="gig-image"
      :style="{ backgroundImage: 'url(' + gig.details.img + ')' ,objectFit:'contain'}"
    ></div>
    <div>
      <div class="publisher-container">
        <img :src="publisher.img">
        <div class="publisher-info">
          <h3>{{publisher.name.first + ' ' + publisher.name.last}}</h3>
          <h3>
            <i class="fas fa-star"></i>
            &nbsp;
            <span v-if="publisher">{{(publisher.reviews.totalAverage).toFixed(1)}}</span>
          </h3>
        </div>
      </div>
      <div class="gig-details">
        <h3>{{gig.details.title}}</h3>
        <p class="gig-prev-desc">{{gig.details.desc}}</p>
        <p v-if="gig.details.pos.dist">
          <span>{{gig.details.pos.dist}} KM Away</span>
          <i :class="iconByCategory"></i>
        </p>
        <p v-else>
          <span>{{gig.details.place}}</span>
          <i :class="'fas fa-' + iconByCategory"></i>
        </p>
      </div>
      <div class="lower-bar-container">
        <p>{{gig.details.price}}₪</p>
        <button v-if="!isAlreadyPending">
          Gig
          <span>It</span>
        </button>
        <button v-else>Pending</button>
      </div>
    </div>
  </li>
</template>

<script>
export default {
  props: {
    gig: Object,
    currUser: Object
    // publisher: Object,
  },
  data() {
    return {
      publisher: null,
      isAlreadyPending: false
    };
  },
  computed: {
    classByCategory() {
      return {
        delivery: this.gig.category === "delivery",
        other: this.gig.category === "other",
        moving: this.gig.category === "moving",
        "house-work": this.gig.category === "house-work",
        "line-queue": this.gig.category === "line-queue",
        "pet-care": this.gig.category === "pet-care"
      };
    },
    iconByCategory() {
      return {
        "fas fa-dog": this.gig.category === "pet-care",
        "fas fa-ellipsis": this.gig.category === "other",
        "fas fa-hammer": this.gig.category === "house-work",
        "fas fa-male": this.gig.category === "line-queue",
        "fas fa-people-carry": this.gig.category === "moving",
        "fas fa-parachute-box": this.gig.category === "delivery"
      };
    }
  },
  created() {
    if (this.currUser) {
      var pendingGig = this.currUser.gigsIds.pending.find(gigId => {
        return gigId === this.gig._id;
      });
      if (pendingGig) this.isAlreadyPending = true;
    }
    this.$store
      .dispatch({ type: "getUserById", userId: this.gig.publisherId })
      .then(publisher => (this.publisher = publisher));
    // .then(res => this.isPending());
    this.$store.dispatch;
  },
  methods: {
    isPending() {
      // console.log(this.publisher);
      // console.log(this.gig);
    }
  }
};
//  var gigId = this.$route.params.gigId;
//     this.$store.dispatch({ type: "getGigById", gigId }).then(gig => {
//       this.gig = gig;
//         console.log('gig location setting',this.gig)
//       this.$store
//         .dispatch({ type: "getUserById", userId: gig.publisherId }) //DELETE WHEN AGGREGATION WORKS
//         .then(publisher => (this.publisher = publisher)); //DELETE WHEN AGGREGATION WORKS
//       this.$store
//         .dispatch({ type: "isGigOwner", publisherId: gig.publisherId })
//         .then(isOwner => (this.isGigOwner = isOwner));
//       if (this.isLoggedin) {
//         var matchingGig = this.user.gigsIds.pending.find(
//           gigId => gigId === gig._id
//         );
//         if (matchingGig) this.isAlreadyPending = true;
//       }
//     });
// max-height: 50px;
// background-color: white;
// cursor: pointer;
// color: #ffffff;
// font-size: 1rem;
// font-weight: bold;
// padding: 10px 0 0;
// width: 30%;
// border: none;
// border-radius: 10px;
// color: #4b052ed2
</script>

<style lang="scss">
</style>