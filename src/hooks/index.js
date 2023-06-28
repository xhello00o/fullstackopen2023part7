import { useEffect,useState } from "react";
import axios from 'axios'

export const useField = (type) => {
    const [value, setValue] = useState('')
  
    const onChange = (event) => {
      setValue(event.target.value)
    }
  
    return {
      type,
      value,
      onChange
    }
  }
  
  export const useResource = (baseUrl) => {
    const [resources, setResources] = useState([])
    useEffect(()=>{
        axios.get(baseUrl).then(res=> {
            console.log("fetched data",res.data)
            setResources(res.data)
        })
    },[baseUrl])
    
  
    const create = (resource) => {
        axios.post(baseUrl,resource).then(res => {
            console.log('post data',res.data)
            setResources(resources.concat(res.data))
        })
              
    }
  
    const service = {
      create
    }
  
    return [
      resources, service
    ]
  }