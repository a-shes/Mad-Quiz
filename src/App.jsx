// Packages
import React from 'react'

// CSS
import './App.css'

// Components
import StartPage from './components/StartPage/StartPage'
import Selection from './components/StartPage/Selection'
import Quiz from './components/Quiz/Quiz'

// Context
import context from './context'


function App() {
  // States
  const [questions, setQuestions] = React.useState([])
  const [page, setPage] = React.useState('start')
  const [no, setNo] = React.useState(10)

  return (
    <context.Provider value={{ no, setNo, questions, setQuestions, page, setPage }}>
      <div id='game'>
        {page == 'start' && <StartPage></StartPage>}
        {page == 'selection' && <Selection></Selection>}
        {page == 'quiz' && <Quiz></Quiz>}
      </div>
    </context.Provider>
  )
}

export default App
