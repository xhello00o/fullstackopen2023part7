import axios from "axios";
const baseUrl = 'http://localhost:3003/api/login'

const login = (credentials)=> {
    
        return axios.post(baseUrl,credentials)
        .then(response => {
                console.log("🚀 ~ file: loginService.js:8 ~ login ~ response:", response)
                return response.data})  
    
}

export default {login}