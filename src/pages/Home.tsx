import React from 'react'
import { Link } from 'react-router-dom'
import { Play, User, Share2 } from 'lucide-react'

const subjects = [
  { name: 'Math', icon: '➗' },
  { name: 'Science', icon: '🧪' },
  { name: 'History', icon: '🏛️' },
  { name: 'Geography', icon: '🌍' },
  { name: 'Literature', icon: '📚' },
  { name: 'General Knowledge', icon: '🧠' },
]

const Home: React.FC = () => {
  const user = JSON.parse(localStorage.getItem('user') || '{}')
  const highScore = localStorage.getItem('highScore') || '0'

  const shareScore = () => {
    if (navigator.share) {
      navigator.share({
        title: 'My QuizMaster High Score',
        text: `I scored ${highScore} points in QuizMaster! Can you beat my score?`,
        url: window.location.origin,
      })
    } else {
      alert(`My QuizMaster High Score: ${highScore} points!`)
    }
  }

  return (
    <div className="text-center p-4 animate-fade-in">
      <h1 className="text-4xl font-bold mb-8 text-white">Welcome, {user.name}!</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto mb-8">
        {subjects.map((subject) => (
          <Link
            key={subject.name}
            to={`/quiz-setup/${subject.name.toLowerCase()}`}
            className="bg-white text-blue-600 p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300 transform hover:scale-105 flex flex-col items-center"
          >
            <span className="text-4xl mb-2">{subject.icon}</span>
            <span className="text-xl font-semibold">{subject.name}</span>
          </Link>
        ))}
      </div>
      <div className="flex justify-center space-x-4">
        <Link
          to="/profile"
          className="bg-purple-600 text-white p-4 rounded-lg shadow-lg hover:bg-purple-700 transition duration-300 flex items-center"
        >
          <User className="w-6 h-6 mr-2" />
          <span>Profile</span>
        </Link>
        <button
          onClick={shareScore}
          className="bg-green-600 text-white p-4 rounded-lg shadow-lg hover:bg-green-700 transition duration-300 flex items-center"
        >
          <Share2 className="w-6 h-6 mr-2" />
          <span>Share High Score</span>
        </button>
      </div>
    </div>
  )
}

export default Home