import axios from 'axios'
const baseUrl ='http://localhost:3001/anecdotes'

const getAll= async () => {
    const response = await axios.get(baseUrl)
    return response.data
}

const create = async (newObject) => {
    console.log(newObject)
    const response = await axios.post(baseUrl,newObject)
    return response.data
}

const vote = async (obj)=>{
    console.log('id/obj',obj)
    const id = obj.id
    const votedObj = { ...obj, votes: obj.votes + 1 }
    const response = await axios.put(`${baseUrl}/${id}`, votedObj)
    return response.data
}

export default { getAll, create,vote}