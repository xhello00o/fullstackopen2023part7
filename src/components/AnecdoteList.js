import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { ListGroup,Button,Accordion } from 'react-bootstrap'
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
      <Accordion >
        <Accordion.Item  eventKey='createNewBlog'>
          <Accordion.Header >Create New Blog</Accordion.Header>
          <Accordion.Body as={CreateForm}/>
        </Accordion.Item>
      </Accordion>
      
      {anecdotes.map(blog =>
      <div key={blog.id}>
        <ListGroup>
        <ListGroup.Item as={Link} to={`/blogs/${blog.id}`} action > {blog.title}</ListGroup.Item>
        </ListGroup>
      </div>)}
      </div>
  )
}

export default AnecdotesList