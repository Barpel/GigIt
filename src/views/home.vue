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
      <div class="cover-background1">
        <img src="https://res.cloudinary.com/barpel/image/upload/v1544710606/GigIt/happy_bar_using_hammer.png" class="img1">
        <img
          src="https://res.cloudinary.com/barpel/image/upload/v1545063714/GigIt/happy_guy_bring_bag.png"
          class="img2"
        >
        <img
          src="https://res.cloudinary.com/barpel/image/upload/v1545063712/GigIt/painting_happy_jonas.png"
          class="img3"
        >
        <img
          src="https://res.cloudinary.com/barpel/image/upload/v1544710699/GigIt/2_happy_guys_carry_1_couch.png"
          class="img4"
        >
      </div>
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
      <h1 class="top-gigs-title">
        Top paying
        <span>Gigs</span> :
      </h1>
      <top-list :topGigs="topPriceGigs" :currUser="user" @gigClicked="gigClicked" title="Price"/>
      <h1 class="top-gigs-title">
        Within a mile from you
        <span>Gigs</span> :
      </h1>
      <top-list :topGigs="nearestGigs" :currUser="user" @gigClicked="gigClicked" title="Dist"/>
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
            "https://res.cloudinary.com/barpel/image/upload/v1545131973/GigIt/guy_with_a_phone.png"
        },
        {
          imgUrl:
            "https://res.cloudinary.com/barpel/image/upload/v1545134043/GigIt/sexy_guy_with_a_motocycle_no_wind_shield.png"
        },
        {
          imgUrl:
            "https://res.cloudinary.com/barpel/image/upload/v1545134543/GigIt/2_guys_sharing_a_box.png"
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
      return this.$store.getters.gigs;
    },
    nearestGigs() {
      return this.$store.getters.nearestGigs;
    },
    topPriceGigs() {
      return this.$store.getters.topPriceGigs;
    },
    gigCategoryCounter() {
      return this.$store.getters.gigCategoryCounter;
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
    filterByKey(filter, sorter) {
      if(filter.byCategory || filter.byTitle || sorter) this.isFiltered = true
      else this.isFiltered = false
      this.showCategories = false;
      this.$store.dispatch("getGigs", { filter, sorter });
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
  }
};
</script>

<style lang="scss" scoped>
hr {
  width: 90%;
  background-color: rgba(199, 199, 199, 0.356);
}
</style>


