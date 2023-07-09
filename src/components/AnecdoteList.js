import { useSelector } from 'react-redux'
import { Link, Route, Routes, useNavigate } from 'react-router-dom'
import CreateForm from './AnecdoteForm'



const AnecdotesList =()=>{
    const navigate = useNavigate()
    const anecdotes = useSelector(({anecdotes,filterInput}) => {
        console.log("selector",anecdotes)
        if (filterInput ==="") {
            return [...anecdotes].sort((a,b) => b.likes - a.likes )}
        else {
            const filteredAnecdotes = anecdotes.filter(each => each.content.toLowerCase().includes(filterInput.toLowerCase()))
            return filteredAnecdotes.sort((a,b) => b.likes - a.likes )}
        } )


        
 
  console.log(anecdotes)


  const handleRedirect =(event)=>{
    navigate('/create')    
  }

  
  return (
    <div>
      <h2>Anecdotes</h2>
      <button onClick={handleRedirect}> Create New Blog</button>
      {anecdotes.map(blog =>
      <div key={blog.id}>
        <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
      </div>)}
      </div>
  )
}

export default AnecdotesList