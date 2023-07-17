import { useNavigate, useParams } from "react-router";
import Comments from "./Comments";
import { Paper,Card,CardContent,CardActions, Typography,Button,Link } from "@mui/material";
import { useMutation, useQueryClient } from "react-query";
import blogService from "../requests/blogService";
import { useNotificationDispatch } from "../NotificationContext";
import { useUser } from "../UserContext";
import ThumbUpAltTwoToneIcon from '@mui/icons-material/ThumbUpAltTwoTone';
import DeleteForeverTwoToneIcon from '@mui/icons-material/DeleteForeverTwoTone';

const Blog = () => {
  const navigate = useNavigate();
  const id = useParams().id;
  const queryClient = useQueryClient();
  console.log("🚀 ~ file: Blog.js:9 ~ Blog ~ id:", id);

  const notificationDispatch = useNotificationDispatch();
  const auth = useUser();

  const cacheblogs = queryClient.getQueryData("blogs");
  console.log("🚀 ~ file: Blog.js:19 ~ Blog ~ cacheblogs:", cacheblogs);

  const blog = cacheblogs.find((blog) => {
    return blog.id === id;
  });
  console.log("🚀 ~ file: Blog.js:22 ~ Blog ~ blog:", blog);
  const newLikeMutation = useMutation(blogService.like, {
    onSuccess: (likeblogres) => {
      console.log("🚀 ~ file: Blog.js:21 ~ Blog ~ likeblogres:", likeblogres);
      const cacheblogs = queryClient.getQueryData("blogs");
      const updatedblogs = cacheblogs.map((obj) =>
        obj.id === id ? { ...obj, likes: likeblogres.likes } : obj
      );
      console.log("🚀 ~ file: Blog.js:27 ~ Blog ~ updatedblogs:", updatedblogs);
      queryClient.setQueryData("blogs", updatedblogs);
      notificationDispatch({
        type: "setMessage",
        payload: `you liked '${likeblogres.title}'`,
      });
    },
    onError: (error) => {
      console.log("🚀 ~ file: Blog.js:31 ~ Blog ~ error:", error);
      notificationDispatch({
        type: "setMessage",
        payload: error.response.data.error,
      });
    },
  });
  const deleteMutation = useMutation(blogService.deleteblog, {
    onSuccess: (deleteblogres) => {
      console.log(
        "🚀 ~ file: Blog.js:40 ~ Blog ~ deleteblogres:",
        deleteblogres
      );
      const cacheblogs = queryClient.getQueryData("blogs");
      const updatedblogs = cacheblogs.filter(
        (blog) => blog.id !== deleteblogres.id
      );
      console.log("🚀 ~ file: Blog.js:43 ~ Blog ~ updatedblogs:", updatedblogs);
      queryClient.setQueryData("blogs", updatedblogs);
      notificationDispatch({
        type: "setMessage",
        payload: `you deleted '${updatedblogs.title}'`,
      });
    },
    onError: (error) => {
      console.log("🚀 ~ file: Blog.js:48 ~ Blog ~ error:", error);
      notificationDispatch({
        type: "setMessage",
        payload: error.response.data.error,
      });
    },
  });

  const newCommentMutation = useMutation(
    blogService.addComment, {
    onSuccess: (addcommentRes) => {
        console.log('hi there')
      console.log(
        "🚀 ~ file: Comments.js:14 ~ Comments ~ addcommentRes:",
        addcommentRes
      );
      const blogid = addcommentRes.blog;
      const comment = addcommentRes.comment;
      const cacheblogs = queryClient.getQueryData("blogs");
      console.log("🚀 ~ file: Blog.js:84 ~ Blog ~ cacheblogs:", cacheblogs)
      const updatedblogs = cacheblogs.map((obj) =>
      obj.id === blogid
        ? { ...obj, comment: obj.comment.concat(addcommentRes) }
        : obj)
      console.log("🚀 ~ file: Blog.js:88 ~ Blog ~ updatedblogs:", updatedblogs)
      queryClient.setQueryData(
        "blogs", updatedblogs
        )
      notificationDispatch({
        type: "setMessage",
        payload: `you added '${comment}'`,
      });
    },
    onError: (error) => {
      console.log("🚀 ~ file: Blog.js:63 ~ Blog ~ error:", error);
      notificationDispatch({
        type: "setMessage",
        payload: error.response.data.error,
      });
    },
  });

  const addvote = (blog) => {
    console.log("vote", blog);
    newLikeMutation.mutate(blog);
    setTimeout(() => {
      notificationDispatch({ type: "removeMessage" });
    }, 3000);
  };

  const deleteBlog = (blog) => {
    deleteMutation.mutate(blog);
    setTimeout(() => {
      notificationDispatch({ type: "removeMessage" });
    }, 3000);
    navigate("/");
  };

  return (
    <div>
        <Paper>
      <Card>
        <CardContent>
          <Typography variant={"h2"} >{blog.title}</Typography> 
          <Typography color={'text.secondary'}>added by {blog.user.name}</Typography>
          <br />

          <Typography > has {blog.likes} likes </Typography>
            </CardContent>
            <CardActions>
            <Button color="success" onClick={() => addvote(blog)}>
            <ThumbUpAltTwoToneIcon/>
              <span/>like
            </Button>
            
            {auth.name === blog.user.name ? (
              <Button color="error" onClick={() => deleteBlog(blog)}>
                <DeleteForeverTwoToneIcon/>
                delete
              </Button>
            ) : null}
            </CardActions>
            <CardContent>
            <Link href={blog.url} color={'inherit'} underline="hover">{blog.url}</Link>
            </CardContent>
          
          <br />
          <h4>Comments</h4>
          <Comments blog={blog} commentMutation={newCommentMutation} />
      </Card>
      </Paper>
    </div>
  );
};

export default Blog;
