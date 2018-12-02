// this is use able service axios calls

import axios from 'axios';

// const BASE_URL = 'http://localhost:3000';
const BASE_URL = (process.env.NODE_ENV !== 'development') ? '/api/gig' : '//localhost:3001/api/gig';


export default {
    query,
    getById,
    remove,
    update,
}

function query(filter = { byTitle: '', byCategory: '' }) {
    var queryParams = new URLSearchParams()
    queryParams.append('byTitle', filter.byTitle)
    queryParams.set('byCategory', filter.byCategory)
    const REQ_URL = `${BASE_URL}?${queryParams}`
    console.log('REQ_URL', REQ_URL);
    
    return axios.get(REQ_URL)
        .then(res => res.data)

    // if(!filter){
    //     return axios.get(BASE_URL)
    //         .then(res => {
    //             console.log('No filter result', res.data)
    //             return res.data
    //         })
    // }
    // else{
    //     var queryParams = new URLSearchParams();
    //     for (let key in filter) {
    //         if (key === 'sort') continue;
    //         queryParams.set(`${key}`, filter[key]);
    //     }
    //     return axios.get(`${BASE_URL}/category/${filter}`)
    //         .then(res =>{
    //             return res.data});
    // }
}


function getById(gigId) {
    return axios.get(`${BASE_URL}/${gigId}`)
        .then(res => res.data)
}
function remove(gigId) {
    return axios.delete(`${BASE_URL}/${gigId}`)
}

function update(gig) {
    console.log('updating gig:', gig.pendingUsers)
    if (gig._id) {
        console.log('gigService is updating:',gig)
        return axios.put(`${BASE_URL}/${gig._id}`, gig).then(res => res.data)
    }
    else {
        return axios.post(`${BASE_URL}`, gig).then(res => res.data)
    }
}