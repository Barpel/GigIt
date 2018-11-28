import userService from '../service/userService.js'
export default {
    state: {
        // currUser: null,
        currUser: {
            name:'demo',
            id:'1'
        },
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
            state.currUser = user
        }
    },
    actions: {
        getCurrUser(context) {
            return userService.getCurrUser()
                .then(user => context.commit({ type: 'setCurrUser', user }))
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