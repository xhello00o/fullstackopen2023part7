
import { useSelector } from 'react-redux'
import { Alert } from 'react-bootstrap'

const Notification = () => {
  const notification = useSelector(({ notification }) => notification)
  console.log("notif",notification)
  

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }
  return (
    <div>
      {notification !== ""
        ? (<Alert transition variant="success" >
          {notification}
        </Alert>)
        : <div></div>}
    </div>
  )
}

export default Notification

