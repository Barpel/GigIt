<template>
  <li>
    <div :class="classByCategory" class="gig-image"></div>
    <div>
      <div class="publisher-container">
        <img src="http://www.dalton-winery.com/wp-content/uploads/2017/03/GUY.jpg">
        <div class="publisher-info">
          <h3>Jacob Ben-Lulu</h3>
          <h3>
            <i class="fas fa-star"></i>
            &nbsp;
            <span>4.2</span>
          </h3>
        </div>
      </div>
      <!-- <div class="publisher-container" v-if="publisher">
        <img :src="publisher.img">
        <h3>{{publisher.name.first}} {{publisher.name.last}}</h3>
        <h3>⭐{{publisher.reviews.totalAverage}}</h3>
      </div>-->
      <div class="gig-details">
        <h3>{{gig.details.title}}</h3>
        <p>{{gig.details.pos.dist}}</p>
      </div>
      <div class="lower-bar-container">
        <p>{{gig.details.price}}</p>
        <button>
          Gig<span>It</span>
        </button>
      </div>
    </div>
  </li>
</template>

<script>
export default {
    props: {
        gig: Object,
        publisher: Object,
    },
    computed: {
        classByCategory() {
            return {
                delivery: this.gig.category==='delivery',
                other: this.gig.category==='other',
                moving: this.gig.category==='moving',
                'house-work': this.gig.category==='house-work',
                'line-queue': this.gig.category==='line-queue',
                'pet-care': this.gig.category==='pet-care',
            }
        }
    },
}
</script>

<style lang="scss">

</style>