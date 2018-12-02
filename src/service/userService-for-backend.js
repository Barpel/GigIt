import storageService from './storageService.js'
import axios from 'axios';

const BASE_URL = 'http://localhost:3001/api';


export default {
    query,
    getUserById,
    getLoggedUser,
    loginUser,
    logout,
    saveUser,
    deleteUser
}

function query() {
    return axios.get(`${BASE_URL}/user`).then(res => res.data)
}

function getUserById(userId) {
    return axios.get(`${BASE_URL}/user/${userId}`).then(res => res.data)
}

function saveUser(user) {
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

function deleteUser(userId) {
    return axios.delete(`${BASE_URL}/user/${userId}`).then(res => res.data)
}
function loginUser(userCreds) {
    return axios.post(`${BASE_URL}/user/login`, userCreds)
        .then(res => res.data)
}

function logout() {
    // storageService._toStorage('loggedUser', null)
    // return Promise.resolve()
    //TODO: backend and front end logout
}



