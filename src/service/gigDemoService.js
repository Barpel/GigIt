

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
            "pendingUsers": [{"name":{"first": "Jonas", "last": "Mamasita"}, "id": "2", "img":"https://bloximages.chicago2.vip.townnews.com/nwitimes.com/content/tncms/assets/v3/editorial/0/d9/0d98cbc7-0408-518e-a67d-50ba01ca1bfa/5a7e4016d73b4.image.jpg"},{"name":{"first":"Yehud","last":"Hagever"}, "id": "2", "img":"https://bloximages.chicago2.vip.townnews.com/nwitimes.com/content/tncms/assets/v3/editorial/0/d9/0d98cbc7-0408-518e-a67d-50ba01ca1bfa/5a7e4016d73b4.image.jpg"}], 
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
            "publisherId": "abd",
            "category": "other",
            "createdAt": 1543239603758,
            "pendingUsers": [{"name":"Jonas", "id": "2", "img":"https://bloximages.chicago2.vip.townnews.com/nwitimes.com/content/tncms/assets/v3/editorial/0/d9/0d98cbc7-0408-518e-a67d-50ba01ca1bfa/5a7e4016d73b4.image.jpg"}], "isActive": true,
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
            "publisherId": "acd",
            "category": "house-work",
            "createdAt": 1543239733239,
            "pendingUsers": [{"name":"Jonas", "id": "2", "img":"https://bloximages.chicago2.vip.townnews.com/nwitimes.com/content/tncms/assets/v3/editorial/0/d9/0d98cbc7-0408-518e-a67d-50ba01ca1bfa/5a7e4016d73b4.image.jpg"}], "isActive": true,
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
            "publisherId": "ace",
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
            "publisherId": "ade",
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
            "publisherId": "adf",
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
            "publisherId": "aef",
            "category": "delivery",
            "createdAt": 1543241902574,
            "pendingUsers": [], "isActive": true,
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
            "publisherId": "bcd",
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
            "publisherId": "bce",
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
            "publisherId": "bse",
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
