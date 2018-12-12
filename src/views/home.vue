<template>
  <div class="home">
    <div class="banner">
      <div class="banner-block">
        <el-carousel trigger="click" :interval="7000">
          <el-carousel-item v-for="(carouselItem, idx) in carouselObjs" :key="idx">
            <h3>{{carouselItem.txt}}</h3>
            <img :src="carouselItem.imgUrl">
            <h4>Gig
              <span>It</span>
            </h4>
          </el-carousel-item>
        </el-carousel>
      </div>
    </div>
    <hr class="hr1">
    <div class="cover-container">
      <h1>
        Gig
        <span>It</span>
      </h1>
      <div class="search-categories-container">
      <top-gigs  :topGigs="topGigs" :currUser="user" @gigClicked="gigClicked"></top-gigs>
      <gig-toolbar @searchGig="filterByKey"></gig-toolbar>
      </div>
    </div>
    <gig-list :currUser="user" :gigs="gigs" @gigClicked="gigClicked"/>
    <hr v-if="showCategories">
    <home-footer/>
  </div>
</template>

<script>
import gigToolbar from "../components/gigToolbar";
import gigCategories from "@/components/gigCategories.cmp.vue";
import homeFooter from "@/components/homeFooter.cmp.vue";
import gigList from "@/components/gigList.vue";
import googleMap from "@/components/googleMap.vue";
import topGigs from "@/components/topGigs.cmp.vue";

export default {
  name: "home",
  data() {
    return {
      coverCounter: 0,
      showCategories: true,
      // user: null,
      carouselObjs: [
        {
          imgUrl:
            "https://res.cloudinary.com/barpel/image/upload/v1544309961/GigIt/twoGigers.png",
          txt: "Find your Gig and use your skills to make some easy extra money!"
        },
        {
          imgUrl:
            "https://res.cloudinary.com/barpel/image/upload/v1544310157/GigIt/adudegiger.png",
          txt: "Helping the community is part of our agenda. Help out today!"
        },
        {
          imgUrl:
            "https://res.cloudinary.com/barpel/image/upload/v1544309961/GigIt/thorgiger.png",
          txt:
            "New to GigIt? Take a look at our about page to learn more about it"
        },
        {
          imgUrl:
            "https://res.cloudinary.com/barpel/image/upload/v1544309960/GigIt/gigrit.png",
          txt: "Need to get something done? You can have your Gig online in less than 2 minutes!"
        }
      ]
    };
  },
  computed: {
    gigs() {
      var gigs = JSON.parse(JSON.stringify(this.$store.getters.gigs));
      return gigs;
    },
        topGigs(){
      var topGigs = JSON.parse(JSON.stringify(this.$store.getters.topGigs))
        return topGigs
    },
    gigCategoryCounter() {
      var gigCategoryCounter = JSON.parse(
        JSON.stringify(this.$store.getters.gigCategoryCounter)
      );
      return gigCategoryCounter;
    },
    user() {
      return this.$store.getters.user;
    }
  },
  methods: {
    gigClicked(gigId) {
      this.$router.push(`gig/${gigId}`);
    },
    filterByKey(filter) {
      this.showCategories = false;
      this.$store.dispatch( "getGigs",{ filter});
    },
    
  },
  components: {
    gigCategories,
    homeFooter,
    gigList,
    googleMap,
    gigToolbar,
    topGigs
  },
  created() {
    // this.$store.dispatch({type:'toggleLoadingOn'})
    this.$store.dispatch({ type: 'getGigs' })
      .then(() => this.$store.dispatch({type:'toggleLoadingOff'}) )
    navigator.geolocation.getCurrentPosition(position => {
    this.$store.dispatch({type: "userLocation", position})
    })
   
  },
  mounted() {
  },
  watch: {
    // "filter.byTitle"() {
    //   if (!this.filter.byTitle) this.showCategories = true;
    // }
  }
};
</script>

<style lang="scss" scoped>
hr {
  width: 90%;
  background-color: rgba(199, 199, 199, 0.356);
}
</style>


