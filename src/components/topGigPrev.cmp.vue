<template>
    <li v-if="gig && publisher" class="top-gig">
      <div
        :class="gig.category"
        class="gig-image"
        :style="{ backgroundImage: 'url(' + gig.details.img + ')' ,objectFit:'contain'}"
      >
        <!-- <div class="ribbon">
          <slot></slot>
        </div> -->
      </div>
      <div class="gig-info">
        <div class="publisher-container">
          <img :src="publisher.img">
          <div class="publisher-details">
            <h3>{{publisher.name.first + ' ' + publisher.name.last}}</h3>
            <h3>
              <i class="fas fa-star"></i>
              &nbsp;
              <span
                v-if="publisher"
              >{{(publisher.reviews.totalAverage)?(publisher.reviews.totalAverage).toFixed(1): 'No Reviews'}}</span>
            </h3>
          </div>
        </div>
        <div class="gig-details">
          <h5>{{gig.details.title}}</h5>
          <div class="lower-bar-container">
            <!-- <p v-if="gig.details.pos.dist">{{gig.details.pos.dist}} KM Away</p>
            <p v-else>{{gig.details.place}}</p>-->
            <h4>{{gig.details.price}}₪</h4>
            <button v-if="!isAlreadyPending">
              Gig
              <span>It</span>
            </button>
            <button v-else>Pending</button>
          </div>
        </div>
        <!-- <p class="gig-prev-desc">{{gig.details.desc}}</p> -->
      </div>
      <!-- </div> -->
    </li>
</template>

<script>
export default {
  props: {
    gig: Object,
    currUser: Object,
    type: String
  },
  data() {
    return {
      publisher: null,
      isAlreadyPending: false
    };
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
    // .then(publish=>console.log(publish.img))
    // .then(res => this.isPending());
    this.$store.dispatch;
  },
  methods: {
    gigClicked(gigId) {
      this.$emit("gigClicked", gigId);
    }
  },
  mounted() {},
  computed: {}
};
</script>

<style>
.top-gigs-container {
  color: black;
}
</style>
