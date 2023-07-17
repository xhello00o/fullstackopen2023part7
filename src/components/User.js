import { useQueryClient } from "react-query";
import { useParams } from "react-router";

const User = () => {
  const id = useParams().id;
  console.log("🚀 ~ file: User.js:9 ~ User ~ id:", id);
  const queryClient = useQueryClient()
  const blogs = queryClient.getQueryData('blogs').filter((blog) => {
      return blog.user.id === id
  })
  console.log("🚀 ~ file: User.js:10 ~ User ~ blogs:", blogs)
  if (blogs.length===0){
    return null
  }
  console.log("🚀 ~ file: User.js:13 ~ blogs ~ blogs:", blogs);
  const filterblogs = blogs.filter((blog) => blog.user.id === id);
  console.log("🚀 ~ file: User.js:14 ~ User ~ filterblogs:", filterblogs);
  return (
    <div>
      <h2>{blogs[0].user.name}</h2>
      <h3>Created Blogs:</h3>
      <ul>
        {blogs.map((blog) => (
          <li key={blog.id}> {blog.title} </li>
        ))}
      </ul>
    </div>
  );
};

export default User;
