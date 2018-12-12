export default {
    state: {
        
        loggedUser: null,
        isLoggedin: false
    },
    getters: {},
    mutations: {},
    actions: {
        openUserSocket(context) {
            var user = context.getters.user
            console.log('the user to socket is:', user)
            if(user) {
                var userId = user._id
                this._vm.$socket.emit('newUserSocket', userId)
            }
        },
        emitToUser(context, {eventMsg, userId}) {
            this._vm.$socket.emit('emitToUser', eventMsg, userId)
        },
        emitNewChatMsg(context, {eventMsg, userId}) {
            this._vm.$socket.emit('emitNewChatMsg', eventMsg, userId)
        }
    },
}