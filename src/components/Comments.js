import { useDispatch } from "react-redux"
import { addNewComments } from "../reducers/anecdoteReducer"
import { Button, Form, ListGroup } from "react-bootstrap"


const Comments =({blog})=> {
    console.log("🚀 ~ file: Comments.js:6 ~ Comments ~ blog:", blog)
    const dispatch = useDispatch()

    const handleComment = (event) => {
        event.preventDefault()
        const newComment = event.target.comment.value
        console.log("🚀 ~ file: Comments.js:11 ~ handleComment ~ newComment:", newComment)
        event.target.comment.value =""
        dispatch(addNewComments(blog.id,newComment))

    }

    
    return (
        <div>
            <ListGroup>
            {blog.comment.map(comment => (
                <ListGroup.Item key={comment.id}>{comment.comment} </ListGroup.Item>
            ) )}
            </ListGroup>
            <Form onSubmit={handleComment}>
            <Form.Floating className="mb-3">
                <Form.Control id="commentinput" name="comment" />
                <label htmlFor="commentinput">Comments</label>
                <Button type="submit">Add comment </Button>
            </Form.Floating>
            </Form>
            
            <ul>
            
            </ul>
        </div>
    )

}

export default Comments