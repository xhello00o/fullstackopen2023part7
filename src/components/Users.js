import { Link } from "react-router-dom"
import { useSelector } from "react-redux"
import { Table } from "react-bootstrap"


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
            <Table striped="columns" hover> 
                <thead>
                <tr>
                    <th> </th>
                    <th>blogs created</th>
                </tr>
                </thead> 
            {userblogs.map(user =>{
            return(
                <tbody key={user.id}>
                     <tr >
                      <td><Link to={`/users/${user.id}`}> {user.name} </Link></td>
                      <td>{user.num} </td>
                      </tr>
                </tbody>
            )
        })}


            </Table>
        
        </div>
        

    )

}

export default Users