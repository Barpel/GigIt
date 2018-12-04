import gigService from '../service/gigService.js'
// import gigService from '../service/gigDemoService.js'
export default {
    state: {
        gigs: null,
        currGig: null,
        isLoading: false,
        gigCategoryCounter: null
    },
    getters: {
        gigs(state) {
            // if (!state.gigs) return []
            return state.gigs
        },
        isLoading(state) {
            return state.isLoading
        },
        loggedUser(state, getters) {
            return getters.user
        },
        gigCategoryCounter(state){
            console.log('hey het ')
            return state.gigCategoryCounter
        }
        
    },
    mutations: {
        setGigs(state, { gigs }) {
            state.gigs = gigs
        },
        updateGig(state, { gig }) {
            var gigIdx = state.gigs.findIndex(currGig => currGig._id === gig._id)
            state.gigs.splice(gigIdx, 1, gig)
        },
        toggleLoading(state, payload) {
            state.isLoading = !state.isLoading
        },
        setGigCategoryCount(state, {counter}){
            state.gigCategoryCounter = counter
        }
    },
    actions: {
        getGigs(context, { category }) {
            gigService.query(category)
                .then(gigs => {
                    context.commit({ type: 'setGigs', gigs })
                    var counter = {}
                    gigs.forEach(gig => {
                        if (!counter[gig.category]) counter[gig.category] = 1
                        else counter[gig.category]++
                    })
                    context.commit({type:'setGigCategoryCount', counter})
                })
        },
        filterByKey(context, { filter }) {
            gigService.query(filter)
                .then(gigs => {
                    context.commit({ type: 'setGigs', gigs })
                })
        },
        getGigById(context, { gigId }) {
            return gigService.getById(gigId)
                .then(gig => {
                    return gig
                })
        },
        removeGig(context, { gigId }) {
            return gigService.remove(gigId)
        },
        updateGig(context, payload) {
            console.log('this store console',payload.gig)
            return gigService.update(payload.gig)
                .then(cuurGig => {
                    if(payload.userGigsListToUpdate) {
                        payload.userGigsListToUpdate.push(cuurGig._id)
                        context.dispatch({type: 'updateUser', user: context.getters.loggedUser},)
                    }
                    return context.dispatch({type: 'getGigs'}, cuurGig)
                })
        }
    },
}