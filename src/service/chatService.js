// import storageService from './storageService.js'
import axios from 'axios';

const BASE_URL = (process.env.NODE_ENV !== 'development')?
                        '/api/chat' : 'http://localhost:3001/api/chat'
// const BASE_URL = 'http://localhost:3001/api/chat';


export default {
    query,
    getById,
    remove,
    update,
    add
}

function query() {
    return axios.get(BASE_URL).then(res => res.data)
}
function add(chat) {
    return axios.post(BASE_URL, chat).then(res => {
        var chat = res.data
        return chat
    })
}

function getById(chatId) {
    return axios.get(`${BASE_URL}/${chatId}`).then(res => res.data)
}

function update(chat) {
    if (chat._id) {
        return axios.put(`${BASE_URL}/${chat._id}`, chat).then(res => res.data)
    }
    else {
        return axios.post(BASE_URL, chat).then(res => res.data)
    }
}

function remove(chatId) {
    return axios.delete(`${BASE_URL}/${chatId}`).then(res => res.data)
}
