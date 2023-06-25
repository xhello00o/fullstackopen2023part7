import { useDispatch } from 'react-redux'
import {createNew} from '../reducers/anecdoteReducer'
import { setNotification } from "../reducers/VisibleNotifReducer"




const CreateForm =() =>{
    const dispatch = useDispatch()
    const addNew = async (event)=>{
        event.preventDefault()
        const content = event.target.newAnecdote.value
        event.target.newAnecdote.value =''
        
        dispatch(createNew(content)) 
        dispatch(setNotification(`you added '${content}'`))
   
      }


    return (
      <div>
        <h2>create new</h2>
        <form onSubmit={addNew}>
        <div><input name={'newAnecdote'} /></div>
        <button>create</button>
      </form>
      </div>)
  

}

export default CreateForm