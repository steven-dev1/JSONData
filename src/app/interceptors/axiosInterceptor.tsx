import axios from "axios";

const axiosClient = axios.create()
axiosClient.interceptors.request.use(
    (config) => {
        return config;
    }, (error) => {
        console.log('Error: ', error.message)
        return Promise.reject(error.message);
    });

axios.interceptors.response.use(
    (response) => {
        console.log('Response ' + JSON.stringify(response.data, null, 2));
        return response
    },
    (error) => {
        console.log('Error: ' + error.code)
        return Promise.reject(error.message)
    }
)

export default axiosClient;