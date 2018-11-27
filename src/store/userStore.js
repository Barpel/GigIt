import userService from '../service/userService.js'
export default {
    state: {
    },
    getters: {
    },
    mutations: {
        setUsers(state, {users}) {
            state.users = users
        }
    },
    actions: {
        getUsers(context) {
            userService.getUsers()
                .then(users => context.commit({type: 'setUsers', users}))
        }
    },
}