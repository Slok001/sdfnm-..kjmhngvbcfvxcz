import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Clock, HelpCircle, CheckCircle, XCircle } from 'lucide-react'

interface Question {
  question: string
  options: string[]
  correctAnswer: number
}

const API_KEY = 'AIzaSyBs8VIj2Y0smjU4OtJDPFUBVV1mmHOWYgQ'

const fetchQuestion = async (subject: string, difficulty: string): Promise<Question> => {
  try {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: `Generate a multiple-choice question about ${subject} with ${difficulty} difficulty. Provide the question, four options, and the index of the correct answer (0-3). Format the response as a JSON object with keys: question, options (array), and correctAnswer (number 0-3).`
          }]
        }]
      })
    })

    const data = await response.json()
    const generatedContent = JSON.parse(data.candidates[0].content.parts[0].text)
    return generatedContent
  } catch (error) {
    console.error('Error fetching question:', error)
    return {
      question: `Sample ${subject} question (${difficulty})`,
      options: ['Option 1', 'Option 2', 'Option 3', 'Option 4'],
      correctAnswer: 0,
    }
  }
}

const Quiz: React.FC = () => {
  const { subject, difficulty } = useParams<{ subject: string; difficulty: string }>()
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null)
  const [score, setScore] = useState(0)
  const [timeLeft, setTimeLeft] = useState(10)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [isAnswerRevealed, setIsAnswerRevealed] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    generateNewQuestion()
  }, [subject, difficulty])

  useEffect(() => {
    if (timeLeft > 0 && !isAnswerRevealed) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000)
      return () => clearTimeout(timer)
    } else if (timeLeft === 0 && !isAnswerRevealed) {
      revealAnswer()
    }
  }, [timeLeft, isAnswerRevealed])

  const generateNewQuestion = async () => {
    const newQuestion = await fetchQuestion(subject || 'general', difficulty || 'medium')
    setCurrentQuestion(newQuestion)
    setTimeLeft(10)
    setSelectedAnswer(null)
    setIsAnswerRevealed(false)
  }

  const handleAnswer = (selectedIndex: number) => {
    if (isAnswerRevealed) return
    setSelectedAnswer(selectedIndex)
    revealAnswer()
  }

  const revealAnswer = () => {
    setIsAnswerRevealed(true)
    if (selectedAnswer === currentQuestion?.correctAnswer) {
      setScore(score + 1)
    }
    setTimeout(nextQuestion, 2000)
  }

  const nextQuestion = () => {
    const highScore = parseInt(localStorage.getItem('highScore') || '0')
    if (score > highScore) {
      localStorage.setItem('highScore', score.toString())
    }
    generateNewQuestion()
  }

  const endQuiz = () => {
    navigate('/result', { state: { score } })
  }

  if (!currentQuestion) return null

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-6 m-4 animate-fade-in">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Score: {score}</h2>
        <div className="flex items-center text-xl font-semibold text-red-600">
          <Clock className="mr-2" /> {timeLeft}s
        </div>
      </div>
      <div className="mb-6">
        <h3 className="text-xl mb-4 text-gray-700 flex items-center">
          <HelpCircle className="mr-2 text-blue-600" />
          {currentQuestion.question}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {currentQuestion.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswer(index)}
              className={`p-3 border rounded-lg transition duration-300 text-gray-700 flex items-center justify-between ${
                isAnswerRevealed
                  ? index === currentQuestion.correctAnswer
                    ? 'bg-green-100 border-green-500'
                    : selectedAnswer === index
                    ? 'bg-red-100 border-red-500'
                    : ''
                  : 'hover:bg-blue-100'
              }`}
              disabled={isAnswerRevealed}
            >
              <span>{option}</span>
              {isAnswerRevealed && index === currentQuestion.correctAnswer && (
                <CheckCircle className="text-green-500" />
              )}
              {isAnswerRevealed && selectedAnswer === index && index !== currentQuestion.correctAnswer && (
                <XCircle className="text-red-500" />
              )}
            </button>
          ))}
        </div>
      </div>
      <div className="flex justify-between">
        <button onClick={endQuiz} className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition duration-300">
          End Quiz
        </button>
        <button onClick={nextQuestion} className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-300">
          Next Question
        </button>
      </div>
    </div>
  )
}

export default Quiz