import CreateForm from './components/AnecdoteForm'
import AnecdotesList from './components/AnecdoteList'
import Filter from './components/Filter'
import Notification from './components/Notification'
import { useDispatch } from 'react-redux'
import {initialize} from './reducers/anecdoteReducer'
import { useEffect } from 'react'

const App = () => {

  const dispatch = useDispatch()

  useEffect(()=>{dispatch(initialize())
  console.log ('getting all')},
  [dispatch])

  
  


  return (
    <div>
      <Notification/> 
      <AnecdotesList/>
      <CreateForm />
      <Filter/>
    </div>
  )
}

export default App