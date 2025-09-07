import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import ForgotPass from './pages/ForgotPass';
import Profile from './pages/Profile';
import Products from './pages/Products';
import Dashboard from './pages/Dashboard';
import ProtectedRoute from './context/ProtectedRoute';
import axios from "axios";
import AuthProvider, { AuthContext } from './context/AuthContext';
import { Progress } from "@/components/ui/progress";
import { useContext } from 'react';
import TestChatPage from './pages/TextReportLanding';
import ChatPage from './pages/ChatPage';
import ModelProcessing from './pages/ModelProcessing';
import MRIProcessing from './pages/MRIProcessing';
import Services from './pages/Services';

axios.defaults.withCredentials = true;

function AppContent() {
  const { isLoading } = useContext(AuthContext);
  if (isLoading) return <Progress value={33} />;

  return (
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/services' element={<Services/>}/>
      <Route path='/signin' element={<Login/>}/>
      <Route path='/signup' element={<SignUp/>}/>
      <Route path='/forgot-pass' element={<ForgotPass/>}/>
      <Route path='/profile' element={<Profile/>}/>
      <Route path='/addProducts' element={<Products/>}/>
      <Route path='/user/dashboard' element={
        <ProtectedRoute>
          <Dashboard/>
        </ProtectedRoute>
      } />

      <Route path='/user/testchat' element={
        <ProtectedRoute>
          <TestChatPage/>
        </ProtectedRoute>
      } />

      <Route path='/user/chat/:reportId' element={
        <ProtectedRoute>
          <ChatPage/>
        </ProtectedRoute>
      } />

      <Route path='/user/model-processing' element={
        <ProtectedRoute>
          <ModelProcessing/>
        </ProtectedRoute>
      } />

      <Route path='/user/model-processing/:modelType' element={
        <ProtectedRoute>
          <ModelProcessing/>
        </ProtectedRoute>
      } />

      <Route path='/user/mri-processing' element={
        <ProtectedRoute>
          <MRIProcessing/>
        </ProtectedRoute>
      } />

    </Routes>

      
    
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  );
}

export default App;
