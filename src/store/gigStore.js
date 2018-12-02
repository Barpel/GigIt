import gigService from '../service/gigService.js'
// import gigService from '../service/gigDemoService.js'
export default {
    state: {
        gigs: null,
        currGig: null,
        isLoading: false,
    },
    getters: {
        gigs(state) {
            if (!state.gigs) return []
            return state.gigs
        },
        isLoading(state) {
            return state.isLoading
        }
    },
    mutations: {
        setGigs(state, { gigs }) {
            state.gigs = gigs
        },
        updateGig(state, { gig }) {
            var gigIdx = state.gigs.findIndex(currGig => currGig.id === gig.id)
            state.gigs.splice(gigIdx,1, gig)
        },
        toggleLoading(state, payload) {
            state.isLoading = !state.isLoading
        }
    },
    actions: {
        getGigs(context, { category }) {
            console.log('go bring my catagory')
            // context.commit({ type: 'toggleLoading' })
            gigService.query(category)
                .then(gigs => {
                    context.commit({ type: 'setGigs', gigs })
                    // context.commit({ type: 'toggleLoading' })
                })
        },
        getGigById(context, { gigId }) {
            // context.commit({ type: 'toggleLoading' })
            return gigService.getById(gigId)
                .then(gig => {
                    // context.commit({ type: 'toggleLoading' })
                    return gig
                })
        },
        updateGig(context, {gig}) {
            // context.commit({ type: 'toggleLoading' })
            return gigService.update(gig)
            // .then(gig => context.commit({type: 'updateGig'}, gig))
                .then(gig => {
                    // context.commit({ type: 'toggleLoading' })
                    console.log('returned data from server:', gig)
                    context.commit({type: 'updateUserGigs'}, gig)
                    return context.dispatch({type: 'getGigs'}, gig)
                })
        }
    },
}