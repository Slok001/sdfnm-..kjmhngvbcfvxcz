import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'
import Welcome from './pages/Welcome'
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import QuizSetup from './pages/QuizSetup'
import Quiz from './pages/Quiz'
import Result from './pages/Result'
import Profile from './pages/Profile'
import Navbar from './components/Navbar'

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    const user = localStorage.getItem('user')
    if (user) {
      setIsLoggedIn(true)
    }
  }, [])

  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 text-white">
        {isLoggedIn && <Navbar />}
        <div className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Welcome />} />
            <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
            <Route path="/signup" element={<Signup />} />
            <Route
              path="/home"
              element={isLoggedIn ? <Home /> : <Navigate to="/login" />}
            />
            <Route
              path="/quiz-setup/:subject"
              element={isLoggedIn ? <QuizSetup /> : <Navigate to="/login" />}
            />
            <Route
              path="/quiz/:subject/:difficulty"
              element={isLoggedIn ? <Quiz /> : <Navigate to="/login" />}
            />
            <Route
              path="/result"
              element={isLoggedIn ? <Result /> : <Navigate to="/login" />}
            />
            <Route
              path="/profile"
              element={isLoggedIn ? <Profile /> : <Navigate to="/login" />}
            />
          </Routes>
        </div>
      </div>
    </Router>
  )
}

export default App