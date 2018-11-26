<template>
<section>
    <gig-toolbar></gig-toolbar>
    <gig-list :gigs="gigs"></gig-list>
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
