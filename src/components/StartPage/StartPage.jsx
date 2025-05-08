// Packages
import React, { useContext } from 'react'

// CSS
import './startpage.css'

// Context
import context from '../../context.js'


const StartPage = () => {
  const { page, setPage } = useContext(context)

  return (
    <>
      <h1>Start Quiz</h1>
      <button className="button-89" role="button" onClick={() => setPage('selection')}>
        Start Game
      </button>
    </>
  )
}

export default StartPage
