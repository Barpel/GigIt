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
      <li v-for="gigster in gigsters" :key="gigster._id" class="gigster-container" v-if="isOpen">
        <img :src="gigster.img" @click="goToProfile(gigster._id)">
        <h2>{{gigster.name}} wants to be your Gigster!</h2>
        <h3 class="pending-user-rating-container">
          <span>Rating:</span>
          <i class="fas fa-star"></i>
          <span>{{gigster.completedReviewsAverage}}</span>
        </h3>
        <div v-if="!isPickedGigsterData" class="gigster-btn-container">
          <button @click="gigsterPicked(gigster)" class="accordion-gigit-btn">
            Gig
            <span>It</span>
          </button>
          <button class="accordion-later-btn">No Thanks</button>
        </div>
        <div v-else class="gigster-btn-container-after">
          <button @click="contactGigster(gigster)" class="accordion-gigit-btn">
            Contact
          </button>
          <button @click="$emit('openReviewForm',{gigId , title: header ,gigsterId:gigster.id,
          isForGigster:true, nameForReview:gigster.name})" class="accordion-completed-btn"> Completed </button>
          <button @click="gigCancel(gigster.id)" class="accordion-later-btn">Cancel</button>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: ['header', 'gigsters','gigId','isPickedGigster', 'gigTitle'],
  name: 'gigAccordion',
  data() {
    return {
      isPickedGigsterData: this.isPickedGigster,
      isOpen: false,
      isGigIt: false
    };
  },
  methods: {
    goToProfile(userId) {
      this.$router.push(`/user/${userId}`);
    },
    gigsterPicked(gigster) {
      this.isPickedGigsterData = true
      this.$emit('gigsterPicked',gigster)
    },
    gigCancel(gigsterId){
      console.log('cancelGig')
      // this.$emit('gigsterCancel',gigsterId)
    },
    contactGigster(gigster) {
      this.$emit('contactGigster',gigster)
    },
    removeGig() {
      console.log('removeGig')
      // this.$emit('removeGig')
    },
  },
}
</script>

<style lang="scss" scoped>

</style>

