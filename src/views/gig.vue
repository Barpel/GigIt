<template>
  <section class="gig-container">
    <h1>
      Gig
      <span>It</span>
    </h1>
    <h2>Looking for something specific? Find your own Gig using the filtering options</h2>
    <!-- <hr> -->
    <div class="gig-list-wrappe">
      <gig-toolbar @showCategory="gigsFilterBy" @searchGig="searchGigByKey"></gig-toolbar>
      <gig-list @gigClicked="gigClicked" :gigs="gigs"></gig-list>
    </div>
  </section>
</template>

<script>
import gigToolbar from "../components/gigToolbar";
import gigList from "../components/gigList";

export default {
  computed: {
    gigs() {
      return this.$store.getters.gigs;
    }
  },

  methods: {
    gigClicked(gigId) {
      this.$router.push(`/gig/${gigId}`);
    },
    gigsFilterBy(category) {
      this.$store.dispatch({ type: "getGigs", category });
      this.$router.push(`/gig/category/${category}`);
    },
    searchGigByKey(filter) {
      this.$store.dispatch({ type: "filterByKey", filter });
    }
  },
  created() {
    if (this.$route.params.type) {
      var category = this.$route.params.type;
      this.$store.dispatch({ type: "getGigs", category });
    } else this.$store.dispatch({ type: "getGigs" });
  },
  components: {
    gigList,
    gigToolbar
  }
};
</script>

<style lang="scss" scoped>
</style>

