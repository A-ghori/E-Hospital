import axios from "axios";


//Axios instance
const api = axios.create({
    baseURL: "http://localhost:5040/api",
    headers: {
        "Content-Type": "application/json",
    },
});

//Interceptor to add token if available
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token") //JWT store in localstorage
        if(token){
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

export default api;