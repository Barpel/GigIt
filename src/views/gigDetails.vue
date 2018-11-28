

<template>
  <section class="gig-details" v-if="gig">
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
         <router-link to="/user/2">
        <img src="../assets/racheli.png" alt @click="goToProfile()">
        <h5>Rachel Bahabua</h5>
        </router-link>
      </div>
    </div>
    <div class="mid-details-container">
      <div class="gigit-detail-container">
        <p>Earn {{this.gig.details.price}} for this Gig</p>
        <button @click="requestGig" class="gigit-btn">
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

export default {
  name: "gigDetails",
  data() {
    return {
      gig: null
    };
  },
  computed: {
    user() {
      return this.$store.getters.user
    }
  },
  methods:{
    goBack(){
      this.$router.push('/gig')
    },
    requestGig(ev) {
      if(ev.target.innerHTML==='Pendding') return
      ev.target.innerHTML = 'Pendding'
      var currUser = this.$store.getters.user
      this.gig.isRead = false
      this.gig.pendingUsers.push({
        name: currUser.name,
        id: currUser.id,
        img: currUser.img
      }),
      this.user.gigsIds.pending.push(this.gig.id)
      this.$store.dispatch({type:'updateUser', user:this.user})
      this.$store.dispatch({type:'updateGig', gig:this.gig})
    },
    goToProfile(){
      
    }
  },
  created() {
    console.log('im created')
    var gigId = this.$route.params.gigId;
    this.$store
      .dispatch({ type: "getGigById", gigId })
        .then(gig => {
          (this.gig = gig)
        });
  },
};
</script>