import axios from 'axios'
const baseUrl ='http://localhost:3003/api/blogs'

const getAll= async () => {
    const response = await axios.get(baseUrl)
    console.log("getall")
    return response.data
}
let token
const setToken =(newToken)=>{
    token = `Bearer ${newToken}`
    console.log("🚀 ~ file: anecdoteService.js:13 ~ setToken ~ token:", token)
}
    

const create = async (newObject) => {
    console.log(newObject)
    const config = {
        headers: { Authorization:token }
      }
    const response = await axios.post(baseUrl,newObject,config)
    return response.data
}

const vote = async (obj)=>{
    console.log('id/obj',obj)
    const config = {
        headers: { Authorization:token }
      }
    console.log("🚀 ~ file: anecdoteService.js:27 ~ vote ~ config:", config)
    const id = obj.id
    const votedObj = { ...obj, likes: obj.likes + 1 }
    const response = await axios.put(`${baseUrl}/like/${id}`, votedObj,config)
    console.log("🚀 ~ file: anecdoteService.js:34 ~ vote ~ votedObj:", votedObj)
    return response.data
}

const deleteblog = async (obj) => {
    console.log('id/obj',obj)
    const config = {
        headers: { Authorization:token }
      }
    const id = obj.id
    const response = await axios.delete(`${baseUrl}/${id}`,config)
    return response.data

}

const addComment = async (blogid,comment) => {
    console.log("🚀 ~ file: anecdoteService.js:50 ~ addComment ~ comment:", comment)
    const config = { 
        headers: { Authorization:token }
    }   
    const response = await axios.post(`${baseUrl}/${blogid}/comments`,{comment},config)
    
    console.log("🚀 ~ file: anecdoteService.js:56 ~ addComment ~ response:", response)
    return response.data
}


export default { getAll, create,vote,deleteblog,setToken,addComment}