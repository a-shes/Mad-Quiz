const OpenTriviaDB = async ({ no, category, difficulty, type='multiple' }) => {
  try {
    let URL
    if (no && no > 1) {
      URL = `https://opentdb.com/api.php?amount=${no}`
    } else {
      URL = 'https://opentdb.com/api.php?amount=10'
    }
    
    if (category && typeof category === 'number') {
      URL = URL + `&category=${category}`
    }
    
    if (difficulty && difficulty == 'easy' || difficulty == 'medium' || difficulty == 'hard') {
      URL = URL + `&difficulty=${difficulty}`
    }
    
    const response = await fetch(URL)
    const data = await response.json()
    
    return [...data.results]
  } catch (err) {
    if (err) {
      return []
    }
  }
}

export default OpenTriviaDB
