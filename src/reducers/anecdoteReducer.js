import { createSlice } from "@reduxjs/toolkit";
import anecdoteService from "../requests/blogService";
import { async } from "q";

/*const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const getId = () => (100000 * Math.random()).toFixed(0)*/


const anecdoteSlice = createSlice({
  name:'anecdotes',
  initialState: [],
  reducers:{
    vote(state,action){
      console.log(action)
      const id = action.payload.id
      const finalState = state.map(obj => obj.id === id ? {...obj,likes:action.payload.likes} : obj);
      return finalState
    },
    
    setAll(state,action){
      const content = action.payload
      return content
    },
    appendAnecdote(state,action){
      const content = action.payload
      state.push(content)
    },
    deleteAnecdote(state,action){
      const content = action.payload
      const finalState = state.filter(blog => blog.id !== content.id)
      console.log("🚀 ~ file: anecdoteReducer.js:38 ~ deleteAnecdote ~ finalState:", finalState)
      return finalState
    },
    addComments(state,action){
      console.log("🚀 ~ file: anecdoteReducer.js:43 ~ addComments ~ action:", action)
      const blogid = action.payload.id
      const comment = action.payload.comment
      const finalstate = state.map(obj => obj.id === blogid? {...obj, comment:obj.comment.concat(comment)}: obj )
      console.log("🚀 ~ file: anecdoteReducer.js:47 ~ addComments ~ finalstate:", finalstate)
      return finalstate
    }


  }

})
export const createNew =(content)=> {
  return async (dispatch) => {
    const newObj = {...content, likes:0}
    console.log("🚀 ~ file: anecdoteReducer.js:50 ~ return ~ newObj:", newObj)
    const createResponse = await anecdoteService.create(newObj)
    dispatch(appendAnecdote(createResponse))

  }
}

export const addVote =(anecdote)=> {
  return async (dispatch)=>{
    const response = await anecdoteService.vote(anecdote)
    dispatch(vote(response))
  }
}

export const initialize=()=>{
  return async (dispatch) => {
    const response = await anecdoteService.getAll()
    console.log("🚀 ~ file: anecdoteReducer.js:59 ~ return ~ response:", response)
    
   dispatch(setAll(response))
  }
}
export const deleteBlog =(anecdote) => {
  return async (dispatch)=>{
    const response = await anecdoteService.deleteblog(anecdote)
    console.log("🚀 ~ file: anecdoteReducer.js:73 ~ return ~ response:", response)
    
    dispatch(deleteAnecdote(response))
  }
}

export const addNewComments = (blogid,comment) => {
  return async (dispatch) => {
    const response = await anecdoteService.addComment(blogid,comment)
    console.log("🚀 ~ file: anecdoteReducer.js:90 ~ addNewComments ~ response:", response)
    dispatch(addComments({
      id:response.blog,
      comment:response
  }))
} }







export const {vote,setAll,appendAnecdote,deleteAnecdote,addComments} = anecdoteSlice.actions
export default anecdoteSlice.reducer