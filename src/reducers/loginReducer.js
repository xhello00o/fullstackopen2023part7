import { createSlice } from "@reduxjs/toolkit";
import loginService from "../services/loginService";
import { setNotification } from "./VisibleNotifReducer";
import anecdoteService from "../services/anecdoteService";


const loginslice = createSlice({
    name:'auth',
    initialState: {
        user:null,
        error:null
    },
    reducers:{
        setUser(state,action) {
            console.log(action)
            
                state.error = action.payload.error
                state.user = action.payload.user
            
            
            return state
        }

    }

})

export const login = (credentials) => {
    return async (dispatch) => {
        try {
            const response = await loginService.login(credentials)
            console.log("🚀 ~ file: loginReducer.js:31 ~ return ~ response:", response)
            dispatch(setUser({user:response,error:null}))
            window.localStorage.setItem('loggedUser', JSON.stringify(response))
            anecdoteService.setToken(response.token)
        } catch (err) {
            console.log("🚀 ~ file: loginReducer.js:33 ~ return ~ err:", err)
            dispatch(setUser({user:null,
                error:err.response.data.error}))
            dispatch(setNotification(err.response.data.error,3000))
        }
        
        
    }

}

export const checklogin  =() => {
    return async (dispatch) => {
        const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      console.log("🚀 ~ file: loginReducer.js:53 ~ return ~ user:", user)
      dispatch(setUser({user,error:null}))
      anecdoteService.setToken(user.token)
    }
}
}


export const {setUser} = loginslice.actions
export default loginslice.reducer


