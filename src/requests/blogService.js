import axios from 'axios'
const baseUrl ='http://localhost:3003/api/blogs'

const getAll= () => {
    return axios.get(baseUrl)
    .then(response => {
        console.log("🚀 ~ file: blogService.js:7 ~ getAll ~ response:", response)
        return response.data
    })
}

let token
const setToken =(newToken)=>{
    token = `Bearer ${newToken}`
    console.log("🚀 ~ file: anecdoteService.js:13 ~ setToken ~ token:", token)
}
    

const create = (newObject) => {
    console.log(newObject)
    const config = {
        headers: { Authorization:token }
      }
    return axios.post(baseUrl,newObject,config)
    .then(response => response.data)
}

const like =  (obj)=>{
    console.log('id/obj',obj)
    const config = {
        headers: { Authorization:token }
      }
    console.log("🚀 ~ file: anecdoteService.js:27 ~ vote ~ config:", config)
    const id = obj.id
    const likedObj = { ...obj, likes: obj.likes + 1 }
    console.log("🚀 ~ file: blogService.js:37 ~ like ~ likedObj:", likedObj)
    return axios.put(`${baseUrl}/like/${id}`, likedObj,config)
    .then(response => response.data)
}

const deleteblog = (obj) => {
    console.log('id/obj',obj)
    const config = {
        headers: { Authorization:token }
      }
    const id = obj.id
    return axios.delete(`${baseUrl}/${id}`,config)
     .then(response =>response.data)
}

const addComment = (prop) => {
    console.log("🚀 ~ file: blogService.js:52 ~ addComment ~ blogid:", prop.blogid)
    console.log("🚀 ~ file: anecdoteService.js:50 ~ addComment ~ comment:", prop.comment)
    const config = { 
        headers: { Authorization:token }
    }   
     return axios.post(`${baseUrl}/${prop.blogid}/comments`,{comment: prop.comment},config)
     .then(response => {
        console.log("🚀 ~ file: anecdoteService.js:56 ~ addComment ~ response:", response)
        return response.data})

    
    
   
}


export default { getAll, create,like,deleteblog,setToken,addComment}