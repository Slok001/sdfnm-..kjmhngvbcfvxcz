import React from 'react'
import { Link } from 'react-router-dom'
import { Brain } from 'lucide-react'

const Welcome: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center">
      <Brain className="w-24 h-24 mb-8 text-yellow-300" />
      <h1 className="text-5xl font-bold mb-4">Welcome to QuizMaster</h1>
      <p className="text-xl mb-8">Challenge your mind with our exciting quizzes!</p>
      <div className="space-x-4">
        <Link
          to="/login"
          className="bg-white text-blue-600 px-6 py-3 rounded-full text-xl font-semibold hover:bg-blue-100 transition duration-300"
        >
          Login
        </Link>
        <Link
          to="/signup"
          className="bg-yellow-400 text-blue-800 px-6 py-3 rounded-full text-xl font-semibold hover:bg-yellow-300 transition duration-300"
        >
          Sign Up
        </Link>
      </div>
    </div>
  )
}

export default Welcome