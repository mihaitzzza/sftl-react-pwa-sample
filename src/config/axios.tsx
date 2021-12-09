import axios from 'axios';

axios.interceptors.request.use(function (config: any) {
    if (config.method === 'post') {
        const token = window.localStorage.getItem('token');

        config.headers = {
            ...config.headers,
            Authorization: `Bearer ${token}`
        }
    }

    return config;
})

export default axios

