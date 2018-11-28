import userService from '../service/userService.js'
export default {
    state: {
        loggedUser: null,
        isLoggedin: false
    },
    getters: {
        user(state) {
            console.log('getter',state.loggedUser)
            return state.loggedUser
        },
        isLoggedin(state) {
            return state.isLoggedin
        }
    },
    mutations: {
        setLoggedUser(state, { user }) {
            console.log('mutation',user)
            state.loggedUser = user
            if(user) state.isLoggedin = true
            else state.isLoggedin = false
        },
    },
    actions: {
        checkLoggedUser(context) {
            return userService.getLoggedUser()
                .then(user => {
                    console.log('user action is:',user)
                    if (user) context.commit({type: 'setLoggedUser', user})
                })    
        },
        getUserById({ commit }, { userId }) {
            userService.getUserById(userId)
                .then(user => {  
                    commit({ type: 'setLoggedUser', user })
                    return user
                })
        },
        updateUser(context, {user}) {
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
        isOwner(context, {userId}) {
            var loggedUser = userService.getLoggedUser()
            if(loggedUser.id === userId) return true
            else return false
        },
        doLogout({commit}) {
            return userService.logout()
                .then(()=> commit({type:'setLoggedUser', user: null}))
        }
    },
}