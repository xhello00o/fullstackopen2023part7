import { Button, Form, ListGroup } from "react-bootstrap"
import { useNotificationDispatch } from "../NotificationContext"


const Comments =({blog,commentMutation})=> {
    console.log("🚀 ~ file: Comments.js:6 ~ Comments ~ blog:", blog)
    const notificationDispatch = useNotificationDispatch()

    const handleComment = (event) => {
        event.preventDefault()
        const newComment = event.target.comment.value
        console.log("🚀 ~ file: Comments.js:11 ~ handleComment ~ newComment:", newComment)
        event.target.comment.value =""
        commentMutation.mutate({blogid:blog.id,comment: newComment})
        setTimeout(() => {
            notificationDispatch({type:"removeMessage"})
          }, 3000)

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