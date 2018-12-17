<template>
  <div class="home">
    <div class="banner">
      <div class="banner-block">
        <h1>Small Gigs, Big Money</h1>
        <div class="gig-story-container">
          <div class="gig-story-background"></div>
          <!-- <transition name="fade"> -->
          <!-- <img @load="onImgLoaded" v-show="imgLoaded" :src="carouselObjs[0].imgUrl" :class="'img' + imgCounterClass"/> -->
          <img
            @load="onImgLoaded"
            v-show="imgCounter===0"
            :src="carouselObjs[0].imgUrl"
            :class="'img' + imgCounterClass"
          >
          <img
            @load="onImgLoaded"
            v-show="imgCounter===1"
            :src="carouselObjs[1].imgUrl"
            :class="'img' + imgCounterClass"
          >
          <img
            @load="onImgLoaded"
            v-show="imgCounter===2"
            :src="carouselObjs[2].imgUrl"
            :class="'img' + imgCounterClass"
          >
          <h2 @load="onImgLoaded" v-show="imgCounter===3" :class="'img' + imgCounterClass">
            Gig
            <span>It</span>
          </h2>
          <!-- </transition> -->
        </div>
      </div>
    </div>
    <!-- <hr class="hr1"> -->
    <div class="cover-container">
      <div class="cover-background1"></div>
      <div class="cover-background2"></div>
      <h1>
        Gig
        <span>It</span>
      </h1>
      <div class="search-categories-container">
        <gig-toolbar :gigCategoryCounter="gigCategoryCounter" @searchGig="filterByKey"/>
      </div>
    </div>
    <div v-if="!isFiltered" class="home-top-gigs-container">
      <h1 class="top-gigs-title">Top paying <span>Gigs</span> :</h1>
      <top-list :topGigs="topGigs" :currUser="user" @gigClicked="gigClicked" title="Top Price"/>
      <h1 class="top-gigs-title"><span>Gigs</span> within a mile :</h1>
      <top-list :topGigs="nearestGigs" :currUser="user" @gigClicked="gigClicked" title="Nearest"/>
      <br>
      <hr >

    </div>
    <gig-list :currUser="user" :gigs="gigs" @gigClicked="gigClicked"/>
  </div>
</template>

<script>
import gigToolbar from "../components/gigToolbar";
import gigCategories from "@/components/gigCategories.cmp.vue";
import homeFooter from "@/components/homeFooter.cmp.vue";
import gigList from "@/components/gigList.vue";
import topList from "@/components/topList.cmp.vue";
import googleMap from "@/components/googleMap.vue";

export default {
  name: "home",
  data() {
    return {
      imgCounter: 0,
      imgLoaded: false,
      showCategories: true,
      isFiltered: false,
      // user: null,
      carouselObjs: [
        {
          imgUrl:
            "https://res.cloudinary.com/barpel/image/upload/v1544724278/GigIt/story1.png"
        },
        {
          imgUrl:
            "https://res.cloudinary.com/barpel/image/upload/v1544722792/GigIt/happy_bar_on_his_way2.png"
        },
        {
          imgUrl:
            "https://res.cloudinary.com/barpel/image/upload/v1544728766/GigIt/2_guys_handshake_with_blanket2.png"
        },
        {
          imgUrl:
            "https://res.cloudinary.com/barpel/image/upload/v1544721914/gigitUploads/gigiit.png"
        }
      ]
    };
  },
  computed: {
    gigs() {
      var gigs = JSON.parse(JSON.stringify(this.$store.getters.gigs));
      return gigs;
    },
    nearestGigs() {
      var nearestGigs = JSON.parse(JSON.stringify(this.$store.getters.nearestGigs));
      return nearestGigs;
    },
    topGigs() {
      var topGigs = JSON.parse(JSON.stringify(this.$store.getters.topGigs));
      return topGigs;
    },
    gigCategoryCounter() {
      var gigCategoryCounter = this.$store.getters.gigCategoryCounter

      return gigCategoryCounter;
    },
    user() {
      return this.$store.getters.user;
    },
    imgCounterClass() {
      return this.imgCounter;
    }
  },
  methods: {
    onImgLoaded() {
      this.imgLoaded = true;
    },
    gigClicked(gigId) {
      this.$router.push(`gig/${gigId}`);
    },
    filterByKey(filter) {
      if(filter.byCategory || filter.byTitle) this.isFiltered = true
      else this.isFiltered = false
      this.showCategories = false;
      this.$store.dispatch("getGigs", { filter });
    }
  },
  components: {
    gigCategories,
    homeFooter,
    gigList,
    googleMap,
    gigToolbar,
    topList
  },
  created() {
    setInterval(() => {
      this.imgCounter++;
      if (this.imgCounter === 4) this.imgCounter = 0;
    }, 4000);
    // this.$store.dispatch({type:'toggleLoadingOn'})
    this.$store
      .dispatch({ type: "getGigs" })
      .then(() => this.$store.dispatch({ type: "toggleLoadingOff" }));
    navigator.geolocation.getCurrentPosition(position => {
      this.$store.dispatch({ type: "userLocation", position });
    });
  },
};
</script>

<style lang="scss" scoped>
hr {
  width: 90%;
  background-color: rgba(199, 199, 199, 0.356);
}
</style>


