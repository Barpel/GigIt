export default {
    state: {
        success : new Audio('https://res.cloudinary.com/barpel/video/upload/v1544023238/GigIt%20Sounds/notification.mp3'),
    },
    getters: {},
    mutations: {},
    actions: {
        playSound(context, {style}) {
            context.state[style].play()
        },
        openUserSocket(context) {
            var user = context.getters.user
            if(user) {
                var userId = user._id
                this._vm.$socket.emit('newUserSocket', userId)
            }
        },
        emitToUser(context, {eventMsg, userId}) {
            this._vm.$socket.emit('emitToUser', eventMsg, userId)
        },
        emitNewChatMsg(context, {userId}) {
            var eventMsg = {
                txt: "You Have A New Message",
                type: "success",
                link: `/user/${userId}/inbox`,
                action: "toProfile"
              }
            this._vm.$socket.emit('emitNewChatMsg', eventMsg, userId)
        }
    },
}