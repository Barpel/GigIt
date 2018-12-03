<template>
        <ul class="gig-list grid">
            <gig-prev @click.native="$emit('gigClicked', gig._id)" v-for="gig in gigs" :key="gig._id" :gig="gig"></gig-prev>
        </ul>
</template>

<script>
import gigPrev from './gigPrev.cmp'
export default {
props: {
    gigs: Array
},

components: {
    gigPrev
},

}
</script>

<style>

</style>
