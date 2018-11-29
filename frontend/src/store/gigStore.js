import gigService1 from '../service/gigService.js'
import gigService from '../service/gigDemoService.js'
export default {
    state: {
        gigs: null,
        currGig: null
    },
    getters: {
        gigs(state) {
            if(!state.gigs) return []
            return state.gigs
        },
    },
    mutations: {
        setGigs(state, { gigs }) {
            state.gigs = gigs
        },
        updateGig(state, {gig}) {
            var gigIdx = state.gigs.findIndex(currGig => currGig.id === gig.id)
            state.gigs.splice(gigIdx,1, gig)
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
            return gigService.updateGig(payload.gig)
            // .then(gig => context.commit({type: 'updateGig'}, gig))
            .then(gig => context.dispatch({type: 'getGigs'}, gig))
        }
    },
}