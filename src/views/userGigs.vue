<template>
  <section v-if="user" class="user-gigs-container">
    <!-- <h1>{{user.gigsIds}}</h1> -->
    <h2>Pending Gigs:</h2>
    <ul class="published-gigs">
      <div v-for="publishedGig in gigs.publishedGigs" :key="publishedGig.id">
        <accordion
          :header="publishedGig.details.title"
          :gigsters="publishedGig.pendingUsers"
          v-if="gigs.publishedGigs.length"
        ></accordion>
      </div>
    </ul>
    <ul class="pending-gigs">
      <div v-for="pendingGig in gigs.pendingGigs" :key="pendingGig.id">
        <accordion
          :header="pendingGig.details.title"
          :gigsters="pendingGig.pendingUsers"
          v-if="gigs.pendingGigs.length"
        ></accordion>
      </div>
    </ul>
  </section>
</template>

<script>
import accordion from '../components/utils/accordion.cmp'
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
        publishedGigsGigsters(gigIdx) {
            var gigsters = [];
            this.gigs.publishedGigs.forEach((publishedGig, idx) => {
                console.log('publishedGig', publishedGig)
                gigsters = (publishedGig.pendindUsers)
            })
            console.log('gigsters', gigsters)
            return gigsters
        }
    },
    created() {
        var userId = this.$route.params.userId
        this.$store.dispatch({type: 'getUserById', userId})
        .then(() => {
            this.getUserGigs()
            console.log(this.gigs)
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
        },
        components: {
            accordion,
        }
    

}
</script>

<style lang="scss" scoped>
    .user-gigs-container {
        max-width: 500px;
        margin: 0 auto;
        ul.published-gigs {
            div {
                max-height: fit-content;
            }
        }
    }
</style>
