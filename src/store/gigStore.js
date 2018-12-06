import gigService from '../service/gigService.js'
export default {
    state: {
        gigs: null,
        currGig: null,
        isLoading: false,
        loadingCounter: 0,
        gigCategoryCounter: null,
        userLocation: 0,
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
            console.log('```````')
            gigs.map(gig => {
                gigService.getDistFromUser(gig, state.userLocation)
            })
            gigs.sort((a, b) => {
                // console.log('A.details.pos.dist',a.details.pos.dist)
                // console.log('B.details.pos.dist',b.details.pos.dist)
                return a.details.pos.dist - b.details.pos.dist
            })
            state.gigs = gigs

        },
        updateGig(state, { gig }) {
            var gigIdx = state.gigs.findIndex(currGig => currGig._id === gig._id)
            state.gigs.splice(gigIdx, 1, gig)
        },
        toggleLoadingOn(state, payload) {
            if (state.loadingCounter === 0) {
                state.isLoading = true
                state.loadingCounter = 1
            }
            setTimeout(() => state.loadingCounter = 0, 5000)
        },
        toggleLoadingOff(state, payload) {
            state.isLoading = false
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
            return gigService.query(category)
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
        toggleLoadingOn(context) {
            context.commit({ type: 'toggleLoadingOn' })
        },
        toggleLoadingOff(context) {
            context.commit({ type: 'toggleLoadingOff' })
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
                        context.dispatch({ type: 'updateOwnUser', user: context.getters.loggedUser })
                        // context.dispatch({ type: 'updateUser', user: context.getters.loggedUser })
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
        reviewAndCompleteGig(context, { review, reviewStats }) {
            return context.dispatch({ type: 'updateUsersReviewsAndGigIds', review, reviewStats })
            // .then(() => gigService.removeGig(payload.reviewStats.gigId))

            }
        },
    }