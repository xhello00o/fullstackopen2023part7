import { Link, useNavigate } from 'react-router-dom'
import CreateForm from './AnecdoteForm'
import blogService from '../requests/blogService'
import { useQuery } from 'react-query'
import {Typography,Accordion, AccordionDetails, AccordionSummary, List,ListItem,ListItemButton,ListItemText, Collapse, Button, AccordionActions, Fab, Box, AppBar } from '@mui/material'
import { useState } from 'react'
import { useCreateBlog, useCreateBlogDispatch } from '../CreateBlogContext'









const AnecdotesList =()=>{
  const createBlogDispatch = useCreateBlogDispatch()
  const createBlogView = useCreateBlog()
  const navigate = useNavigate()
  const result = useQuery(
    'blogs',
    blogService.getAll,
    {retry:false}
    )
    console.log("🚀 ~ file: AnecdoteList.js:18 ~ AnecdotesList ~ result:", result)
    
    if (result.isLoading){
      return <p> Loading...</p>
    }
    if (result.isError){
      return <p> there was an error </p>
    }
    const blogs = result.data
    console.log("🚀 ~ file: AnecdoteList.js:28 ~ AnecdotesList ~ blogs:", blogs)
  
  const sortedBlogs = [...blogs].sort((a,b) => b.likes - a.likes )
  console.log("🚀 ~ file: AnecdoteList.js:21 ~ AnecdotesList ~ sortedBlogs:", sortedBlogs)

  




    

  const handleRedirect =(event)=>{
    navigate('/create')    
  }

  
  
  return (
    <div>
      <h2>Anecdotes</h2>

      
     <CreateForm/>
      
      
      
      {sortedBlogs.map(blog =>
      <div key={blog.id}>
        <List>
          <ListItemButton component={Link} to={`/blogs/${blog.id}`} divider={true}>
            <ListItemText primary={blog.title} secondary={`added by ${blog.user.name}`} />
          </ListItemButton>
        </List>
      </div>)}
      </div>
  )
}

export default AnecdotesList