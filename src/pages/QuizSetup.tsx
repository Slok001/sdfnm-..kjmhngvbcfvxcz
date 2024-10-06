import React from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

const difficulties = ['Easy', 'Medium', 'Hard']

const QuizSetup: React.FC = () => {
  const { subject } = useParams<{ subject: string }>()
  const navigate = useNavigate()

  const handleDifficultySelect = (difficulty: string) => {
    navigate(`/quiz/${subject}/${difficulty.toLowerCase()}`)
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h2 className="text-4xl font-bold mb-8 text-white">Select Difficulty for {subject}</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {difficulties.map((difficulty) => (
          <button
            key={difficulty}
            onClick={() => handleDifficultySelect(difficulty)}
            className="bg-white text-blue-600 p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300 transform hover:scale-105 flex items-center justify-between"
          >
            <span className="text-xl font-semibold">{difficulty}</span>
            <ArrowRight className="w-6 h-6" />
          </button>
        ))}
      </div>
    </div>
  )
}

export default QuizSetup