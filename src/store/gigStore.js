// import gigService from '../service/gigService.js'
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
<<<<<<< HEAD
        filterByKey(state, {key}){
            
=======
        updateGig(state, {gig}) {
            var gigIdx = state.gigs.findIndex(currGig => currGig.id === gig.id)
            state.gigs.splice(gigIdx,1, gig)
>>>>>>> 9610a0547d7b9ff2a9f7b2389d7dacf4943737fd
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
<<<<<<< HEAD
            console.log(payload.gig)
        },
  
=======
            return gigService.updateGig(payload.gig)
            // .then(gig => context.commit({type: 'updateGig'}, gig))
            .then(gig => context.dispatch({type: 'getGigs'}, gig))
        }
>>>>>>> 9610a0547d7b9ff2a9f7b2389d7dacf4943737fd
    },
}