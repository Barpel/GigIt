import storageService from './storageService.js'
import axios from 'axios';

const BASE_URL = (process.env.NODE_ENV !== 'development')?
                        '/api' : 'http://localhost:3001/api'
// const BASE_URL = 'http://localhost:3001/api';


export default {
    query,
    getById,
    remove,
    update,
    add,
    getLoggedUser,
    loginUser,
    logout,
    setLocalLoggedUser,
    getLoggedUserId,

}

function query() {
    return axios.get(`${BASE_URL}/user`).then(res => res.data)
}
function add(user) {
    return axios.post(`${BASE_URL}/user`, user).then(res => {
        var user = res.data
        storageService._toStorage('loggedUser', user)
        return user
    })
}

function getById(userId) {
    return axios.get(`${BASE_URL}/user/${userId}`).then(res => res.data)
}

function update(user) {
    console.log(user)
    if (user._id) {
        return axios.put(`${BASE_URL}/user/${user._id}`, user).then(res => res.data)
    }
    else {
        return axios.post(`${BASE_URL}/user`, user).then(res => res.data)
    }
}
function getLoggedUser() {
    var user = storageService._fromStorage('loggedUser')
    if(user) return Promise.resolve(user)
    else return Promise.resolve(null)
}
function getLoggedUserId() {
    var userId = storageService._fromStorage('loggedUserId')
    if(userId) return Promise.resolve(userId)
    else return Promise.resolve(null)
}

function remove(userId) {
    return axios.delete(`${BASE_URL}/user/${userId}`).then(res => res.data)
}
function loginUser(userCreds) {
    return axios.post(`${BASE_URL}/user/login`, userCreds)
        .then(res => {
            var user = res.data
            storageService._toStorage('loggedUserId', user._id)
            storageService._toStorage('loggedUser', user)
            return user
        })
}

function logout() {
    storageService._toStorage('loggedUser', null)
    storageService._toStorage('loggedUserId', null)
    return Promise.resolve()
    //TODO: backend and front end logout
}

function setLocalLoggedUser(user) {
    storageService._toStorage('loggedUserId', user._id)
    storageService._toStorage('loggedUser', user)
}



