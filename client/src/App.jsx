import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home.jsx'
import Auth from './pages/Auth.jsx'
import { useEffect } from 'react'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { setUserData } from './redux/userSlice.js'
import InterviewPage from './pages/InterviewPage.jsx'
import InterviewHistory from './pages/InterviewHistory.jsx'
import InterviewReport from './pages/InterviewReport.jsx'
import Pricing from './pages/Pricing.jsx'

export const serverURL = "https://interviewplatform-vc6f.onrender.com"

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
        <Route path="/interview" element={<InterviewPage />} />
        <Route path="/history" element={<InterviewHistory />} />
        <Route path="/pricing" element={<Pricing /> }/>
        <Route path="/report/:id" element={<InterviewReport />} />
      </Routes>
  )
}

export default App
