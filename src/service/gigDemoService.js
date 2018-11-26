var items = getGigs()

export default {
    query,
    getById
}

function query() {
    return Promise.resolve(items)
}

function getById(itemId = 1) {
    let currItem = items.find(item => item.id === itemId)
    console.log(currItem)
}
function getGigs ()  {
    // return JSON.parse([
    return [
        {
            "id": "1",
            "publisherId": "abc",
            "category": "delivery",
            "createdAt": 1543238938388,
            "isActive": true,
            "details": {
                "title": "Get this package to Ramat Gan",
                "desc": "It's a small package, but expensive, i need to get it to The Bursa in Ramat Gan",
                "price": "50 NIS",
                "pos": {
                    "lat": 32.087098,
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
            "category": "technical",
            "createdAt": 1543239603758,
            "isActive": true,
            "details": {
                "title": "Opening a facebook account",
                "desc": "I would love to have a facebook but don't know how to open one",
                "price": "50 NIS",
                "pos": {
                    "lat": 32.087098,
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
            "isActive": true,
            "details": {
                "title": "Putting on a shelf",
                "desc": "I need to put on two shelves in my kitchen, i have the tools",
                "price": "75 NIS",
                "pos": {
                    "lat": 32.087098,
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
            "isActive": true,
            "details": {
                "title": "clean my garden",
                "desc": "My garden needs some sweeping",
                "price": "100 NIS",
                "pos": {
                    "lat": 32.087098,
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
            "category": "queue-keeping",
            "createdAt": 1543241371536,
            "isActive": true,
            "details": {
                "title": "My spot in the Post Office",
                "desc": "I need someone to hold my spot around 4 ocklock and call me when my turn comes",
                "price": "50 NIS",
                "pos": {
                    "lat": 32.087098,
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
            "category": "technical",
            "createdAt": 1543241496924,
            "isActive": true,
            "details": {
                "title": "putting Anti-virus on my computer",
                "desc": "I need some one who knows his way in computers to help me install a good anti-virus",
                "price": "80 NIS",
                "pos": {
                    "lat": 32.087098,
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
            "isActive": true,
            "details": {
                "title": "Pick up my groceries",
                "desc": "I need someone to pickup the groceries from my local store and put it near my door before it closes",
                "price": "50 NIS",
                "pos": {
                    "lat": 32.087098,
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
            "isActive": true,
            "details": {
                "title": "Get my old stuff to my apartmant",
                "desc": "My apartment in the third floor, i have some stuff to move up there, not too heavy",
                "price": "100 NIS",
                "pos": {
                    "lat": 32.087098,
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
            "isActive": true,
            "details": {
                "title": "Get my old couch out of my house",
                "desc": "I want to throw away my old couch, living on first floor no stairs",
                "price": "50 NIS",
                "pos": {
                    "lat": 32.087098,
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
    // )
}
