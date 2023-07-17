import loginService from "../requests/loginService";
import { useMutation } from "react-query";
import { useUserDispatch } from "../UserContext";
import blogService from "../requests/blogService";
import { useNotificationDispatch } from "../NotificationContext";



const Login = (props) => {
    const userDispatch = useUserDispatch()
    const notificationDispatch = useNotificationDispatch()
    const loginMutation = useMutation(
        loginService.login,
        {onSuccess:(loginRes)=>{
            userDispatch({type:'setUser',payload:loginRes})
            window.localStorage.setItem('loggedUser', JSON.stringify(loginRes))
            blogService.setToken(loginRes.token)
        },
    onError:(error) => {
        console.log("🚀 ~ file: Login.js:20 ~ Login ~ error:", error)
        notificationDispatch({type:"setMessage",payload:error.response.data.error})
    }}
    )

    const handlelogin= async(event)=>{
        event.preventDefault()
        const username = event.target.username.value
        const password = event.target.password.value
        console.log(username,password)
        event.target.username.value =''
        event.target.password.value=''
        loginMutation.mutate({username,password})
        setTimeout(() => {
            notificationDispatch({type:"removeMessage"})
          }, 3000)
        
        
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
