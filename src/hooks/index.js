import { useState,useEffect } from "react"
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

export const useCountry = (name) => {
    const [country, setCountry] = useState(null)
    const baseUrl='https://studies.cs.helsinki.fi/restcountries/'

    
  
    useEffect(() => {
        if (name ==="" ){
            setCountry(null)
        }
        else{
            axios.get(`${baseUrl}/api/name/${name}`).then(res => {
            
                setCountry({...res.data,found:true})
                console.log(`${name} data loaded`,res)
            }).catch(err =>{
                if (err.response.statusText === 'Not Found'){
                    setCountry({found:false})
                }
            }
                )
        }
        

    }, [name])
  
    return country
  }