
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
        "aboutMe":"Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet laborum nam aliquam optio nulla fugit quasi alias architecto culpa dolorem deserunt nobis voluptatibus, accusantium, facere in perspiciatis quo aperiam ad?",
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
            "published": [{
                "gigId": "2",
                "title": "what it was",
                "review": {
                    "payment": 4,
                    "reliable": 3,
                    "overall": 5
                }
            },{
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
        "img": "https://img.buzzfeed.com/buzzfeed-static/static/2015-03/27/12/campaign_images/webdr14/woof-and-woof-2-6572-1427473305-24_dblbig.jpg"
    }
]