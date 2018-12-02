import userService from '../service/userService.js'
export default {
    state: {
        loggedUser: null,
        isLoggedin: false
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
            if(user) state.isLoggedin = true
            else state.isLoggedin = false
        },
        updateUserGigs(state, {gig}) {
            console.log('mutations gig', gig._id)
            console.log('user published gigs', state.loggedUser.gigsIds.published)
            state.loggedUser.gigsIds.published.push(gig._id)
        },
    },
    actions: {
        checkLoggedUser(context) {
            return userService.getLoggedUser()
                .then(user => {
                    if (user) context.commit({type: 'setLoggedUser', user})
                })    
        },
        getUserById({ commit }, { userId }) {
            return userService.getUserById(userId)
                .then(user => {  
                    return user
                })
        },
        updateUser(context, {user}) {
            console.log('user store got this user:', user)
            userService.updateUser(user)
                .then(context.commit({type:'setLoggedUser', user}))
        },
        onLogin(context, {userCreds}) {
            return userService.loginUser(userCreds)
                .then(user => context.commit({type:'setLoggedUser', user}))
        },
        isGigOwner(context, {publisherId}) {
            return userService.getLoggedUser()
                .then(loggedUser => {
                    if(loggedUser.id === publisherId) return true
                    else return false
                })
        },
        checkIsProfileOwner(context, {userId}) {
            return userService.getLoggedUser()
                .then(loggedUser => {
                    if(loggedUser.id === userId) return true
                    else return false
                })
        },
        doLogout({commit}) {
            return userService.logout()
                .then(()=> commit({type:'setLoggedUser', user: null}))
        }
    },
}