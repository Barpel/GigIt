import gigService from '../service/gigService.js'
export default {
    state: {
        gigs: null,
        currGig: null,
        isLoading: false,
        loadingCounter: 0,
        gigCategoryCounter: null,
        topPriceGigs: null,
        nearestGigs: null,
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
        },
        topPriceGigs(state) {
            return state.topPriceGigs
        },
        nearestGigs(state) {
            return state.nearestGigs
        }
    },
    mutations: {
        setGigs(state, { gigs, filter, sorter}) {
            if (state.userLocation) {
                gigs.map(gig => {
                    gigService.getDistFromUser(gig, state.userLocation)
                })
            }
            function sortByPrice (a,b) {
                return b.details.price - a.details.price
            }
            function sortByDist (a,b) {
                return a.details.pos.dist - b.details.pos.dist
            }
            if(sorter === 'Dist') gigs.sort(sortByDist)
            else if (sorter === 'Price') gigs.sort(sortByPrice)
            state.gigs = gigs
            if (!state.topPriceGigs) { //if no top price gigs then also no nearest gigs
                var gigsCopy = JSON.parse(JSON.stringify(gigs))
                if(sorter !== 'Dist') gigsCopy.sort(sortByDist)
                state.nearestGigs = gigsCopy.slice(0,4)
                //state.nearestGigs = gigsCopy //TODO: when there is a sliding gallery of top gigs
                gigsCopy.sort(sortByPrice)
                state.topPriceGigs = gigsCopy.slice(0,4)
                //state.topPriceGigs = gigsCopy //TODO: when there is a sliding gallery of top gigs
            }
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
        toggleLoadingOff(state) {
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
        getGigs(context, { filter, sorter = 'Dist'}) {
            return gigService.query(filter)
                .then(gigs => {
                    context.commit({ type: 'setGigs', gigs, filter, sorter })
                    var counter = {}
                    if(!filter || filter.byCategory===''){
                        gigs.forEach(gig => {
                            if (!counter[gig.category]) counter[gig.category] = 1
                            else counter[gig.category]++
                        })
                        context.commit({ type: 'setGigCategoryCount', counter })
                    }
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
                    if (!context.state.userLocation) return gig
                    return gigService.getDistFromUser(gig, context.state.userLocation)
                })
        },
        removeGig(context, { gigId }) {
            context.dispatch({ type: 'removeGigFromAllUsersData', gigId })
                .then(() => gigService.remove(gigId))
        },
        updateGig(context, payload) {
            return gigService.update(payload.gig)
                .then(currGig => {
                    if (payload.userGigsListToUpdate) {
                        payload.userGigsListToUpdate.push(currGig._id)
                        context.dispatch({ type: 'updateOwnUser', user: context.getters.loggedUser })
                        // context.dispatch({ type: 'updateUser', user: context.getters.loggedUser })
                    }
                    context.dispatch({ type: 'getGigs' }, currGig)
                    return currGig
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
                .then(() => {
                    context.dispatch({ type: 'getGigById', gigId: reviewStats.gigId })
                        .then(gig => {
                            gig.isActive = false
                            context.dispatch({ type: 'updateGig', gig })
                        })
                })

        }
    },
}