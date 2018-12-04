<template>
  <div class="home">
    <div class="banner">
      <div class="welcome-container">
        <img :src="user.img" v-if="user">
        <i class="fas fa-user-circle" v-else></i>
        <h1>Hi {{(user)? user.name.first: 'Guest'}}</h1>
        <router-link to="/gig/edit" tag="button" v-if="user" class="welcome-add-gig-btn">
          <i class="fas fa-plus"></i>
          <span>Gig</span>
        </router-link>
        <router-link to="/user/login" tag="button" v-else>Login</router-link>
      </div>

      <div class="block">
        <el-carousel trigger="click" :interval="7000">
          <el-carousel-item v-for="(carouselItem, idx) in carouselObjs" :key="idx">
            <h3>{{carouselItem.txt}}</h3>
            <img :src="carouselItem.imgUrl">
            <h4>Gig<span>It</span></h4>
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
      <div class="search-container">
        <router-link to="/gig/edit" tag="button">
          <i class="fas fa-plus"></i>
          <span>Gig</span>
        </router-link>
        <input
          type="text"
          placeholder="Find your type of Gig"
          @input="filterByKey"
          v-model="filter.byTitle"
        >
        <button>Search</button>
      </div>
    </div>

    
    <gig-list :gigs="gigs" @gigClicked="gigClicked"/>
    <hr v-if="showCategories">
    <gig-categories :gigCategoryCounter="gigCategoryCounter" v-if="showCategories"/>
    <home-footer/>
  </div>
</template>

<script>
import gigCategories from "@/components/gigCategories.cmp.vue";
import homeFooter from "@/components/homeFooter.cmp.vue";
import gigList from "@/components/gigList.vue";
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
            "https://res.cloudinary.com/barpel/image/upload/v1543912163/GigIt/mechanic.png",
          txt: "Use your skills to make some easy extra money!"
        },
        {
          imgUrl:
            "https://res.cloudinary.com/barpel/image/upload/v1543912163/GigIt/giger.png",
          txt: "Helping the community is part of our agenda. Help out today!"
        },
        {
          imgUrl:
            "https://res.cloudinary.com/barpel/image/upload/v1543912161/GigIt/lady-chef.png",
          txt: "Sometimes cooking is too tiring. Get a Gigster to make you a nice meal!"
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
      var gigCategoryCounter =JSON.parse(JSON.stringify(this.$store.getters.gigCategoryCounter)) 
      // console.log(gigCategoryCounter)
      return gigCategoryCounter
      // return this.coverCounter;
    }
  },
  methods: {
    gigClicked(gigId) {
      this.$router.push(`gig/${gigId}`);
    },
    filterByKey() {
      this.showCategories = false
      this.$store.dispatch({ type: "filterByKey", filter: this.filter })
    }
  },
  components: {
    gigCategories,
    homeFooter,
    gigList
  },
  created() {
    this.$store.dispatch({ type: "getGigs" });

  },
  mounted() {
    //   setInterval(() => {
    //     this.coverCounter === 5 ? (this.coverCounter = 0) : this.coverCounter++
    //     // console.log("interval");
    //   }, 5000);
     
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


