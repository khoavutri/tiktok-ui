import axios from 'axios';

const request = axios.create({
    baseURL: 'http://localhost:8080/',
    timeout: 0,
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Accept: '*/*',
    },

    //headers: { 'Content-Type': 'application/json' },
});

request.interceptors.response.use(
    function (response) {
        return response.data;
    },
    function (err) {
        return Promise.reject(err);
    },
);

export default request;
