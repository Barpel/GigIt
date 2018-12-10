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
        <span @click.stop="$emit('removeGig',gigId)"><i class="fas fa-trash-alt"></i></span>
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
            <i class="fas fa-comments"></i>
          </button>
          <button @click="$emit('openReviewForm',{gigId , title: header ,gigsterId:gigster.id,
          isForGigster:true, nameForReview:gigster.name})" class="accordion-completed-btn"> <i class="fas fa-check-circle"></i> </button>
          <button @click="gigCancel" class="accordion-later-btn"><i class="fas fa-ban"></i></button>
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
    gigCancel(){
      this.isPickedGigsterData = false
      this.$emit('gigsterPicked',null)      
    },
    contactGigster(gigster) {
      this.$emit('contactGigster',gigster)
    },
  },
}
</script>

<style lang="scss" scoped>

</style>

