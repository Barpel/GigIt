import storageService from './storageService.js'
import axios from 'axios';

const BASE_URL = 'http://localhost:3001/api';


export default {
    query,
    getById,
    getLoggedUser,
    loginUser,
    logout,
    remove,
    update,
    add
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
    console.log('updating user:', user)
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

function remove(userId) {
    return axios.delete(`${BASE_URL}/user/${userId}`).then(res => res.data)
}
function loginUser(userCreds) {
    return axios.post(`${BASE_URL}/user/login`, userCreds)
        .then(res => {
            var user = res.data
            storageService._toStorage('loggedUser', user)
            return user
        })
}

function logout() {
    storageService._toStorage('loggedUser', null)
    return Promise.resolve()
    //TODO: backend and front end logout
}



