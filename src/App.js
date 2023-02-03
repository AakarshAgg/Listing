import React from 'react'
import "./App.css"
import Home from './components/Home'
import {
  Routes,
  Route,
  } from "react-router-dom"
  import Showdetails from './components/Showdetails'

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home/>}/>
          <Route path="/:userId" element={<Showdetails/>}/>
      </Routes>
      
    </div>
  )
}

export default App