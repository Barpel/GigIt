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
            userService
            state.loggedUser = user
            if(user) state.isLoggedin = true
            else state.isLoggedin = false
        },
        updateUserGigs(state, {gig}) {
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
        getAllUsers(context) {
            return userService.query()
        },
        getUserById({ commit }, { userId }) {
            return userService.getById(userId)
                .then(user => {  
                    return user
                })
        },
        updateUser(context, {user}) {
            return userService.update(user)
        },
        updateOwnUser(context, {user}) {
            return userService.update(user)
                .then(user => {
                    userService.setLocalLoggedUser(user)
                    context.commit({type:'setLoggedUser', user})
                })
        },
        onLogin(context, {userCreds}) {
            return userService.loginUser(userCreds)
                .then(user => context.commit({type:'setLoggedUser', user}))
        },
        isGigOwner(context, {publisherId}) {
            return userService.getLoggedUser()
                .then(loggedUser => {
                    if(loggedUser._id === publisherId) return true
                    else return false
                })
        },
        checkIsProfileOwner(context, {userId}) {
            return userService.getLoggedUser()
                .then(loggedUser => {
                    if(loggedUser._id === userId) return true
                    else return false
                })
        },
        doLogout({commit}) {
            return userService.logout()
                .then(()=> commit({type:'setLoggedUser', user: null}))
        },
        register(context, {user}) {
            return userService.add(user)
                .then(user => {
                    context.commit({type:'setLoggedUser', user})
                })
        }
    },
}