import { createContext, useContext, useReducer } from "react";


const notificationReducer =(state,action)=>{
    switch (action.type) {
        case "setMessage":
            const content = action.payload
            return content
        case "removeMessage":
            return ""
        default:
            return ""
    }

}

const NotificationContext = createContext()
export const NotificationContextProvider = (props) =>{
    const [notification,setNotificationDispatch] =useReducer(notificationReducer,"")
    return (
        <NotificationContext.Provider value={[notification,setNotificationDispatch]}>
            {props.children}
        </NotificationContext.Provider>
    )
}

export const useNotification =(message)=> {
    const notifandDispatch = useContext(NotificationContext)
    return notifandDispatch[0]
}

export const useNotificationDispatch =(message)=> {
    const notifandDispatch = useContext(NotificationContext)
    return notifandDispatch[1]
}

export default NotificationContext