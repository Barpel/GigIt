import axios from 'axios';

const BASE_URL = 'http://localhost:3001/api';


export default {
    query,
    getUserById,
    loginUser,
    logout,
    saveUser,
    deleteUser,
    getLoggedUser
}

function query() {
    console.log('Hello from Service')
    return axios.get(`${BASE_URL}/user`).then(res => res.data)
}

function getUserById(userId) {
    return axios.get(`${BASE_URL}/user/${userId}`).then(res => res.data)
}

function getLoggedUser() {
    // var user = axios.get(`${BASE_URL}/`)
    //     .then(res => ({
            
    //     }))
    //     if (user) return Promise.resolve(user)
    //     else return Promise.resolve(null)
    }

function saveUser(user) {
    if (user._id) {
        return axios.put(`${BASE_URL}/user/${user._id}`, user).then(res => res.data)
    }
    else {
        return axios.post(`${BASE_URL}/user`, user).then(res => res.data)
    }
}

function deleteUser(userId) {
    return axios.delete(`${BASE_URL}/user/${userId}`).then(res => res.data)
}
function loginUser(userCreds) {
    return axios.get(`${BASE_URL}/login`, userCreds)
        .then(res => res.data)
}

function logout() {
    // storageService._toStorage('loggedUser', null)
    // return Promise.resolve()
    //TODO: backend and front end logout
}



