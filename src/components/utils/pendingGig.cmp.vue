<template>
  <section class="pending-gigs-container">
      <!-- {{gigs}} -->
    <div class="pending-gigs-header" @click="isOpen = !isOpen">
        <span v-if="!isOpen">
        <i class="fas fa-angle-right"></i>
        </span>
        <span v-else>
          <i class="fas fa-angle-down"></i>
        </span>
      <h1>Pending Gigs:</h1>
    </div>
    <div class="pending-gigs" v-for="(gig, idx) in gigs" :key="idx" v-if="isOpen && gig">
      <h2 @click="goToGig(gig._id)">{{gig.details.title}}</h2>
      <button>
        Cancel
        <span>Gig</span>
      </button>
    </div>
  </section>
</template>

<script>
export default {
    props: ['gigs'],
    name: 'pendingGig',
    data() {
        return {
            isOpen: false,
        }
    },
    methods: {
        goToGig(gigId) {
            this.$router.push(`/gig/${gigId}`)
        }
    },

}
</script>

<style lang="scss" scoped>

</style>

