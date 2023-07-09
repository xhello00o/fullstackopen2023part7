import axios from "axios";
const baseUrl = 'http://localhost:3003/api/login'

const login =async(credentials)=> {
    
        const response = await axios.post(baseUrl,credentials)
        console.log("🚀 ~ file: loginService.js:6 ~ login ~ response:", response)
        return response.data
    
    
}

export default {login}