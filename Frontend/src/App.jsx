import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Homepage from './components/authPages/Homepage'
import RegisterPage from './components/authPages/RegisterPage'
import Nav from './components/navbar/Nav'
import LoginPage from './components/authPages/LoginPage'
import Dashboard from './components/pages/Dashboard'
import CreateTask from './components/taskPages/CreateTask'
import ProtectedRoute from './components/authPages/ProtectedRoute'
import TaskDetail from './components/taskPages/TaskDetail'


const App = () => {
  return (
    <>
    <Nav/>
    <Routes>
       
       <Route path="/" element={<Homepage/>} />
       <Route path="/register" element={<RegisterPage/>} />
       <Route path="/login" element={<LoginPage/>} />
       <Route 
         path="/dashboard"  
         element={
          <ProtectedRoute>
            <Dashboard/>
          </ProtectedRoute>
        } 
        />
        
       <Route path="/createTask" 
       element={
        <ProtectedRoute>
          <CreateTask/>
        </ProtectedRoute>
        } 
       />

       <Route 
         path="/task/:id"  
         element={
          <ProtectedRoute>
            <TaskDetail/>
          </ProtectedRoute>
        } 
        />

    </Routes>
    </>
  )
}

export default App