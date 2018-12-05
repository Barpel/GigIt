import gigService from '../service/gigService.js'
export default {
    state: {
        gigs: null,
        currGig: null,
        isLoading: false,
        gigCategoryCounter: null,
        userLocation: null,
    },
    getters: {
        gigs(state) {
            return state.gigs
        },
        isLoading(state) {
            return state.isLoading
        },
        loggedUser(state, getters) {
            return getters.user
        },
        gigCategoryCounter(state) {
            return state.gigCategoryCounter
        }

    },
    mutations: {
        setGigs(state, { gigs }) {
            gigs.map(gig => {
                return gigService.getDistFromUser(gig, state.userLocation)
            })
            gigs.sort((a, b) => {
                return a.details.pos.dist - b.details.pos.dist
            })
            state.gigs = gigs

        },
        updateGig(state, { gig }) {
            var gigIdx = state.gigs.findIndex(currGig => currGig._id === gig._id)
            state.gigs.splice(gigIdx, 1, gig)
        },
        toggleLoading(state, payload) {
            state.isLoading = !state.isLoading
        },
        setGigCategoryCount(state, { counter }) {
            state.gigCategoryCounter = counter
        },
        setUserLocation(state, { userLocation }) {
            state.userLocation = userLocation

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
                    context.commit({ type: 'setGigCategoryCount', counter })
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
                    return gigService.getDistFromUser(gig, context.state.userLocation)
                })
        },
        removeGig(context, { gigId }) {
            return gigService.remove(gigId)
        },
        updateGig(context, payload) {
            return gigService.update(payload.gig)
                .then(cuurGig => {
                    if (payload.userGigsListToUpdate) {
                        payload.userGigsListToUpdate.push(cuurGig._id)
                        context.dispatch({ type: 'updateUser', user: context.getters.loggedUser })
                    }
                    return context.dispatch({ type: 'getGigs' }, cuurGig)
                })
        },
        userLocation(context, payload) {
            var userLocation = {
                position: {
                    lat: payload.position.coords.latitude,
                    lng: payload.position.coords.longitude,
                }
            }
            context.commit({ type: 'setUserLocation', userLocation })
        },
        reviewAndCompleteGig(context, {review, reviewStats}) {
            return context.dispatch({type: 'updateUsersReviewsAndGigIds', review, reviewStats})
                // .then(() => gigService.removeGig(payload.reviewStats.gigId))
                
        }
    },
}