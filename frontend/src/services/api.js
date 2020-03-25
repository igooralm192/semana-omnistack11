import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:3333',
    headers: {
        Authorization: localStorage.getItem('ongId')
    }
})

export default api;