<template>
    <section class="completed-gigs-container">
        <li v-for="gig in gigs" :key="gig._id">
            <img :src="gig.pendingUsers[0].img" />
            {{gig.pendingUsers[0].name}}
            {{gig.details.title}}
            {{gig.details.price}}
            <!-- {{gig.pendingUsers[0].}} -->
        </li>
    </section>
</template>

<script>
export default {
    props: ['gigs'],
    created() {
        console.log(this.gigs)
    }

}
</script>

<style>

</style>
