import { configureStore } from '@reduxjs/toolkit'
import anecdotereducer from './reducers/anecdoteReducer'
import filterReducer from './reducers/filterReducer'
import VisibleNotifReducer from './reducers/VisibleNotifReducer'


const store = configureStore({
    reducer:{
        anecdotes:anecdotereducer,
        filterInput:filterReducer,
        notification: VisibleNotifReducer
      }
})

export default store