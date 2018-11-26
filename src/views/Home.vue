<template>
  <div class="home">
    <div class="cover-container">
      <h1>
        Gig
        <span>It</span>
      </h1>
      <div class="search-container">
        <input type="text" placeholder="Find your type of Gig...">
        <button>Search</button>
      </div>
    </div>
    <gig-categories/>
    <gig-list :gigs="gigs"/>
    <home-footer/>
  </div>
</template>

<script>
// @ is an alias to /src
import gigCategories from '@/components/gigCategories.cmp.vue'
import homeFooter from '@/components/homeFooter.cmp.vue'
import gigList from '@/components/gigList.vue'
export default {
  name: 'home',
  computed:{
    gigs() {
      var gigs= this.$store.getters.gigs;
      return gigs.splice(1, gigs.length -4);
    }
  },
  components: {
    gigCategories,
    homeFooter,
    gigList
}
}
</script>

<style lang="scss" scoped>

</style>


