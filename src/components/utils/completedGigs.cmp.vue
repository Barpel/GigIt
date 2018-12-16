<template>
  <section class="completed-gigs-container">
    <li v-for="gig in gigs" :key="gig._id">
      <div class="completed-gigster" 
      @click="goToGigsterProfile(gig.pendingUsers[0].id)">
        <img :src="gig.pendingUsers[0].img" title="Go to Gigster's profile">
        <h3>{{gig.pendingUsers[0].name}}</h3>
      </div>
      <h2 @click="goToGig(gig._id)" title="Title">{{gig.details.title}}</h2>
      <h3>{{gig.details.price}}₪</h3>
      <span>
        <i class="fas fa-check-square"></i>
      </span>
    </li>
  </section>
</template>

<script>
export default {
  props: ["gigs"],
  methods: {
    goToGigsterProfile(gigsterId) {
      this.$router.push(`/user/${gigsterId}`);
    },
    goToGig(gigId) {
        this.$router.push(`/gig/${gigId}`)
    }
  },
  created() {
    console.log(this.gigs);
  }
};
</script>

<style>
</style>
