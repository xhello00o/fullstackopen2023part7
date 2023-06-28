import { useState } from 'react'
import {Routes,Route,useMatch, useNavigate } from 'react-router-dom'

import About from './components/About'
import AnecdoteList from './components/AnecdoteList'
import Menu from './components/Menu'
import Footer from './components/Footer'
import CreateNew from './components/CreateNew'
import Anecdote from './components/Anecdote'











const App = () => {
  const navigate = useNavigate()
  const [anecdotes, setAnecdotes] = useState([
    {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: 1
    },
    {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: 2
    }
  ])

  const [notification, setNotification] = useState('')

  const addNew = (anecdote) => {
    anecdote.id = Math.round(Math.random() * 10000)
    setAnecdotes(anecdotes.concat(anecdote))
    navigate('/')
    setNotification(`you have created ${anecdote.content} by ${anecdote.author}`)
    setTimeout(() => {
      setNotification('')
      
    }, 5000);
  }

  const anecdoteById = (id) =>
    anecdotes.find(a => a.id === id)

  const vote = (id) => {
    const anecdote = anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    setAnecdotes(anecdotes.map(a => a.id === id ? voted : a))
  }

  const match = useMatch('/anecdotes/:id')
  const anecdote = match 
  ? anecdotes.find(anecdote => anecdote.id === Number(match.params.id))
  : null


  return (
    
      <div>
      <h1>Software anecdotes</h1>
      <Menu />
      {(notification==='')?
      null
      :<p>{notification}</p>
      }
      
      <Routes>
        <Route path='/anecdotes/:id' element={<Anecdote anecdote={anecdote}/>}/>
        <Route path='/' element={<AnecdoteList anecdotes={anecdotes} />}/>
        <Route path='/create' element={<CreateNew addNew={addNew} />}/>
        <Route path='/about' element={<About />}/>      
      </Routes>
      
      <Footer />
    </div>
    
  )
}

export default App
