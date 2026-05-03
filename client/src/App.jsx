import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home.jsx'
import Auth from './pages/Auth.jsx'
import { useEffect } from 'react'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { setUserData } from './redux/userSlice.js'

export const serverURL = "http://localhost:8000"

const App = () => {

  const dispatch = useDispatch();

  useEffect(() => {

    const getUser = async () => {
        try {
          const res = await axios.get(serverURL + "/api/user/current-user", {
            withCredentials: true,
          })
          dispatch(setUserData(res.data));
        } catch (error) {
          console.error("Error fetching current user:", error);
          dispatch(setUserData(null));
        }
    }

    getUser();

  }, [dispatch])

  return (
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/auth' element={<Auth />} />
      </Routes>
  )
}

export default App