// CSS
import './startpage.css'

// Packages
import React from 'react'

// Functions
import OpenTriviaDB from './OpenTriviaDB.js'

// Context
import context from '../../context.js'

// MUI
import Box from '@mui/material/Box'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'


const Selection = () => {
  // Refs
  const { no, setNo, questions, setQuestions, page, setPage } = React.useContext(context)  

  // States  
  const [category, setCategory] = React.useState(9)
  const [difficulty, setDifficulty] = React.useState('easy')

  const handleStart = async (e) => {
    e.preventDefault()
    const data = await OpenTriviaDB({
      no,
      category,
      difficulty
    })

    setPage('quiz')
    setQuestions(previous => [...previous, ...data])
  }

  const changeNo = (e) => {
    setNo(Number(e.target.value))
  }

  const changeCategory = (e) => {
    setCategory(e.target.value)
  }

  const changeDifficulty = (e) => {
    setDifficulty(e.target.value)
  }

  const categories = [
    { name: 'General Knowledge', value: 9 },
    { name: 'Music', value: 12 },
    { name: 'Science and Nature', value: 17 },
    { name: 'Celebrities', value: 26 },
    { name: 'Games', value: 15 }
  ]

  return (
    <>
      <h1>Selection</h1>
      <div className="selection" style={{ borderColor: `#${Math.floor(Math.random()*16777215).toString()}` }}>
        <Box
          sx={{
            display: 'flex',
            gap: 3,
            flexWrap: 'wrap',
            justifyContent: 'center',
            marginTop: 4,
          }}
        >
          {[
            { label: 'No of Questions', value: no, onChange: changeNo, items: Array.from({ length: 50 }, (_, i) => ({ value: i + 1, label: i + 1 })) },
            { label: 'Category', value: category, onChange: changeCategory, items: categories.map(cat => ({ value: cat.value, label: cat.name })) },
            {
              label: 'Difficulty',
              value: difficulty,
              onChange: changeDifficulty,
              items: [
                { value: 'easy', label: '😎 Easy' },
                { value: 'medium', label: '🤔 Medium' },
                { value: 'hard', label: '😤 Hard' },
              ],
            },
          ].map((selectBox, idx) => (
            <Box
              key={idx}
              sx={{
                minWidth: 250,
                background: `linear-gradient(135deg, #${Math.floor(Math.random()*16777215).toString(16)} 30%, #${Math.floor(Math.random()*16777215).toString(16)} 90%)`,
                borderRadius: 3,
                boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
                p: 2,
                transform: 'rotate(-1deg)',
                transition: '0.3s',
                '&:hover': {
                  transform: 'rotate(1deg) scale(1.03)',
                },
              }}
            >
              <FormControl fullWidth>
                <InputLabel sx={{ color: 'white' }}>{selectBox.label}</InputLabel>
                <Select
                  value={selectBox.value}
                  label={selectBox.label}
                  onChange={selectBox.onChange}
                  sx={{
                    color: 'white',
                    backgroundColor: 'rgba(0,0,0,0.1)',
                    borderRadius: 2,
                    '& .MuiSvgIcon-root': { color: 'white' },
                  }}
                >
                  {selectBox.items.map((item, i) => (
                    <MenuItem key={i} value={item.value}>
                      {item.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          ))}
        </Box>

      </div>

      <button onClick={handleStart} className="button-54" role="button">Continue</button>
    </>
  )
}

export default Selection
