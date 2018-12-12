import userService from '../service/userService.js'
export default {
    state: {
        loggedUser: null,
        isLoggedin: false,
    },
    getters: {
        user(state) {
            return state.loggedUser
        },
        isLoggedin(state) {
            return state.isLoggedin
        }
    },
    mutations: {
        setLoggedUser(state, { user }) {
            state.loggedUser = user
            if (user) state.isLoggedin = true
            else state.isLoggedin = false
        },
        updateUserGigs(state, { gig }) {
            state.loggedUser.gigsIds.published.push(gig._id)
        },
    },
    actions: {
        setLoggedUser(context, {user}) {
            context.commit({type:'setLoggedUser', user})
        },
        checkLoggedUser(context) {
            return userService.loginUser(null)
                .then(user => {
                    if (user) context.commit({ type: 'setLoggedUser', user })
                })
        },
        getLoggedUserId(context) {
            return userService.getLoggedUserId()
        },
        getAllUsers(context) {
            return userService.query()
        },
        getUserById({ commit }, { userId }) {
            return userService.getById(userId)
                .then(user => {
                    return user
                })
        },
        updateUser(context, { user }) {
            return userService.update(user)
        },
        updateOwnUser(context, { user }) {
            return userService.update(user)
                .then(user => {
                    userService.setLocalLoggedUser(user)
                    context.commit({ type: 'setLoggedUser', user })
                })
        },
        onLogin(context, { userCreds }) {
            return userService.loginUser(userCreds)
                .then(user => context.commit({ type: 'setLoggedUser', user }))
        },
        isGigOwner(context, { publisherId }) {
            return userService.getLoggedUser()
                .then(loggedUser => {
                    if (loggedUser._id === publisherId) return true
                    else return false
                })
        },
        checkIsProfileOwner(context, { userId }) {
            return userService.getLoggedUser()
                .then(loggedUser => {
                    if (loggedUser._id === userId) return true
                    else return false
                })
        },
        doLogout({ commit }) {
            return userService.logout()
                .then(() => commit({ type: 'setLoggedUser', user: null }))
        },
        register(context, { user }) {
            return userService.add(user)
                .then(user => {
                    context.commit({ type: 'setLoggedUser', user })
                })
        },
        updateUsersReviewsAndGigIds(context, { review, reviewStats }) {
            return context.dispatch({type: 'removeGigFromAllUsersData', gigId: reviewStats.gigId})
                    .then(() => {
                        context.dispatch({type:'getUserById', userId: reviewStats.gigsterId})
                            .then(gigster => {
                                if(gigster.reviews.completed[0].gigId === '0') {
                                    gigster.reviews.completed = [review]
                                }
                                else gigster.reviews.completed.unshift(review)
                                context.dispatch({ type: 'updateUser', user:gigster })
                            })
                    })
        },
        removeGigFromAllUsersData(context, {gigId}) {
            context.dispatch({type:'getGigById', gigId})
                .then(gig => {
                    context.dispatch({type:'getUserById', userId:gig.publisherId})
                        .then(publisher => {
                            publisher.gigsIds.completed.push(gig._id)
                            var gigIdx = publisher.gigsIds.published.findIndex(gigId => gigId === gig._id)
                            if(gigIdx > -1) {
                                publisher.gigsIds.published.splice(gigIdx, 1)
                            }
                            context.dispatch({type:'updateOwnUser', user:publisher})
                        })
                    if(gig.holdingUsers) {
                        return gig.holdingUsers.forEach(pendingUser => {
                            context.dispatch({type:'getUserById', userId:pendingUser.id})
                                .then(gigster => {
                                    var gigIdx = gigster.gigsIds.pending.findIndex(gigId => gigId === gig._id)
                                    if(gigIdx > -1) {
                                        gigster.gigsIds.pending.splice(gigIdx, 1)
                                        context.dispatch({type:'updateUser', user:gigster})
                                    }
                                })
                            })
                    }
                    else {
                        return gig.pendingUsers.forEach(pendingUser => {
                            context.dispatch({type:'getUserById', userId:pendingUser.id})
                                .then(gigster => {
                                    var gigIdx = gigster.gigsIds.pending.findIndex(gigId => gigId === gig._id)
                                    if(gigIdx > -1) {
                                        gigster.gigsIds.pending.splice(gigIdx, 1)
                                        context.dispatch({type:'updateUser', user:gigster})
                                    }
                                })
                            })
                    }
                })
        },
        deletePendingUsers(context, { gigId }) {
            userService.query(gigId)
                .then(users => {
                    users.map(user =>{
                        return (user.gigsIds.published === gigId)
                    })
                    console.log(users)
                })
        }
    },
}