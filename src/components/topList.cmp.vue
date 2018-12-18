<template>
  <section class="top-gigs-container">
    <ul class="top-gigs-list">
      <top-gig-prev
        @click.native="$emit('gigClicked', gig._id)"
        v-for="gig in topGigs"
        :key="gig._id"
        :gig="gig"
        :currUser="currUser"
      >
        <slot name="ribbon-slot">
           <span> {{title}} </span> 
        </slot>
      </top-gig-prev>
    </ul>
    <i class="see-more-link" @click="$emit('sortBy',title)">Discover More...</i>
  </section>
</template>

<script>
import topGigPrev from "./topGigPrev.cmp";
export default {
  props: {
    topGigs: Array,
    currUser: Object,
    title: String
  },
  components: {
    topGigPrev
  }
};
</script>

<style>
</style>
