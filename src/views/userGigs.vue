<template>
  <section v-if="user">{{user.gigsIds}}</section>
</template>

<script>
export default {
    data() {
        return {
            gigs: {
                completedGigs: [],
                pendingGigs: [],
                publishedGigs: [],
            }
        }
    },
    computed: {
        user() {
            return this.$store.getters.user
        }
    },
    created() {
        var userId = this.$route.params.userId
        this.$store.dispatch({type: 'getUserById', userId})
        .then(() => {
            this.getUserGigs()
        })
    },
    methods: {
        getUserGigs() {
            var userGigIds = {...this.user.gigsIds}
            var completedGigIds = userGigIds.completed
            var pendingGigIds = userGigIds.pending
            var publishedGigIds = userGigIds.published

            pendingGigIds.forEach(pendingGigId => {
                this.$store.dispatch({type: 'getGigById', gigId: `${pendingGigId}`})
                .then(gig => {
                    this.gigs.pendingGigs.push(gig)
                })
            })
            
            publishedGigIds.forEach(publishedGigId => {
                this.$store.dispatch({type: 'getGigById', gigId: `${publishedGigId}`})
                .then(gig => {
                    this.gigs.publishedGigs.push(gig)
                })
            })
            
            }
        }
    

}
</script>

<style>

</style>
