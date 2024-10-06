import React from 'react'
import { useLocation, Link } from 'react-router-dom'
import { Trophy, RefreshCw, Home, Share2 } from 'lucide-react'

const Result: React.FC = () => {
  const location = useLocation()
  const { score } = location.state as { score: number }

  const shareScore = () => {
    if (navigator.share) {
      navigator.share({
        title: 'My QuizMaster Score',
        text: `I scored ${score} points in QuizMaster! Can you beat my score?`,
        url: window.location.origin,
      })
    } else {
      alert(`My QuizMaster Score: ${score} points!`)
    }
  }

  return (
    <div className="text-center animate-fade-in">
      <h2 className="text-3xl font-bold mb-6 text-white">Quiz Result</h2>
      <div className="bg-white p-8 rounded-lg shadow-lg inline-block">
        <Trophy className="text-yellow-500 w-24 h-24 mx-auto mb-4" />
        <p className="text-4xl font-bold mb-2 text-blue-600">{score} Points</p>
        <p className="text-2xl font-semibold mb-4 text-gray-700">Great job!</p>
        <div className="space-y-4">
          <button
            onClick={shareScore}
            className="w-full bg-green-600 text-white px-6 py-3 rounded-lg text-xl font-semibold hover:bg-green-700 transition duration-300 flex items-center justify-center"
          >
            <Share2 className="mr-2" /> Share Score
          </button>
          <Link
            to="/quiz"
            className="block w-full bg-blue-600 text-white px-6 py-3 rounded-lg text-xl font-semibold hover:bg-blue-700 transition duration-300 flex items-center justify-center"
          >
            <RefreshCw className="mr-2" /> Play Again
          </Link>
          <Link
            to="/home"
            className="block w-full bg-purple-600 text-white px-6 py-3 rounded-lg text-xl font-semibold hover:bg-purple-700 transition duration-300 flex items-center justify-center"
          >
            <Home className="mr-2" /> Back to Home
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Result