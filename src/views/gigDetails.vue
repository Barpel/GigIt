

<template>
  <section v-if="gig">
    <div class="top-detail-container">
      <div class="top-detail-title">
        <h6 @click="goBack">
          <i class="fas fa-arrow-left"></i>
          Back
        </h6>
        <br>
        <h5>{{gig.details.title}}</h5>
        <p>{{gig.details.desc}}</p>
        <p>location: {{gig.details.pos.dist}}</p>
        <!-- <p>From: {{gig.details.gigTime.from}} To: {{gig.details.gigTime.to}}</p> -->
      </div>
      <div class="avatar-img-container">
        <img src="../assets/racheli.png" alt>
        <h5>Rachel Bahabua</h5>
      </div>
    </div>
    <div class="mid-details-container">
      <div class="gigit-detail-container">
        <p>Earn {{this.gig.details.price}} for this Gig</p>
        <button class="gigit-btn">
          <h1>
            <span>
              Gig
              <span>It</span>
            </span>
          </h1>
        </button>
      </div>
      <div class="category-img-container">
        <h5>{{this.gig.category}}</h5>
        <img :src="`@/assets/${this.gig.category}.png`" alt>
      </div>
    </div>
    <div>
      <div class="details-container-nav"></div>
      <div class="review-details-container">
        <ul>User Score
          <li>
            Payment
            <span>⭐⭐⭐⭐✰</span>
          </li>
          <li>
            Reliable
            <span>⭐⭐⭐⭐✰</span>
          </li>
          <li>
            Overall
            <span>⭐⭐⭐⭐✰</span>
          </li>
          <h4>
            More
            Reviews...
          </h4>
        </ul>
      </div>
    </div>
    <div class="map-img-container">
      <img src="../assets/mapDemo.png" alt>
    </div>
  </section>
</template>
<script>
// make it smart(page)V
//use dispatch to get By id
export default {
  name: "gigDetails",
  data() {
    return {
      gig: null
    };
  },
  created() {
    var gigId = this.$route.params.gigId;
    this.$store
      .dispatch({ type: "getGigById", gigId })
        .then(gig => (this.gig = gig));
  },
  methods:{
    goBack(){
      this.$router.push('/gig')
    }

  }
};
</script>

<style  lang="scss">
* {
  color: azure;
}

section {
  display: grid;
}
.top-detail-container {
  display: grid;
  grid-template-columns: 3fr 1fr;
  padding: 10px;
  .h6 {
    padding: 10px;
  }
  .top-detail-title {
    text-align: left;
    font-size: 0.72rem;
    h6 {
      font-size: 0.9rem;
    }
    h5 {
      padding: 5px;
    }
    p {
      padding: 5px;
    }
  }
  .avatar-img-container {
    width: 60px;
    grid-row: 1 / 2;
    grid-column: 2;
    h5 {
      margin: 0 auto;
      width: 100%;
    }
    img {
      width: 75px;
    }
  }
}
.mid-details-container {
  display: flex;
  justify-content: space-around;
  max-height: 137px;
}
.gig-desc {
  border: 1px solid white;
  border-radius: 10px;
  padding: 5px;
  width: 130px;
}

.details-container-nav {
  display: flex;
  justify-content: space-around;
}
.map-img-container {
  img {
    margin: 10px;
    width: 225px;
    height: 140px;
  }
}
.gigit-detail-container {
  display: flex;
  flex-direction: column;
  font-size: 0.9rem;

  .payment-price-container {
    width: 70px;
    margin: 5px;
  }
}
.review-details-container {
  grid-template-columns: 1fr 1fr;
  font-size: 0.9rem;
}
ul {
  margin: 0;
}
li {
  padding: 2px;
}
h4 {
  padding: 5px;
  justify-self: center;
}

.category-img-container > img {
  width: 130px;
  height: 130px;
}
.category-img-container > h6 {
  margin: 0;
}
.gigit-btn {
  height: 50px;
  box-shadow: inset 0px 1px 0px 0px #2ca2af;
  background-color: #2ca2af;
  border: 1px solid #2ca2af;
  display: inline-block;
  cursor: pointer;
  color: #ffffff;
  font-family: Arial;
  font-size: 13px;
  font-weight: bold;
  padding: 6px 12px;
}
h1 {
  margin: 0;
  height: 100%;
  font-size: 1.5rem;
}

.gigit-btn:hover {
  background-color: #2a8691;
}
.gigit-btn:active {
  position: relative;
  top: 1px;
}
h1 {
  margin: 0;
  height: 100%;
  display: grid;
  grid-template-rows: 1fr 1fr;
  font-size: 1.5rem;
  span {
    font-family: condiment;
    span {
      color: #97a5a7;
    }
  }
}
</style>
