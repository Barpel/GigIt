<template>
  <section v-if="user" class="user-gigs-container">
    <ul class="published-gigs" v-if="gigs.publishedGigs.length">
      <h2>Published Gigs:</h2>
      <div
        v-for="publishedGig in gigs.publishedGigs"
        :key="publishedGig.id"
        v-if="publishedGig.pendingUsers.length"
      >
        <gig-accordion :gigsters="publishedGig.pendingUsers" :header="publishedGig.details.title"></gig-accordion>
      </div>
    </ul>
    <ul class="pending-gigs">
      <pending-gig :gigs="gigs.pendingGigs"></pending-gig>
      <!-- <gig-accordion :gigsters="pendingGig.pendingUsers" :header="pendingGig.details.title"></gig-accordion> -->
    </ul>
    <ul class="completed-gigs">
      <h2>Completed Gigs:</h2>
      <div
        v-for="completedGig in gigs.completedGigs"
        :key="completedGig.id"
        v-if="completedGig.pendingUsers.length"
      >
        <gig-accordion :gigsters="completedGig.pendingUsers" :header="completedGig.details.title"></gig-accordion>
      </div>
    </ul>
  </section>
</template>

<script>
import gigAccordion from '../components/utils/gigAccordion.cmp'
import pendingGig from '../components/utils/pendingGig.cmp'
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
        },
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
            console.log('pending gigs:', this.gigs.pendingGigs)
            }
        },
        components: {
            gigAccordion,
            pendingGig
        }
    

}
</script>

<style lang="scss" scoped>
    .user-gigs-container {
        max-width: 500px;
        margin: 0 auto;
        padding: 30px 0 0;
        ul {
            margin:0 0 20px; 
            color: white; 
        }
        .published-gigs {
            box-shadow: 0px 3px 14px 0px rgba(0,0,0,0.66);
            padding: 10px;
        }
        
    }
</style>
