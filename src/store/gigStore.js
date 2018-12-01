import gigService from '../service/gigService.js'
// import gigService from '../service/gigDemoService.js'
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
        },
        updateUserGigs(state, {gig}) {
            console.log('mutations gig', gig)
            console.log('mutations state', state)
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
        updateGig(context, {gig}) {
            console.log('action:', gig)
            return gigService.update(gig)
            .then(gig => {
                console.log('returned data from server:', gig)
                context.commit({type: 'updateUserGigs'}, gig)
            })
            // .then(gig => context.dispatch({type: 'getGigs'}, gig))
        }
    },
}