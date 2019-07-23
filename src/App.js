import React from 'react'
import Main from './components/Main'
import Form from './components/Form'
import subjectCode from './data/subjectCode.json'
import './App.css'

function App() {

  const schedule = JSON.parse(window.localStorage.getItem('schedule'))

  if (schedule === null) {
    return (
      <Form />
    )
  }
  else {
    return (
      <Main
        schedule={schedule}
        subjectCode={subjectCode}
      />
    )
  }

}

export default App
