import React from 'react'
import RegistrationForm from './components/RegistrationForm'
import {  Route, Routes } from 'react-router-dom'
import UserProfileFOrm from './components/UserProfileFOrm'

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<RegistrationForm/>}/>
      <Route path='/users/:userId' element={<UserProfileFOrm/>}/>
    </Routes>
  )
}

export default App
