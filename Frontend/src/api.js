import axios from "axios";

const API = axios.create({
  baseURL: "https://task-manager-mern-22rs.onrender.com/",
  withCredentials: true,
});
// Attach the token to requests if logged in
API.interceptors.request.use((req)=>{
    const token = localStorage.getItem('authToken')
    console.log("Token attached to request:", token);
    if(token){
        req.headers.Authorization = `Bearer ${token}`
    }
    return req;
})

export default API;
