<template>
<section>
    <gig-toolbar></gig-toolbar>
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
