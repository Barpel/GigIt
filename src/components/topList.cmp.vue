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
          <span>{{title}}</span>
        </slot>
      </top-gig-prev>
    </ul>
    <h2 class="see-more-link" @click="seeMore(title)">Find More &nbsp;
      <i class="fas fa-chevron-right"></i>
    </h2>
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
  methods: {
    seeMore(title) {
      console.log(title);
    }
  },
  components: {
    topGigPrev
  }
};
</script>

<style>
</style>
