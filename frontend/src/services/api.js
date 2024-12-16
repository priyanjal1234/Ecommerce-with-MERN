import axios from 'axios'

const api = axios.create({
    baseURL: 'https://ecommerce-with-mern-backend.onrender.com/api'
})

export default api
