import chatService from '../service/chatService.js'
import { debug } from 'util';
export default {
    state: {
    },
    getters: {
    },
    mutations: {
    },
    actions: {
        sendNewMsg(context, {msg, chatId}) {
        this._vm.$socket.emit('sendMsg', msg, chatId)
        // this._vm.$socket.on('sendMsg', msg) {
            // console.log('')
        // }
        },
        getChatById(context, {chatId}) {
            return chatService.getById(chatId)
        },
        contactUser(context, { gigster, gigData, maister }) {
            var chatIdx = maister.chats.findIndex(chat => {
                return (chat.maisterId === maister._id && chat.gigsterId === gigster.id)
                || (chat.gigsterId === maister._id && chat.maisterId === gigster.id)
            })
            if (chatIdx >= 0)  {
                var chat = maister.chats.splice(chatIdx,1)
                chat = chat[0]
                maister.chats.unshift(chat)
                return context.dispatch({ type: 'updateOwnUser', user:maister})
            }
            else return context.dispatch({ type: 'openNewChat', gigster, gigData, maister })
        },
        updateChat(context, {chat}) {
            return chatService.update(chat)
        },
        openNewChat(context, { gigster, gigData, maister }) {
            // alert('creating new chat')
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
            return chatService.update(chat)
                .then(chat => {
                    var chatItem = { chatId: chat._id, gigsterId: gigster.id, maisterId: maister._id }
                    function setChatAndUpdate(user) {
                        user.chats.unshift(chatItem)
                        return user
                    }
                    context.dispatch({ type: 'getUserById', userId: gigster.id })
                        .then(gigster => {
                            let user = setChatAndUpdate(gigster)
                            context.dispatch({ type: 'updateUser', user })
                        })
                    let user = setChatAndUpdate(maister)
                    return context.dispatch({ type: 'updateOwnUser', user })
                })
                
            }
        },
    }
