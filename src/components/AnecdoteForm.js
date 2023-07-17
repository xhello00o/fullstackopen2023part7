import { useNavigate } from 'react-router'
import { useMutation, useQueryClient } from 'react-query'
import blogService from '../requests/blogService'
import { useNotificationDispatch } from '../NotificationContext'
import { useCreateBlogDispatch } from '../CreateBlogContext'
import { Accordion,AccordionSummary,AccordionDetails,Typography } from '@mui/material'






const CreateForm =() =>{
  const notificationDispatch = useNotificationDispatch()
  const createBlogDispatch = useCreateBlogDispatch()
  const queryClient =useQueryClient()
  const newBlogMutation = useMutation(
    blogService.create,
    {onSuccess: (createblogres)=>{
      const cacheblogs = queryClient.getQueryData('blogs')
      const updatedblogs = cacheblogs.concat(createblogres)
      console.log("🚀 ~ file: AnecdoteForm.js:19 ~ CreateForm ~ updatedblogs:", updatedblogs)
      queryClient.setQueryData('blogs',updatedblogs)
      notificationDispatch({type:'setMessage',payload:`you added '${createblogres.title}'`})
    },
    onError: (error) => {
      console.log("🚀 ~ file: AnecdoteList.js:29 ~ AnecdotesList ~ error:", error)
      notificationDispatch({type:"setMessage",payload:error.response.data.error})
    }
    }  
  )
   const navigate = useNavigate()
    const addNew =  (event)=>{
        event.preventDefault()
        const title = event.target.newTitle.value
        const url = event.target.newURL.value

        event.target.newTitle.value =''
        event.target.newURL.value =''
        const content = {
          title,
          url
        }
        console.log("🚀 ~ file: AnecdoteForm.js:18 ~ addNew ~ content:", content)

        newBlogMutation.mutate(content)
        
        setTimeout(() => {
          notificationDispatch({type:'removeMessage'})
        }, 3000)

        createBlogDispatch({type:'toggle'})
        navigate('/')

        
   
      }
    const handleCancel =(event) => {
      event.target.newTitle.value =''
      event.target.newURL.value =''
      navigate('/')
    }


    return (

      

      <div>
        <Accordion >
        <AccordionSummary>
          <Typography>
          Create New
          </Typography>
        </AccordionSummary>
          <AccordionDetails>
          <form onSubmit={addNew} onReset={handleCancel}>
        <div>Title:<input name={'newTitle'}  /></div>
        <div>URL:<input name={'newURL'} /></div>
        <button type='submit'>create</button>
        <button type='reset'>cancel</button>
      </form>
          </AccordionDetails>
      </Accordion>
        
        
      </div>)
  

}

export default CreateForm