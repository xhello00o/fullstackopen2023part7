import { useDispatch, useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router"
import { addVote } from "../reducers/anecdoteReducer"
import { setNotification } from "../reducers/VisibleNotifReducer"
import { deleteBlog } from "../reducers/anecdoteReducer"

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
            <h2>{blog.title}</h2>
            <a href={blog.url}>{blog.url}</a>
            <p> 
               {blog.likes} likes 
               <button onClick={() => addvote(blog)}>like</button>
               {auth.user.name === blog.user.name?
               <button onClick={() => deleteAnecdote(blog)}>delete</button>
               :null
            }
            </p>
            <p> added by {blog.user.name}</p>
  

        </div>
    )
}

export default Blog