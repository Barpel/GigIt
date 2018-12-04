export default {
    state: {
        
        loggedUser: null,
        isLoggedin: false
    },
    getters: {},
    mutations: {},
    actions: {
        openUserSocket(context) {
            context.dispatch('getLoggedUserId')
                .then(userId => {
                    this._vm.$socket.emit('newUserSocket', userId)
                })
        },
        emitToUser(context, {eventMsg, userId}) {
            this._vm.$socket.emit('emitToUser', eventMsg, userId)
        },
        emitNewChatMsg(context, {eventMsg, userId}) {
            this._vm.$socket.emit('emitNewChatMsg', eventMsg, userId)
        }
    },
}