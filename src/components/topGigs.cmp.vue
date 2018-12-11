<template>
    <section class="top-gigs-container">  
        
        <div v-for="gig in topGigs" :key="gig._id">       
            <div><li>
    <div :class="gig.category" class="gig-image" :style="{ backgroundImage: 'url(' + gig.details.img + ')' ,objectFit:'contain'}"></div>
    <div>
      <div class="publisher-container">
          <!-- {{gig.details.img}} -->
          <!-- {{gig}} -->
        <!-- <img :src="gig.publisher.img"> -->
        <div class="publisher-info">
          <!-- <h3>{{publisher.name.first + ' ' + publisher.name.last}}</h3> -->
          <h3>
            <i class="fas fa-star"></i>
            &nbsp;
            <span>4.2</span>
          </h3>
        </div>
      </div>
      <div class="gig-details">
        <h3>{{gig.details.title}}</h3>
        <p class="gig-prev-desc">{{gig.details.desc}}</p>
        <p v-if="gig.details.pos.dist">{{gig.details.pos.dist}} KM Away</p>
        <p v-else> {{gig.details.place}}</p>
      </div>
      <div class="lower-bar-container">
        <p>{{gig.details.price}}₪</p>
        <button v-if="!isAlreadyPending">Gig
          <span>It</span>
        </button>
        <button v-else>Pending</button>
      </div>
    </div>
  </li></div>
        </div>
    </section>
</template>

<script>
export default {
    props: {
    topGigs: Array,
    currUser: Object
},
data(){
    return{
         isAlreadyPending: false
    }
},
created(){

},
mounted(){
// console.log(topGigs)
// console.log(currUser)
},
computed:{

    
}
}
</script>

<style>
.top-gigs-container{
    color:black;
}
</style>
