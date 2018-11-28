

export default {
    query,
    getById,
    updateGig
}

function query(category) {
    if (category) {
        var filteredGigs = items.filter(item => {
          return  item.category === category
        })
        return Promise.resolve(filteredGigs)
    }
    return Promise.resolve(items)
}

function getById(gigId) {
    var gig = items.find(gig => gig.id === (gigId+''))
    return Promise.resolve(gig)
}

function updateGig(gig) {
    var gigIdx = items.findIndex(currGig => currGig.id === gig.id)
    items.splice(gigIdx, 1, gig)
    return Promise.resolve(gig)
}
var items = [
        {
            "id": "1",
            "publisherId": "abc",
            "category": "delivery",
            "createdAt": 1543238938388,
            "pendingUsers": [
                {"name":"Jonas Mamasita", "completedReviewsAverage":4.5, "id": "2", "img":"https://bloximages.chicago2.vip.townnews.com/nwitimes.com/content/tncms/assets/v3/editorial/0/d9/0d98cbc7-0408-518e-a67d-50ba01ca1bfa/5a7e4016d73b4.image.jpg"},
                {"name":"Yehud Haorvitz", "completedReviewsAverage":3.7, "id": "2", "img":"http://cf.girlsaskguys.com/q1729692/5f1a53c1-2f2e-4ccf-b89b-368bc7414816.jpg"}
            ], 
            "isActive": true,
            "details": {
                "title": "Get this package to Ramat Gan",
                "desc": "It's a small package, but expensive, i need to get it to The Bursa in Ramat Gan",
                "price": "50 NIS",
                "pos": {
                    "dist": "2.2 Km away", "lat": 32.087098,
                    "lng": 34.802301
                },
                "gigTime": {
                    "from": 1543238948388,
                    "to": 1543239948388
                },
                "imgs": []
            }
        },
        {
            "id": "2",
            "publisherId": "abc",
            "category": "other",
            "createdAt": 1543239603758,
            "pendingUsers": [
                {"name":"Robin Shem-Tov", "completedReviewsAverage":4, "id": "ade", "img":"https://pbs.twimg.com/profile_images/378800000565629255/66a72dbb24d99df5bd6d882e63b3b5f1_400x400.jpeg"}
            ],
            "isActive": true,
            "details": {
                "title": "Opening a facebook account",
                "desc": "I would love to have a facebook but don't know how to open one",
                "price": "50 NIS",
                "pos": {
                    "dist": "2.2 Km away", "lat": 32.087098,
                    "lng": 34.802301
                },
                "gigTime": {
                    "from": 1543238948388,
                    "to": 1543239948388
                },
                "imgs": []
            }
        },
        {
            "id": "3",
            "publisherId": "abc",
            "category": "house-work",
            "createdAt": 1543239733239,
            "pendingUsers": [
                {"name":"Reut Ovadia", "completedReviewsAverage":4.8, "id": "ade", "img":"https://media.licdn.com/dms/image/C4D03AQFvjLwir21BAg/profile-displayphoto-shrink_200_200/0?e=1543449600&v=beta&t=PIHcb2KDWD8_ex-J108FQlPIKvuFpZ_Ox9yXWUcOj8A"}
            ],
            "isActive": true,
            "details": {
                "title": "Putting on a shelf",
                "desc": "I need to put on two shelves in my kitchen, i have the tools",
                "price": "75 NIS",
                "pos": {
                    "dist": "2.2 Km away", "lat": 32.087098,
                    "lng": 34.802301
                },
                "gigTime": {
                    "from": 1543238948388,
                    "to": 1543239948388
                },
                "imgs": []
            }
        },
        {
            "id": "9",
            "publisherId": "abc",
            "category": "house-work",
            "createdAt": 1543240939430,
            "pendingUsers": [], "isActive": true,
            "details": {
                "title": "clean my garden",
                "desc": "My garden needs some sweeping",
                "price": "100 NIS",
                "pos": {
                    "dist": "2.2 Km away", "lat": 32.087098,
                    "lng": 34.802301
                },
                "gigTime": {
                    "from": 1543238948388,
                    "to": 1543239948388
                },
                "imgs": []
            }
        },
        {
            "id": "4",
            "publisherId": "abc",
            "category": "line-queue",
            "createdAt": 1543241371536,
            "pendingUsers": [], "isActive": true,
            "details": {
                "title": "My spot in the Post Office",
                "desc": "I need someone to hold my spot around 4 ocklock and call me when my turn comes",
                "price": "50 NIS",
                "pos": {
                    "dist": "2.2 Km away", "lat": 32.087098,
                    "lng": 34.802301
                },
                "gigTime": {
                    "from": 1543238948388,
                    "to": 1543239948388
                },
                "imgs": []
            }
        },
        {
            "id": "5",
            "publisherId": "abc",
            "category": "other",
            "createdAt": 1543241496924,
            "pendingUsers": [], "isActive": true,
            "details": {
                "title": "putting Anti-virus on my computer",
                "desc": "I need some one who knows his way in computers to help me install a good anti-virus",
                "price": "80 NIS",
                "pos": {
                    "dist": "2.2 Km away", "lat": 32.087098,
                    "lng": 34.802301
                },
                "gigTime": {
                    "from": 1543238948388,
                    "to": 1543239948388
                },
                "imgs": []
            }
        },
        {
            "id": "6",
            "publisherId": "abc",
            "category": "delivery",
            "createdAt": 1543241902574,
            "pendingUsers": [
                {"name":"Yael Kindoma", "completedReviewsAverage":4.6, "id": "ade", "img":"https://pmcvariety.files.wordpress.com/2018/04/yael-1-cropped.jpg?w=1000&h=563&crop=1"}
            ],
            "isActive": true,
            "details": {
                "title": "Pick up my groceries",
                "desc": "I need someone to pickup the groceries from my local store and put it near my door before it closes",
                "price": "50 NIS",
                "pos": {
                    "dist": "2.2 Km away", "lat": 32.087098,
                    "lng": 34.802301
                },
                "gigTime": {
                    "from": 1543238948388,
                    "to": 1543239948388
                },
                "imgs": []
            }
        },
        {
            "id": "7",
            "publisherId": "abc",
            "category": "moving",
            "createdAt": 1543242079143,
            "pendingUsers": [], "isActive": true,
            "details": {
                "title": "Get my old stuff to my apartmant",
                "desc": "My apartment in the third floor, i have some stuff to move up there, not too heavy",
                "price": "100 NIS",
                "pos": {
                    "dist": "2.2 Km away", "lat": 32.087098,
                    "lng": 34.802301
                },
                "gigTime": {
                    "from": 1543238948388,
                    "to": 1543239948388
                },
                "imgs": []
            }
        },
        {
            "id": "8",
            "publisherId": "abc",
            "category": "moving",
            "createdAt": 1543242149936,
            "pendingUsers": [], "isActive": true,
            "details": {
                "title": "Get my old couch out of my house",
                "desc": "I want to throw away my old couch, living on first floor no stairs",
                "price": "50 NIS",
                "pos": {
                    "dist": "2.2 Km away", "lat": 32.087098,
                    "lng": 34.802301
                },
                "gigTime": {
                    "from": 1543238948388,
                    "to": 1543239948388
                },
                "imgs": []
            }
        },
        {
            "id": "10",
            "publisherId": "abc",
            "category": "pet-care",
            "createdAt": 1543257014565,
            "pendingUsers": [], "isActive": true,
            "details": {
                "title": "walk my dog",
                "desc": "I need someone to walk my dog for me this afternoon",
                "price": "75 NIS",
                "pos": {
                    "dist": "2.2 Km away", "lat": 32.087098,
                    "lng": 34.802301
                },
                "gigTime": {
                    "from": 1543238948388,
                    "to": 1543239948388
                },
                "imgs": []
            }
        },
    ]
