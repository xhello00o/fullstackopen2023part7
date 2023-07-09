import { useDispatch,useSelector } from "react-redux";
import { setUser } from "../reducers/loginReducer";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";

const LoggedUser = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const auth = useSelector(({auth}) => {
        return auth
    })

    const handleLogout=(event)=>{
        console.log('logout')
        window.localStorage.clear()
        dispatch(setUser({user:null, error:null}))
        navigate('/')
    }

    return (
        <div>
            <h2>Blogs</h2>
            <Link to={'/users'}> Users </Link>
            <Link to={"/"}> Blogs </Link>
            <p>{auth.user.name}</p>
            <button onClick={handleLogout}>Log out</button>
        </div>
    )


}

export default LoggedUser