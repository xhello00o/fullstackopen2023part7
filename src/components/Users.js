import { useQueryClient } from "react-query";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { Link } from "react-router-dom";

const Users = () => {
  const queryClient = useQueryClient();
  const blogs = queryClient.getQueryData("blogs");

  const users = blogs
    .map((blog) => blog.user)
    .filter((user, ind, self) => {
      return ind === self.findIndex((obj) => obj.id === user.id);
    });

  const userblogs = users.map((user) => ({
    num: blogs.filter((blog) => blog.user.id === user.id).length,
    ...user,
  }));
  console.log("🚀 ~ file: Users.js:10 ~ Users ~ users:", userblogs);

  return (
    <div>
      <h2>Users</h2>
      <Paper>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell></TableCell>
              <TableCell align="center">blogs created</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {userblogs.map((user) => {
              return (
                <TableRow key={user.id}>
                  <TableCell align='center'>
                    {" "}
                    <Link to={`/users/${user.id}`}> {user.name} </Link>
                  </TableCell>
                  <TableCell align="center">{user.num} </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Paper>
      
    </div>
  );
};

export default Users;
