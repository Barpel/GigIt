// this is use able service axios calls

import axios from 'axios';

const BASE_URL = 'http://localhost:3000';

export default {
    query(filter = {}) {
        var queryParams  = new URLSearchParams();
        for (let key in filter) {
            if (key === 'sort') continue;
            queryParams.set(`${key}`, filter[key]);
        }
        console.log('query params',queryParams.toString())
        return axios.get(`${BASE_URL}/api/item?${queryParams}`)
            .then(res => res.data);
    },
    getById(itemId) {
        return axios.get(`${BASE_URL}/api/item/${itemId}`)
            .then(res => res.data)
    },
    remove(itemId) {
        return axios.delete(`${BASE_URL}/api/ite,/${itemId}`)
    }
}