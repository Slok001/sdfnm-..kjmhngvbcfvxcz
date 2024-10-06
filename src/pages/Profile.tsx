import React from 'react'
import { User, Award, Clock } from 'lucide-react'

const Profile: React.FC = () => {
  const user = JSON.parse(localStorage.getItem('user') || '{}')
  const highScore = localStorage.getItem('highScore') || '0'

  return (
    <div className="max-w-2xl mx-auto animate-fade-in">
      <h2 className="text-3xl font-bold mb-6 text-center text-white">User Profile</h2>
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <div className="flex items-center mb-6">
          <User className="w-20 h-20 text-blue-600 mr-4" />
          <div>
            <h3 className="text-2xl font-semibold text-gray-800">{user.name}</h3>
            <p className="text-gray-600">{user.email}</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-blue-100 p-4 rounded-lg text-center">
            <Award className="w-10 h-10 text-blue-600 mx-auto mb-2" />
            <p className="text-2xl font-semibold text-gray-800">{highScore}</p>
            <p className="text-sm text-gray-600">High Score</p>
          </div>
          <div className="bg-green-100 p-4 rounded-lg text-center">
            <Clock className="w-10 h-10 text-green-600 mx-auto mb-2" />
            <p className="text-2xl font-semibold text-gray-800">10s</p>
            <p className="text-sm text-gray-600">Time per Question</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile