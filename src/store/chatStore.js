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
        },
        connectToChat(context, {chatId}) {
            this._vm.$socket.emit('connectToChat', chatId)
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
            console.log('new chat is arravid!!!!'
            )
            var chat = {
                members: [{ name: gigster.name, img: gigster.img, _id: gigster.id },
                { name: maister.name.first, img: maister.img, _id: maister._id }],
                msgs: [],
                gig: gigData
            }
            var teamMsg = {
                sender: 'Team',
                txt: `Welcome ${maister.name.first} and ${gigster.name}, you can now chat and set your gig!`,
                isRead: true,
                createdAt: Date.now()
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
                                .then(()=> {
                                        context.dispatch({type:'sendNewMsg', msg:teamMsg, chatId:chat._id})
                                        context.dispatch({type:'emitNewChatMsg', userId : gigster._id})
                                })
                        })
                    let user = setChatAndUpdate(maister)
                    return context.dispatch({ type: 'updateOwnUser', user })
                })
                
            }
        },
    }
