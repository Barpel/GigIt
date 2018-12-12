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
    loginUser,
    logout,
}

function query() {
    return axios.get(`${BASE_URL}/user`).then(res => res.data)
}
function add(user) {
    return axios.post(`${BASE_URL}/user`, user).then(res => res.data)
}

function getById(userId) {
    return axios.get(`${BASE_URL}/user/${userId}`).then(res => res.data)
}

function update(user) {
    if (user._id) {
        return axios.put(`${BASE_URL}/user/${user._id}`, user).then(res => res.data)
    }
    else {
        return axios.post(`${BASE_URL}/user`, user).then(res => res.data)
    }
}

function remove(userId) {
    return axios.delete(`${BASE_URL}/user/${userId}`).then(res => res.data)
}
function loginUser(userCreds) {
    return axios.post(`${BASE_URL}/user/login`, userCreds).then(res => res.data)
}

function logout() {
    return axios.post(`${BASE_URL}/user/logout`, {}).then(res => res.data)
}

