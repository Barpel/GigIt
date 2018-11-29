<template>
  <section>
    <gig-toolbar @showCategory="gigsFilterBy" @searchGig="searchGigByKey"></gig-toolbar>
    <gig-list @gigClicked="gigClicked" :gigs="gigs"></gig-list>
  </section>
</template>

<script>
import gigToolbar from '../components/gigToolbar'
import gigList from '../components/gigList'


export default {

computed: {
    gigs() {
        return this.$store.getters.gigs
    }
},

methods: {
    gigClicked(gigId) {
        this.$router.push(`/gig/${gigId}`)
    },
    gigsFilterBy(category){
        this.$store.dispatch({type:'getGigs',category})
        this.$router.push(`/gig/category/${category}`)
    },
    searchGigByKey(key){
        this.$store.commit({type:'filterByKey',key})
    }
},
created() {
    if(this.$route.params.type){
       var category = this.$route.params.type
        this.$store.dispatch({type:'getGigs', category })
    }
   else this.$store.dispatch({type:'getGigs',})

},
components: {
    gigList,
    gigToolbar,
}
}
</script>

<style>

</style>
