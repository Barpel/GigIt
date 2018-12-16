<template>
  <section class="top-gigs-container">
    <slot name="slot1"></slot>
    <ul class="top-gigs-list">
      <top-gigs
        @click.native="$emit('gigClicked', gig._id)"
        v-for="gig in topGigs"
        :key="gig._id"
        :gig="gig"
        :currUser="currUser"
      >
        <span name="ribbon-slot">Most Paid Gig</span>
      </top-gigs>
    </ul>
  </section>
</template>

<script>
import topGigs from "./topGigs.cmp";
export default {
  props: {
    topGigs: Array,
    currUser: Object,
    type: "string"
  },
  created() {},

  components: {
    topGigs
  }
};
</script>

<style>
</style>
