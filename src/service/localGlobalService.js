var items = [{
    id: 1
}, { id: 2 }]



function query() {
    if (items) return items
}

function getById(itemId = 1) {
    let currItem = items.find(item => item.id === itemId)
    console.log(currItem)
}

