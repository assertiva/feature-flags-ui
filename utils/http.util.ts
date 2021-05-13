import axios from 'axios';

const HttpClient = axios.create({
    baseURL: 'http://localhost:5000',
    timeout: 5000,
    maxRedirects: 2,
})

export default HttpClient;
