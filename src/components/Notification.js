import { Alert, Snackbar } from '@mui/material'
import { useNotification } from '../NotificationContext'


const Notification = () => {
  const notification = useNotification()
  console.log("notif",notification)
  
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }
  return (
    <div>
      
        <Snackbar anchorOrigin={{
          vertical:'top',
          horizontal:'center'
        }} open={notification !== ""} 
        >
          <Alert severity='success'> 
          {notification}

          </Alert>
        </Snackbar>
        
    </div>
  )
}

export default Notification

