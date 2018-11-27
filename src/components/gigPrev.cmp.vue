<template>
  <li>
    <div :class="classByCategory" class="gig-image"></div>
    <div>
      <h3>{{gig.details.title}}</h3>
      <p>{{gig.details.pos.dist}}</p>
    </div>
  </li>
</template>

<script>
export default {
    props: {
        gig:Object
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
    }

}
</script>

<style lang="scss">

</style>