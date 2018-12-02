// this is use able service axios calls

import axios from 'axios';

// const BASE_URL = 'http://localhost:3000';
const BASE_URL = (process.env.NODE_ENV !== 'development')? '/api/gig': '//localhost:3001/api/gig';


export default {
    query,
    getById,
    remove,
    update
}

function query(filter = {}) {
    return axios.get(BASE_URL)
        .then(res => {
            return res.data
        })
    // console.log('im herr!')
    // var queryParams = new URLSearchParams();
    // for (let key in filter) {
    //     if (key === 'sort') continue;
    //     queryParams.set(`${key}`, filter[key]);
    // }
    // // console.log('query params', queryParams.toString())
    // return axios.get(`${BASE_URL}?${queryParams}`)
    //     .then(res => res.data);
}
function getById(gigId) {
    return axios.get(`${BASE_URL}/${gigId}`)
        .then(res => res.data)
}
function remove(gigId) {
    return axios.delete(`${BASE_URL}/${gigId}`)
}

function update(gig) {
    if (gig._id) {
        console.log('gigService is updating:',gig)
        return axios.put(`${BASE_URL}/${gig._id}`, user).then(res => res.data)
    }
    else {
        return axios.post(`${BASE_URL}`, gig).then(res => res.data)
    }
}