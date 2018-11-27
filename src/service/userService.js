

export default {
    getUsers
}

function getUsers() {
    axios.get('../demoUserDb.json')
    .then(res => console.log(res))
}