import { useDispatch } from "react-redux";
import { login } from "../reducers/loginReducer";
import { useSelector } from "react-redux";
import { setNotification } from "../reducers/VisibleNotifReducer";
import Notification from "./Notification";

const Login = (props) => {
    const dispatch = useDispatch()
    const user = useSelector(({ auth }) => {
        console.log("AppSelector", auth)
        return auth
    
      })
    const handlelogin= async(event)=>{
        event.preventDefault()
        const username = event.target.username.value
        const password = event.target.password.value
        console.log(username,password)
        event.target.username.value =''
        event.target.password.value=''
        dispatch(login({username,password}))

    }
    const handleClear = (event) => {
        event.preventDefault()
        console.log("clearing")
        event.target.username.value =''
        event.target.password.value=''
    }

    
    
      


  return (
  <div>
    <form onSubmit={handlelogin} onReset={handleClear}>
        <input name={"username"} placeholder="UserName"/>
        <br/>
        <input type="password" name={"password"} placeholder="Password"/> 
        <br/>
        <button type="submit" >Login</button>
        <button type="reset">Clear</button>
    </form>

  </div>);
};

export default Login;
