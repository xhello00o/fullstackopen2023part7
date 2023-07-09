import { useDispatch } from 'react-redux'
import {createNew} from '../reducers/anecdoteReducer'
import { setNotification } from "../reducers/VisibleNotifReducer"
import { useNavigate } from 'react-router'




const CreateForm =() =>{
  const navigate = useNavigate()
    const dispatch = useDispatch()
    const addNew = async (event)=>{
        event.preventDefault()
        const title = event.target.newTitle.value
        const url = event.target.newURL.value

        event.target.newTitle.value =''
        event.target.newURL.value =''
        const content = {
          title,
          url
        }
        console.log("🚀 ~ file: AnecdoteForm.js:18 ~ addNew ~ content:", content)

        
        dispatch(createNew(content)) 
        dispatch(setNotification(`you added '${content.title}'`))
   
      }
    const handleCancel =(event) => {
      event.target.newTitle.value =''
      event.target.newURL.value =''
      navigate('/')

    }


    return (
      <div>
        <h2>create new</h2>
        <form onSubmit={addNew} onReset={handleCancel}>
        <div>Title:<input name={'newTitle'} /></div>
        <div>URL:<input name={'newURL'} /></div>
        <button type='submit'>create</button>
        <button type='reset'>cancel</button>
      </form>
      </div>)
  

}

export default CreateForm