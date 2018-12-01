<template>
  <div class="home">
    <div class="cover-container">
      <h1>
        Gig<span>It</span>
      </h1>
      <div class="search-container">
        <router-link to="/gig/edit" tag="button">
          <i class="fas fa-plus"></i><span>Gig</span>
        </router-link>
        <input type="text" placeholder="Find your type of Gig">
        <button>Search</button>
        <button @click="$router.push('/gig/edit')">Add Gig</button>
      </div>
    </div>
    <gig-categories/>
    <hr>
    <gig-list :gigs="gigs" @gigClicked="gigClicked"/>
    <home-footer/>
  </div>
</template>

<script>
// @ is an alias to /src
import gigCategories from "@/components/gigCategories.cmp.vue";
import homeFooter from "@/components/homeFooter.cmp.vue";
import gigList from "@/components/gigList.vue";
export default {
  name: "home",
  computed: {
    gigs() {
      var gigs = JSON.parse(JSON.stringify(this.$store.getters.gigs));
      return gigs;
    }
  },
  methods: {
    gigClicked(gigId) {
      this.$router.push(`gig/${gigId}`);
    }
  },
  components: {
    gigCategories,
    homeFooter,
    gigList
  },
  created() {
    this.$store.dispatch({ type: "getGigs" });
  }
};
</script>

<style lang="scss" scoped>
hr {
  width: 90%;
  background-color: rgba(199, 199, 199, 0.356);
}
</style>


