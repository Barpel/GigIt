import storageService from './storageService.js'
import axios from 'axios';

const BASE_URL = 'http://localhost:3001/api';


export default {
    query,
    getById,
    getLoggedUser,
    loginUser,
    logout,
<<<<<<< HEAD
    saveUser,
    deleteUser,
    getLoggedUser
=======
    update,
    remove,
    update
>>>>>>> 7e25392da4694ce91669536c7e1028db38c1f90d
}

function query() {
    console.log('Hello from Service')
    return axios.get(`${BASE_URL}/user`).then(res => res.data)
}

function getById(userId) {
    return axios.get(`${BASE_URL}/user/${userId}`).then(res => res.data)
}

<<<<<<< HEAD
function getLoggedUser() {
    // var user = axios.get(`${BASE_URL}/`)
    //     .then(res => ({
            
    //     }))
    //     if (user) return Promise.resolve(user)
    //     else return Promise.resolve(null)
    }

function saveUser(user) {
=======
function update(user) {
>>>>>>> 7e25392da4694ce91669536c7e1028db38c1f90d
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
            console.log(user)
            storageService._toStorage('loggedUser', user)
        })
}

function logout() {
    // storageService._toStorage('loggedUser', null)
    // return Promise.resolve()
    //TODO: backend and front end logout
}



