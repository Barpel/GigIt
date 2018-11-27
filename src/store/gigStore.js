// import gigService from '../service/gigService.js'
import gigService from '../service/gigDemoService.js'
export default {
    state: {
        gigs: null,
        currGig: null
    },
    getters: {
        gigs(state) {
            return state.gigs
        }
    },
    mutations: {
        setGigs(state, { gigs }) {
            state.gigs = gigs
        }
    },
    actions: {
        getGigs(context,{category}) {
            gigService.query(category)
                .then(gigs => context.commit({type: 'setGigs', gigs}))
        },
        getGigById(context, { gigId }) {
            return gigService.getById(gigId)
        },
        updateGig(context, payload) {
            console.log(payload.gig)
        }
    },
}