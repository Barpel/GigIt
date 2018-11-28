import userService from '../service/userService.js'
export default {
    state: {
        currUser: null,
        isLoggedin: true
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
        setCurrUser(state, { user }) {
            localStorage.setItem('user', JSON.stringify(user))
            state.currUser = user
        }
    },
    actions: {
        getDemoUser(context) {
            return userService.getDemoUser()
                .then(user => context.commit({ type: 'setCurrUser', user }))
        },
        checkIsLogged(context) {
            var user = JSON.parse(localStorage.getItem('user'))
            if(user) context.commit({type:'setCurrUser', user})
        },
        getUserById({ commit }, { userId }) {
            userService.getUserById(userId)
                .then(user => {
                    commit({ type: 'setCurrUser', user })
                    return user
                })
        }
    },
}