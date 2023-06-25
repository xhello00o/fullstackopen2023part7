import { useSelector, useDispatch } from 'react-redux'
import { addVote } from '../reducers/anecdoteReducer'
import { setNotification } from "../reducers/VisibleNotifReducer"


const AnecdotesList =()=>{
    const anecdotes = useSelector(({anecdotes,filterInput}) => {
        console.log("selector",anecdotes)
        if (filterInput ==="") {
            return [...anecdotes].sort((a,b) => b.votes - a.votes )}
        else {
            const filteredAnecdotes = anecdotes.filter(each => each.content.toLowerCase().includes(filterInput.toLowerCase()))
            return filteredAnecdotes.sort((a,b) => b.votes - a.votes )}
        } )


        
  const dispatch = useDispatch()
  console.log(anecdotes)

   const addvote = async(anecdote) => {
    console.log('vote', anecdote)
   
    
    dispatch(addVote(anecdote)) 
    dispatch(setNotification(`you voted for '${anecdote.content}'`,5))
  }
  return (
    <div>
    <h2>Anecdotes</h2>
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => addvote(anecdote)}>vote</button>
          </div>
        </div>
      )}
      </div>
  )
}

export default AnecdotesList