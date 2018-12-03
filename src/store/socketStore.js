import socketService from '../service/socketService.js'
export default {
    state: {
    },
    getters: {
    },
    mutations: {
    },
    actions: {
        sendMsg(context, { gigster, gigData, maister }) {
            if (maister.chats) {
                var chat = maister.chats.find(chat => chat.members.find(member => member._id === gigster.id))
                if (chat) console.log('chat exists')
                else context.dispatch({ type: 'openNewChat', gigster, gigData, maister })
            }
            else context.dispatch({ type: 'openNewChat', gigster, gigData, maister })
        },
        openNewChat(context, { gigster, gigData, maister }) {
            var chat = {
                members: [{ name: gigster.name, img: gigster.img, _id: gigster.id },
                { name: maister.name.first, img: maister.img, _id: maister._id }],
                msgs: [{
                    sender: 'Team',
                    txt: `Welcome ${maister.name} and ${gigster.name}, you can now chat and set your gig!`,
                    isRead: true,
                    createdAt: Date.now()
                }],
                gig: gigData
            }
            return socketService.update(chat)
                .then(chat => {
                    var chatItem = { chatId: chat._id, gigsterId: gigster.id, maisterId: maister._id }
                    function setChatAndUpdate(user) {
                        if (user.chats) user.chats.push(chatItem)
                        else user.chats = [chatItem]
                        return user
                    }
                    context.dispatch({ type: 'getUserById', userId: gigster.id })
                        .then(gigster => {
                            let user = setChatAndUpdate(gigster)
                            context.dispatch({ type: 'updateUser', user })
                        })
                    let user = setChatAndUpdate(maister)
                    context.dispatch({ type: 'updateOwnUser', user })
                })
            // this._vm.$socket.emit('addChat', chat)

        }
    },
}