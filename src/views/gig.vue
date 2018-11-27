<template>
  <section>
    <gig-toolbar @showCategory="gigsFilterBy"></gig-toolbar>
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
        this.$router.push(`gig/${gigId}`)
    },
    gigsFilterBy(category){
        this.$store.dispatch({type:'getGigs',category})
    }
},
created() {
    this.$store.dispatch({type:'getGigs'})
},
components: {
    gigList,
    gigToolbar
}
}
</script>

<style>

</style>
