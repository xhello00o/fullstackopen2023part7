import { createSlice } from "@reduxjs/toolkit";


const notifslice =  createSlice({
    name: 'notification',
    initialState:'',
    reducers:{
        setMessage(state,action){
            console.log("notifreducer",action)
            const content = action.payload
            return content
        },
        removeMessage(state,action){
            return ""
        }
    }
})


export const setNotification = (message, duration) => {
    return (dispatch) => {
        dispatch(setMessage(message))
    setTimeout(()=>{
        console.log('Notification')
        dispatch(removeMessage())
    }, duration)
    }
}

export const {setMessage,removeMessage} = notifslice.actions
export default notifslice.reducer