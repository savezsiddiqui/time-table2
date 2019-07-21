import React from 'react'
import Main from './components/Main'
import schedule from './data/myclasses.json'
import myclasses from './data/classes.json'
import './App.css'

function App() {
  return (
    <Main
      schedule={schedule}
      myclasses={myclasses}
    />
  )
}

export default App
