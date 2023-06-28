
const Anecdote = ({anecdote})=>{


    return( 
        <div>
            <h2>{anecdote.content} by {anecdote.author}</h2>
        <p>has {anecdote.votes} votes</p>
        <p>for more information:  {anecdote.info}</p>
    
        </div>
        )
    }


export default Anecdote