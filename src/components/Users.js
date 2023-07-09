import { Link } from "react-router-dom"
import { useSelector } from "react-redux"


const Users =()=>{

    const blogs = useSelector(({anecdotes})=>anecdotes)
    
    const users = blogs.map(blog=>(blog.user)).filter((user,ind,self)=> {
        return ind === self.findIndex(obj => obj.id === user.id)
    })

    const userblogs = users.map(user => ( {
         num : blogs.filter(blog => blog.user.id===user.id).length,
        ...user
    }))
    console.log("🚀 ~ file: Users.js:10 ~ Users ~ users:", userblogs)

    return (
        <div>
            <h2>Users</h2>
            <table> 
                <tr>
                    <th> </th>
                    <th>blogs created</th>
                </tr>
            {userblogs.map(user =>{
            return(
                <tr key={user.id}>
                      <td><Link to={`/users/${user.id}`}> {user.name} </Link></td>
                      <td>{user.num} </td>
                      </tr>
            )
        })}


            </table>
        
        </div>
        

    )

}

export default Users