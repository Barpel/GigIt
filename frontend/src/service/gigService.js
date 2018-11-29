// this is use able service axios calls

import axios from 'axios';

const BASE_URL = 'http://localhost:3000';

export default {
    query,
    getById,
    remove,
    save
}

function query(filter = {}) {
    var queryParams = new URLSearchParams();
    for (let key in filter) {
        if (key === 'sort') continue;
        queryParams.set(`${key}`, filter[key]);
    }
    // console.log('query params', queryParams.toString())
    return axios.get(`${BASE_URL}/gig?${queryParams}`)
        .then(res => res.data);
}
function getById(gigId) {
    return axios.get(`${BASE_URL}/gig/${gigId}`)
        .then(res => res.data)
}
function remove(gigId) {
    return axios.delete(`${BASE_URL}/gig/${gigId}`)
}

function save(gig) {
    if (gig._id) {
        return axios.put(`${BASE_URL}/gig/${gig._id}`, user).then(res => res.data)
    }
    else {
        return axios.post(`${BASE_URL}/gig`, gig).then(res => res.data)
    }
}