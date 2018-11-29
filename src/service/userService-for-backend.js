import axios from 'axios';

const BASE_URL = 'http://localhost:3000';


export default {
    query,
    getUserById,
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



