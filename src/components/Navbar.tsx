import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Home, User, LogOut } from 'lucide-react'

const Navbar: React.FC = () => {
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem('user')
    navigate('/login')
  }

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-6 py-3">
        <div className="flex justify-between items-center">
          <Link to="/home" className="text-2xl font-bold text-blue-600 flex items-center">
            <Home className="mr-2" /> QuizMaster
          </Link>
          <div className="space-x-4">
            <Link to="/profile" className="text-gray-700 hover:text-blue-600 transition duration-300">
              <User className="inline-block mr-1" /> Profile
            </Link>
            <button onClick={handleLogout} className="text-gray-700 hover:text-red-600 transition duration-300">
              <LogOut className="inline-block mr-1" /> Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar