import storageService from './storageService.js'
import axios from 'axios';
// import { promises } from 'fs';

// const BASE_URL = 'http://localhost:3000';
const BASE_URL = (process.env.NODE_ENV !== 'development')? '/api/user': '//localhost:3000/api/user';


export default {
    getLoggedUser,
    saveUser,
    updateUser,
    getUserById,
    deleteUser,
    loginUser,
    logout
}

function getLoggedUser() {
    var user = storageService._fromStorage('loggedUser')
    if(user) return Promise.resolve(user)
    else return Promise.resolve(null)
}
function logout() {
    storageService._toStorage('loggedUser', null)
    return Promise.resolve()
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
    // return axios.get(`${BASE_URL}/login`, userCreds).then(res => res.data)
        // .then(user => {
        //     storageService._toStorage('loggedUser', user)
        //     return user
        // })
    var user = demoUsers.find(user => (user.username === userCreds.username && user.password === userCreds.password))
    storageService._toStorage('loggedUser', user)
    if(!user) return Promise.reject()
    return Promise.resolve(user)
}

function updateUser(user) {
    // return axios.put...
    var userIdx = demoUsers.findIndex(currUser => user.id === currUser.id)
    demoUsers.splice(userIdx, 1, user)
    return Promise.resolve(user)    
}


var demoUsers = [
    {
        "id": "abc",
        "name": {
            "first": "tester",
            "last": "testerovich"
        },
        "aboutMe":"Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet laborum nam aliquam optio nulla fugit quasi alias architecto culpa dolorem deserunt nobis voluptatibus, accusantium, facere in perspiciatis quo aperiam ad?",
        "username": "maister",
        "password": "0",
        "email": "testerMan@gmail.com",
        "mainArea": {
            "lat": 32.023914,
            "lng": 34.760210
        },
        "skills": ["testing", "trying", "QAing"],
        "age": 24,
        "gigsIds": {
            "published": ["1", "2", "3", "6"],
            "pending": [],
            "completed": []
        },
        "reviews": {
            "totalAverage" : 3.7,
            "publishedAverage": 4.6,
            "published": [
                {
                "gigId": "20",
                "title": "please help me with my homework",
                "givenBy": {
                    "name": "bill cosby",
                    "img": "https://pmcvariety.files.wordpress.com/2018/04/bill-cosby-retrial3.jpg?w=1000"
                },
                "createdAt": 1543412028131,
                "review": {
                    "text": "He was a great guy and payed well",
                    "payment": 4,
                    "reliable": 3,
                    "overall": 5,
                    "average": 4
                }},
                {
                "gigId": "21",
                "title": "please take my dog for a walk",
                "givenBy": {
                    "name": "adam sandler",
                    "img": "https://cdn.empireonline.com/jpg/70/0/0/640/480/aspectfit/0/0/0/0/0/0/c/articles/5ac3b81d402d8da418e964da/adam-sandler.jpg"
                },
                "createdAt": 1543412028131,
                "review": {
                    "text": "Easy task and good money, lovely dog",
                    "payment": 5,
                    "reliable": 5,
                    "overall": 5,
                    "average": 5
                }},
                {
                "gigId": "22",
                "title": "Help me cook a good meal for nana",
                "givenBy": {
                    "name": "Omer Adam",
                    "img": "https://media.reshet.tv/image/upload/t_main_image_article,f_auto,q_auto/v1521451776/omer-adam_lc7lds.jpg"
                },
                "createdAt": 1543412028131,
                "review": {
                    "text": "We had a lovely time",
                    "payment": 4,
                    "reliable": 4,
                    "overall": 4,
                    "average": 4
                }},
            ],
            "completedAverage": 3,
            "completed": [{
                "gigId": "23",
                "title": "picking up oranges",
                "givenBy": {
                    "name": "Amy Whinehous",
                    "img" : "https://static.independent.co.uk/s3fs-public/thumbnails/image/2015/05/16/18/3-Amy-Winehouse-AP.jpg?w968h681"
                },
                "createdAt": 1543412028131,
                "review": {
                    "text": "He was ok i guess",
                    "work": 3,
                    "reliable": 3,
                    "overall": 3,
                    "average": 3
                }
            }]
        },
        "img": "http://nextdivas.com/wp-content/uploads/2017/09/1505157617_the-generic-white-woman-of-stock-photography-needs-to-go"
    },
    {
        "id": "ade",
        "name": {
            "first": "giger",
            "last": "gigMan"
        },
        "aboutMe":"Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet laborum nam aliquam optio nulla fugit quasi alias architecto culpa dolorem deserunt nobis voluptatibus, accusantium, facere in perspiciatis quo aperiam ad?",
        "username": "giger",
        "password": "1",
        "email": "gigerMan@gmail.com",
        "mainArea": {
            "lat": 32.023914,
            "lng": 34.760210
        },
        "skills": ["doing gigs", "helping out", "being awesome"],
        "age": 24,
        "gigsIds": {
            "published": ["9"],
            "pending": ["1","3","4"],
            "completed": []
        },
        "reviews": {
            "totalAverage" : 4,
            "publishedAverage": 4,
            "published": [
                {
                    "gigId": "25",
                    "title": "Need help watering my garden",
                    "givenBy": {
                        "name": "Marty McFly",
                        "img": "https://upload.wikimedia.org/wikipedia/en/thumb/d/d8/Michael_J._Fox_as_Marty_McFly_in_Back_to_the_Future%2C_1985.jpg/220px-Michael_J._Fox_as_Marty_McFly_in_Back_to_the_Future%2C_1985.jpg"
                    },
                    "createdAt": 1543413057239,
                    "review": {
                        "text": "Was nice, beutiful garden",
                        "payment": 3,
                        "reliable": 4,
                        "overall": 5,
                        "average": 4
                    }},
            ],
            "completedAverage": 4,
            "completed": [
                {
                "gigId": "27",
                "title": "Help cleaning my house",
                "givenBy": {
                    "name": "Shoshi gordo",
                    "img" : "https://i.ytimg.com/vi/bSm2_4kS2fg/hqdefault.jpg"
                },
                "createdAt": 1543413342417,
                "review": {
                    "text": "He was very neat and helpful",
                    "work": 4,
                    "reliable": 4,
                    "overall": 4,
                    "average": 4
                }},
                {
                "gigId": "28",
                "title": "pick up my groceries",
                "givenBy": {
                    "name": "Reuven Bonsonti",
                    "img" : "https://cdn.shopify.com/s/files/1/0715/6823/files/hats_d3d6ca76-3891-4bde-83b7-5ac87c4e6934_580x.jpg?v=1520488004"
                },
                "createdAt": 1543413454131,
                "review": {
                    "text": "The tomatoes were missing, but everything else was fine",
                    "work": 3,
                    "reliable": 3,
                    "overall": 3,
                    "average": 3
                }},
                {
                    "gigId": "29",
                    "title": "come and pet my dog",
                    "givenBy": {
                        "name": "Barack obama",
                        "img" : "https://www.biography.com/.image/t_share/MTE4MDAzNDEwNzg5ODI4MTEw/barack-obama-12782369-1-402.jpg"
                    },
                    "createdAt": 1543412028131,
                    "review": {
                        "text": "Did uuuhhh... a great job, my dog enjoyed very much",
                        "work": 5,
                        "reliable": 5,
                        "overall": 5,
                        "average": 5
                    }},
            ]
        },
        "img": "https://i.pinimg.com/236x/20/8e/2b/208e2bbf01979334eba2513631c96764--tattoo-ink-beard-tattoo.jpg"
    },
]