
import axios from 'axios';
// import { promises } from 'fs';

const BASE_URL = 'http://localhost:3000';


export default {
    getCurrUser,
    saveUser,
    getUserById,
    deleteUser,
    loginUser,
}

function getCurrUser() {
    return Promise.resolve(demoUsers[0])
    return axios.get(BASE_URL)
        .then(res => res.data)
}

function saveUser(user) {
    return Promise.resolve(demoUsers.push(user))
    // if (user._id) {
    //     return axios.put(`${BASE_URL}/${user._id}`, user).then(res => res.data)
    // }
    // else {
    //     return axios.post(`${BASE_URL}`, newUser).then(res => res.data)
    // }
}

function getUserById(userId) {
    return axios.get(`${BASE_URL}/${userId}`).then(res => res.data)
}

function deleteUser(userId) {
    return axios.delete(`${BASE_URL}/${userId}`).then(res => res.data)
}

function loginUser(userCreds) {
    return axios.get(`${BASE_URL}/login`, userCreds ).then(res => res.data)
}



var demoUsers = [
    {
        "id": "abc",
        "name": {
            "first": "tester",
            "last": "testerovich"
        },
        "username": "testerMan123",
        "password": "053",
        "email": "testerMan@gmail.com",
        "mainArea": {
            "lat": 32.023914,
            "lng": 34.760210
        },
        "skills": ["testing", "trying", "QAing"],
        "age": 24,
        "gigsIds": {
            "published": ["1", "2", "3"],
            "completed": ["4", "5", "6"]
        },
        "reviews": {
            "published": [{
                "gigId": "2",
                "title": "what it was",
                "review": {
                    "payment": 4,
                    "reliable": 3,
                    "overall": 5
                }
            }],
            "completed": [{
                "gigId": "4",
                "title": "was it what",
                "review": {
                    "work": 5,
                    "reliable": 2,
                    "overall": 4
                }
            }]
        },
        "img": "https://www.google.co.il/search?q=handsome+guy+img&source=lnms&tbm=isch&sa=X&ved=0ahUKEwjZ6b6LpvTeAhXByaQKHf_MDNgQ_AUIDigB&biw=1455&bih=689#imgrc=Ep7eppzfMe5gCM:"
    }
]