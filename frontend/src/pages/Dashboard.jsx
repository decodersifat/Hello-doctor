import { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import { Navigate } from 'react-router-dom'

function Dashboard() {

    const { user, isLoading } = useContext(AuthContext);

  return (
    <div>Hi, { user.fname +" "+ user.lname}</div>
  )
}

export default Dashboard;