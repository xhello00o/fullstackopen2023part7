import { useDispatch, useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router"
import { addVote } from "../reducers/anecdoteReducer"
import { setNotification } from "../reducers/VisibleNotifReducer"
import { deleteBlog } from "../reducers/anecdoteReducer"
import Comments from "./Comments"
import { Card,Button } from "react-bootstrap"

const Blog =()=>{
    const navigate =  useNavigate()
    const id = useParams().id
    console.log("🚀 ~ file: Blog.js:9 ~ Blog ~ id:", id)
    const blog = useSelector(({anecdotes})=>{
        return anecdotes.find(blog=> blog.id === id)
    })
    const dispatch=useDispatch()
    const auth = useSelector(({ auth }) => {
        console.log("AppSelector", auth);
        return auth;
      });

    const addvote = async(blog) => {
        console.log('vote', blog)
    
        dispatch(addVote(blog)) 
        dispatch(setNotification(`you liked '${blog.title}'`,3000))
      }

      const deleteAnecdote = async (anecdote) =>{
        dispatch(deleteBlog(anecdote))
        dispatch(setNotification(`you have deleted '${anecdote.title}'`,3000))
       navigate('/')
      }

    return (
        <div>
            <Card>
                <Card.Body>
                    <Card.Title as={'h2'}>{blog.title}</Card.Title>
                    <Card.Subtitle> added by {blog.user.name}</Card.Subtitle>
                    <br/>
                   
                    
            <Card.Text> 
                has {blog.likes} likes 
                <br/>
               <Button variant="success" onClick={() => addvote(blog)}>like</Button>
               {auth.user.name === blog.user.name?
               <Button variant="danger" onClick={() => deleteAnecdote(blog)}>delete</Button>
               :null
            }
            </Card.Text>
            <Card.Link href={blog.url}>{blog.url}</Card.Link>
            <br/>
            <h4>Comments</h4>
            <Comments blog={blog}/>
                </Card.Body>
            
            </Card>
        </div>
    )
}

export default Blog