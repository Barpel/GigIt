
import axios from 'axios';
// import { promises } from 'fs';

const BASE_URL = 'http://localhost:3000';


export default {
    getDemoUser,
    saveUser,
    updateUser,
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

function updateUser(user) {
    // return axios.put...
    var userIdx = demoUsers.findIndex(currUser => user.id === currUser.id)
    demoUsers.splice(userIdx, 1, user)
    return Promise.resolve(user)    
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
            },{
                "gigId": "2",
                "title": "what it was",
                "review": {
                    "payment": 4,
                    "reliable": 3,
                    "overall": 5
                }
            }],
            "completedAverage": 0,
            "completed": [{
                "gigId": "4",
                "title": "was it what",
                "givenBy": "https://bloximages.chicago2.vip.townnews.com/nwitimes.com/content/tncms/assets/v3/editorial/0/d9/0d98cbc7-0408-518e-a67d-50ba01ca1bfa/5a7e4016d73b4.image.jpg",
                "createdAt": "timestamp",
                "review": {
                    "text": "was awesome",
                    "work": 5,
                    "reliable": 2,
                    "overall": 4,
                    "average": 3.6
                }
            },{
                "gigId": "3",
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
        "img": "https://img.buzzfeed.com/buzzfeed-static/static/2015-03/27/12/campaign_images/webdr14/woof-and-woof-2-6572-1427473305-24_dblbig.jpg"
    }
]