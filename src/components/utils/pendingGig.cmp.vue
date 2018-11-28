<template>
  <section class="pending-gigs-container">
    <div class="pending-gigs-header" @click="isOpen = !isOpen">
        <span v-if="!isOpen">
        <i class="fas fa-angle-right"></i>
        </span>
        <span v-else>
          <i class="fas fa-angle-down"></i>
        </span>
      <h1>Pending Gigs:</h1>
    </div>
    <div class="pending-gigs" v-for="(gig, idx) in gigs" :key="idx" v-if="isOpen">
      <h2 @click="goToGig(gig.id)">{{gig.details.title}}</h2>
      <button>
        Cancel
        <span>Gig</span>
      </button>
    </div>
  </section>
</template>

<script>
export default {
    props: ['gigs'],
    name: 'pendingGig',
    data() {
        return {
            isOpen: false,
        }
    },
    methods: {
        goToGig(gigId) {
            this.$router.push(`/gig/${gigId}`)
        }
    }

}
</script>

<style lang="scss" scoped>
.pending-gigs-container{
    box-shadow: 0px 3px 14px 0px rgba(0,0,0,0.66);
    .pending-gigs-header{
        background-color: #2ca2af;
        padding: 10px;
        display: grid;
        grid-template-columns: 1fr 4fr;
        span {
            justify-self: start;
            font-size: 2rem;
        }
        h1{
            justify-self: start;
            display: flex;
            align-items: center;
        }
    }
    .pending-gigs-header:hover {
        cursor: pointer;
    }
    .pending-gigs {
        display: grid;
        grid-template-columns: 4fr 2fr;
        grid-gap: 10px;
        margin: 10px 0;
        align-items: center;
        
        h2 {
            padding: 10px;
            text-align: left;
            display: flex;
            align-items: center;
            text-transform: capitalize;
            font-size: 1.1rem;
        }

        h2:hover {
            cursor: pointer;
            opacity: 0.6;
            }
        button {
            justify-self: end;
            cursor: pointer;
            width: 70%;
            height: 80%;
            border: none;
            background-color: red;
            color: white;
            font-size: 1rem;
            text-align: center;
            border-radius: 5px;
            padding-top: 5px;
            margin: 0 10px 10px;
            span {
                font-family: condiment;
                font-size: 1.2rem;
            }
        }
    }
}
</style>

