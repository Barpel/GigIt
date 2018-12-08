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
        <div class="search-container">

          <router-link to="/gig/edit" tag="button">
            <i class="fas fa-plus"></i>
            <span>Gig</span>
          </router-link>
          <input
            type="text"
            placeholder="Find your next Gig"
            @input="filterByKey"
            v-model="filter.byTitle"
            ref="searchGig"
          >
          <button @click="focusOnSearch">
            <i class="fas fa-search"></i>
          </button>
        </div>
      <!-- <gig-categories :gigCategoryCounter="gigCategoryCounter" v-if="showCategories"/> -->
      <!-- <gig-toolbar @showCategory="gigsFilterBy" @searchGig="searchGigByKey"></gig-toolbar> -->
      <gig-toolbar></gig-toolbar>

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
export default {
  name: "home",
  data() {
    return {
      coverCounter: 0,
      filter: {
        byCategory: "",
        byTitle: ""
      },
      showCategories: true,
      // user: null,
      carouselObjs: [
        {
          imgUrl:
            "https://res.cloudinary.com/barpel/image/upload/v1544093475/GigIt/giger.png",
          txt: "Use your skills to make some easy extra money!"
        },
        {
          imgUrl:
            "https://res.cloudinary.com/barpel/image/upload/v1543912163/GigIt/mechanic.png",
          txt: "Helping the community is part of our agenda. Help out today!"
        },
        {
          imgUrl:
            "https://res.cloudinary.com/barpel/image/upload/v1544093447/GigIt/lady-chef.png",
          txt:
            "Sometimes cooking is too tiring. Get a Gigster to make you a nice meal!"
        },
        {
          imgUrl:
            "https://res.cloudinary.com/barpel/image/upload/v1543912160/GigIt/Indian-teacher.png",
          txt: "How are your teaching skills? Come tutor the community!"
        }
      ]
    };
  },
  computed: {
    gigs() {
      var gigs = JSON.parse(JSON.stringify(this.$store.getters.gigs));
      return gigs;
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
    filterByKey() {
      this.showCategories = false;
      this.$store.dispatch({ type: "filterByKey", filter: this.filter });
    },
    focusOnSearch() {
      this.$refs.searchGig.focus();
    }
  },
  components: {
    gigCategories,
    homeFooter,
    gigList,
    googleMap,
    gigToolbar
  },
  created() {
    this.$store.dispatch({type:'toggleLoadingOn'})
    this.$store.dispatch({ type: "getGigs" })
      .then(() =>this.$store.dispatch({type:'toggleLoadingOff'}) )
    navigator.geolocation.getCurrentPosition(position => {
    this.$store.dispatch({type: "userLocation", position})
    })
   
  },
  mounted() {
  },
  watch: {
    "filter.byTitle"() {
      if (!this.filter.byTitle) this.showCategories = true;
    }
  }
};
</script>

<style lang="scss" scoped>
hr {
  width: 90%;
  background-color: rgba(199, 199, 199, 0.356);
}
</style>


