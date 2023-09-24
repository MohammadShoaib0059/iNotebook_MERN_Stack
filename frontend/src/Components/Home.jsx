import React from 'react'
import Notes from './Notes'
import AddNotes from './AddNotes'

const Home = () => {
  return (
    <div className='container'>
      <h1>Home</h1>
      <AddNotes/>
      <Notes/>
    </div>
  )
}

export default Home
