import userService from '../service/userService.js'
export default {
    state: {
        loggedUser: null,
        isLoggedin: false
    },
    getters: {
        user(state) {        
            return state.currUser
        },
        isLoggedin(state) {
            return state.isLoggedin
        }
    },
    mutations: {
        setLoggedUser(state, { user }) {
            state.loggedUser = user
            state.isLoggedin = true
        },
        
    },
    actions: {
        checkLoggedUser(context) {
                var user = userService.getLoggedUser()
                if (user) context.commit({type: 'setLoggedUser', user})
        },
        getUserById({ commit }, { userId }) {
            userService.getUserById(userId)
                .then(user => {  
                    commit({ type: 'setloggedUser', user })
                    return user
                })
        },
        updateUser(context, {user}) {
            userService.updateUser(user)
                .then(context.commit({type:'setloggedUser', user}))
        },
        onLogin(context, {userCreds}) {
            return userService.loginUser(userCreds)
                .then(user => context.commit({type:'setLoggedUser', user}))
        }
    },
}