<template>
  <div class="user-gigs-container">
    <ul>
      <div class="gig-header" @click="isOpen = !isOpen">
        <span v-if="!isOpen">
          <i class="fas fa-angle-right"></i>
        </span>
        <span v-else>
          <i class="fas fa-angle-down"></i>
        </span>
        <h1>{{header}}</h1>
        <span @click="removeGig"><i class="fas fa-trash-alt"></i></span>
      </div>
      <li v-for="(gigster, index) in gigsters" :key="index" class="gigster-container" v-if="isOpen">
        <img :src="gigster.img" @click="goToProfile(gigster._id)">
        <h2>{{gigster.name}} wants to be your Gigster!</h2>
        <h3 class="pending-user-rating-container">
          <span>Rating:</span>
          <i class="fas fa-star"></i>
          <span>{{gigster.completedReviewsAverage}}</span>
        </h3>
        <div v-if="!isGigIt" class="gigster-btn-container">
          <button @click="gigAccepted(index)" class="gigit">
            Gig
            <span>It</span>
          </button>
          <button class="later">Later</button>
        </div>
        <div v-else class="gigster-btn-container-after">
          <button class="gigit">
            Contact
          </button>
          <button @click="gigCancel" class="later">Cancel</button>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: ["header", "gigsters"],
  name: "gigAccordion",
  data() {
    return {
      isOpen: false,
      isGigIt: false
    };
  },
  methods: {
    goToProfile(userId) {
      this.$router.push(`/user/${userId}`);
    },
    gigAccepted(index) {
        this.isGigIt = !this.isGigIt;
         this.$emit('gigAccepted',index)
    },
    gigCancel(){
        this.isGigIt = !this.isGigIt
    },
    removeGig() {
      this.$emit('removeGig')
    }
  },
  mounted() {
    // console.log("accordion", this.gigsters);
  }
};
</script>

<style lang="scss" scoped>

</style>

