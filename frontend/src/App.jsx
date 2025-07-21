
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import ForgotPass from './pages/ForgotPass'
import Profile from './pages/Profile'
import Products from './pages/Products'
import Dashboard from './pages/Dashboard'
import ProtectedRoute from './context/ProtectedRoute'
import axios from "axios";
import { AuthContext } from './context/AuthContext'

import { useContext } from 'react'

axios.defaults.withCredentials = true;
function App() {
  const { isLoading } = useContext(AuthContext);
  if (isLoading) return <p>Loading user...</p>;
  return (
    <Router>
      <div>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/signin' element = {<Login/>} />
          <Route path='/signup' element = {<SignUp/>} />
          <Route path='/forgot-pass' element = {<ForgotPass/>} />
          <Route path='/profile' element = { <Profile/> } />
          <Route path='/addProducts' element ={ <Products/> } />
          <Route path='/user/dashboard' element = { 
            <ProtectedRoute>
              <Dashboard/>
            </ProtectedRoute>
            } />
        </Routes>
      </div>
    </Router>
  )
}

export default App
