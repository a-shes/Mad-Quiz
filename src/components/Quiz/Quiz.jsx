// Packages
import React, { useEffect, useState, useContext, useMemo } from 'react'
import he from 'he'

// CSS
import './quiz.css'

// Context
import context from '../../context'

const Quiz = () => {
  const { questions } = useContext(context)

  // States
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [questionsArray, setQArray] = useState([])
  const [selectedAnswer, setSelectedAnswer] = useState(null)
  const [score, setScore] = useState(0)
  const [streak, setStreak] = useState(0)
  const [xp, setXp] = useState(0)

  // Transform questions on load
  useEffect(() => {
    if (!questions.length) return

    const shuffle = (arr) => arr.sort(() => Math.random() - 0.5)
    const transformed = questions.map((q) => ({
      type: q.type,
      difficulty: q.difficulty,
      question: q.question,
      answers: shuffle([...q.incorrect_answers, q.correct_answer]),
      correct_answer: q.correct_answer,
    }))
    setQArray(transformed)
  }, [questions])

  // Random gradient
  const getGradient = useMemo(() => {
    return () =>
      `linear-gradient(135deg, #${Math.floor(Math.random() * 16777215).toString(
        16
      )} 30%, #${Math.floor(Math.random() * 16777215).toString(16)} 90%)`
  }, [])

  const handleAnswerClick = (answer, e) => {
    e.preventDefault()
    let answerIndicator
    setSelectedAnswer(answer)
    const correct = questionsArray[currentQuestion].correct_answer
    if (answer === correct) {
      setScore(score + 10)
      setStreak(streak + 1)
      setXp(xp + 20)
      answerIndicator = 'green'
    } else {
      setStreak(0)
      answerIndicator = 'red'
    }    
    e.target.style.outlineColor = answerIndicator 
    // Move to next question after delay
    setTimeout(() => {
      setSelectedAnswer(null)
      setCurrentQuestion((prev) => prev + 1)
    }, 1000)
  }

  if (!questionsArray.length || !questionsArray[currentQuestion])
    return <div className="quiz-container">Loading...</div>

  return (
    <div className="quiz-container">
      {/* Header */}
      <div className="quiz-header">
        <div>
          🔥 Streak: <strong>{streak}</strong>
        </div>
        <div>
          ⭐ Score: <strong>{score}</strong>
        </div>
        <div>
          ⚡ XP: <strong>{xp}</strong>
        </div>
      </div>

      {/* Question */}
      <div className="question-box">
        <h2>{he.decode(questionsArray[currentQuestion].question)}</h2>
      </div>

      {/* Answer Options */}
      <div className="options">
        {questionsArray[currentQuestion].answers.map((answer, i) => (
          <button
            key={answer}
            className={`option-button ${
              selectedAnswer === answer
                ? answer === questionsArray[currentQuestion].correct_answer
                  ? 'correct'
                  : 'wrong'
                : ''
            }`}
            style={{ background: getGradient() }}
            onClick={(e) => handleAnswerClick(answer, e)}
            disabled={!!selectedAnswer}
          >
            {String.fromCharCode(65 + i)}. {he.decode(answer)}
          </button>
        ))}
      </div>

      {/* Progress + Timer */}
      <div className="quiz-footer">
        <div className="progress">
          Question <span>{currentQuestion + 1}</span> of{' '}
          <span>{questions.length}</span>
        </div>
        <div className="timer">⏱️ 06s</div>
      </div>
    </div>
  )
}

export default Quiz
