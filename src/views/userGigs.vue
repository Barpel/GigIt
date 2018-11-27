<template>
  <section v-if="user">
    <h1>{{user.gigsIds}}</h1>
    <h2>Pending Gigs:</h2>
    <ul class="completed-gigs">
      <li v-for="pendingGig in gigs.pendingGigs" :key="pendingGig.id">{{pendingGig}}</li>
    </ul>
  </section>
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

            completedGigIds.forEach(completedGigId => {
                this.$store.dispatch({type: 'getGigById', gigId: `${completedGigId}`})
                .then(gig => {
                    this.gigs.completedGigs.push(gig)
                })
            })

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

            console.log('gigs', this.gigs)
            
            }
        }
    

}
</script>

<style>

</style>
