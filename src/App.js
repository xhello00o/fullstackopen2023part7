import CreateForm from "./components/AnecdoteForm";
import AnecdotesList from "./components/AnecdoteList";
import Filter from "./components/Filter";
import Notification from "./components/Notification";
import { useDispatch } from "react-redux";
import { initialize } from "./reducers/anecdoteReducer";
import { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/Login";
import { checklogin } from "./reducers/loginReducer";
import { useSelector } from "react-redux";
import LoggedUser from "./components/LoggedUser";
import Users from "./components/Users";
import User from "./components/User";
import Blog from "./components/Blog";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initialize());
    console.log("getting all");
  }, [dispatch]);

  useEffect(() => {
    dispatch(checklogin());
    console.log("Logged in");
  }, [dispatch]);

  const user = useSelector(({ auth }) => {
    console.log("AppSelector", auth);
    return auth;
  });

  console.log(user.user, "test");

  user.user ? console.log("logged in") : console.log("not logged in");
  false ? console.log("test1") : console.log("test2");


  const Main =()=>{
    return(
    <div>
      <LoggedUser/>
      <Routes>
        <Route path="/users/:id" element={<User/>}/>
        <Route path ="/*" element={
        <div>
          <AnecdotesList/>
          <Filter/>
        </div>}/>
        <Route path={'/create'} element={<CreateForm/>}  /> 
        <Route path="/blogs/:id" element={<Blog/>}/>
        <Route path="/users" element={<Users/>}/>
      </Routes>
    </div>)
  }

  return (
    <div>
      <Notification />
      <Routes>
        <Route
          path="*"
          element={
            user.user ? (
              <Main/>
            ) : (
              <Navigate replace to="/login" />
            )
          }
        />
        <Route
          path="/login"
          element={user.user ? <Navigate replace={true} to="/" /> : <Login />}
        />
      </Routes>
    </div>
  );
};

export default App;
