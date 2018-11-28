
import axios from 'axios';
// import { promises } from 'fs';

const BASE_URL = 'http://localhost:3000';


export default {
    getDemoUser,
    saveUser,
    getUserById,
    deleteUser,
    loginUser,
}

function getDemoUser() {
    return Promise.resolve(demoUsers[0])
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
    var user = demoUsers.find(user => user.id === userId)
    return Promise.resolve(user)
    // return axios.get(`${BASE_URL}/${userId}`).then(res => res.data)
}

function deleteUser(userId) {
    return axios.delete(`${BASE_URL}/${userId}`).then(res => res.data)
}

function loginUser(userCreds) {
    return axios.get(`${BASE_URL}/login`, userCreds).then(res => res.data)
}



var demoUsers = [
    {
        "id": "1",
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
            "pending": ["4", "5", "6"],
            "completed": []
        },
        "reviews": {
            "totalAverage" : 0,
            "publishedAverage": 0,
            "published": [{
                "gigId": "2",
                "title": "what it was",
                "givenBy": "that i used to know",
                "createdAt": "timestamp",
                "review": {
                    "text": "was not nice",
                    "payment": 4,
                    "reliable": 3,
                    "overall": 5,
                    "average": 4
                }
            }],
            "completedAverage": 0,
            "completed": [{
                "gigId": "4",
                "title": "was it what",
                "givenBy": "somebody",
                "createdAt": "timestamp",
                "review": {
                    "text": "was awesome",
                    "work": 5,
                    "reliable": 2,
                    "overall": 4,
                    "average": 3.6
                }
            }]
        },
        "img": "https://www.google.co.il/search?q=handsome+guy+img&source=lnms&tbm=isch&sa=X&ved=0ahUKEwjZ6b6LpvTeAhXByaQKHf_MDNgQ_AUIDigB&biw=1455&bih=689#imgrc=Ep7eppzfMe5gCM:"
    }
]