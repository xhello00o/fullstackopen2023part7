import { createContext, useContext, useReducer } from "react"

const userReducer =(state,action)=>{
    switch (action.type) {
        case "setUser":
            const user = action.payload
            return user
        default:
            return null
    }   
}

const UserContext = createContext()
export const UserContextProvider = (props) => {
    const [user,setUserDispatch] = useReducer(userReducer,null)
    return (
        <UserContext.Provider value={[user,setUserDispatch]}>
            {props.children}
        </UserContext.Provider>
    )
}

export const useUser = ()=>{
    const userandDispatch = useContext(UserContext)
    return userandDispatch[0]
}

export const useUserDispatch = () => {
    const userandDispatch = useContext(UserContext)
    return userandDispatch[1]
}

export default UserContext