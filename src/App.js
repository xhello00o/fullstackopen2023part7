import CreateForm from "./components/AnecdoteForm";
import AnecdotesList from "./components/AnecdoteList";
import Notification from "./components/Notification";
import { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/Login";
import LoggedUser from "./components/LoggedUser";
import Users from "./components/Users";
import User from "./components/User";
import Blog from "./components/Blog";
import { useUser, useUserDispatch } from "./UserContext";
import blogService from "./requests/blogService";
import { Container } from '@mui/material'


const App = () => {
  
  
  const userDispatch = useUserDispatch()


  
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      console.log("🚀 ~ file: App.js:35 ~ useEffect ~ user:", user)
      userDispatch({type:'setUser',payload: user})
      blogService.setToken(user.token)
    console.log("Logged in");}
  }, [userDispatch]);
  const auth = useUser()
  console.log("🚀 ~ file: App.js:17 ~ App ~ auth:", auth)
  




  auth ? console.log("logged in") : console.log("not logged in");

  const Main =()=>{
    console.log('loading Main')
    return(
    <div>
      <LoggedUser/>
      <Notification />
      <Routes>
        <Route path="/users/:id" element={<User/>}/>
        <Route path ="/*" element={
        <div>
          <AnecdotesList/>
        </div>}/>
        <Route path={'/create'} element={<CreateForm/>}  /> 
        <Route path="/blogs/:id" element={<Blog/>}/>
        <Route path="/users" element={<Users/>}/>
      </Routes>
    </div>)
  }

  return (
    <Container>
       
      
      <Routes>
        <Route
          path="*"
          element={ 
            auth ? (
              <Main/>
            ) : (
              <Navigate replace to="/login" />
            )
           }
        />
        <Route
          path="/login"
          element={auth ? <Navigate replace to="/" /> : <Login />}
        />
      </Routes>
      </Container>
  );
};

export default App;
