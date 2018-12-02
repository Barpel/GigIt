<template>
  <div class="gigs-container">
    <ul>
      <div class="gig-header" @click="isOpen = !isOpen">
        <span v-if="!isOpen">
          <i class="fas fa-angle-right"></i>
        </span>
        <span v-else>
          <i class="fas fa-angle-down"></i>
        </span>
        <h1>{{header}}</h1>
      </div>
      <li v-for="(gigster, index) in gigsters" :key="index" class="gigster-container" v-if="isOpen">
        <img :src="gigster.img" @click="goToProfile(gigster._id)">
        <h2>{{gigster.name}} wants to be your Gigster!</h2>
        <h3 class="pending-user-rating-container">
          <span>Rating:</span>
          <i class="fas fa-star"></i>
          <span>{{gigster.completedReviewsAverage}}</span>
        </h3>
        <div v-if="!isGigIt" class="gigster-btn-container">
          <button @click="gigAccepted(index)" class="gigit">
            Gig
            <span>It</span>
          </button>
          <button class="later">Later</button>
        </div>
        <div v-else class="gigster-btn-container-after">
          <button  class="gigit">
            Contact
          </button>
          <button @click="gigCancel" class="later">Cancel</button>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: ["header", "gigsters"],
  name: "gigAccordion",
  data() {
    return {
      isOpen: false,
      isGigIt: false
    };
  },
  methods: {
    goToProfile(userId) {
      this.$router.push(`/user/${userId}`);
    },
    gigAccepted(index) {
        this.isGigIt = !this.isGigIt;
         this.$emit('gigAccepted',index)
    },
    gigCancel(){
        this.isGigIt = !this.isGigIt;
    }
  },
  mounted() {
    // console.log("accordion", this.gigsters);
  }
};
</script>

<style lang="scss" scoped>
.gigs-container {
  box-shadow: 0px 3px 14px 0px rgba(0, 0, 0, 0.66);
  margin: 20px 0;
  .gig-header {
    background-color: #2ca2af;
    display: grid;
    grid-template-columns: 1fr 5fr;
    justify-content: flex-start;
    cursor: pointer;
    h1 {
      display: initial;
      padding: 10px 15px;
      text-align: left;
    }
    span {
      padding: 10px;
      text-align: left;
      i {
        font-size: 1.8rem;
      }
    }
  }
  .gigster-container:not(:last-child) {
    border-bottom: 1px solid rgba(255, 255, 255, 0.719);
  }
  .gigster-container {
    display: grid;
    grid-template-columns: 1fr 2fr;
    grid-template-rows: 1fr 25px 1fr;
    grid-gap: 10px;
    align-items: center;
    padding: 10px;
    width: 90%;
    margin: 0 auto;
    h3 {
      display: flex;
      justify-content: space-evenly;
      padding: 0 50px;
      i {
        display: block;
        color: gold;
      }
      span {
        font-family: roboto;
      }
    }
    img {
      cursor: pointer;
      max-width: 100px;
      grid-column: 1;
      grid-row: 1 / span 2;
      border-radius: 50%;
    }
    h2 {
      font-size: 1.15rem;
    }
    .gigster-btn-container {
      display: grid;
      grid-template-columns: 1fr 1fr;
      grid-row: 3;
      grid-column: 2;
      button {
        width: 70%;
        height: 40px;
        justify-self: center;
        cursor: pointer;
        font-size: 1.4rem;
        border: none;
        border-radius: 5px;
        color: white;
      }
      .later {
        background-color: red;
      }
      .gigit {
        background-color: #2ca2af;
        font-family: condiment;
        span {
          color: #97a5a7;
          font-family: condiment;
        }
      }
    }
  }
  .gigster-btn-container-after{
      display: grid;
      grid-template-columns: 1fr 1fr;
      grid-row: 3;
      grid-column: 2;
  }
    button {
        width: 70%;
        height: 40px;
        justify-self: center;
        cursor: pointer;
        font-size: 1.4rem;
        border: none;
        border-radius: 5px;
        color: white;
      }
       .later {
        background-color: red;
      }
      .gigit {
        background-color: #2ca2af;
        font-family: roboto;
      }
      
}
</style>

