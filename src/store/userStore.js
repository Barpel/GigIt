import userService from '../service/userService.js'
export default {
    state: {
        user: {},
    },
    getters: {
        users(state) {
            return state.currUser
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
        }
    },
}