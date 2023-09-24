import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from './Components/Home';
import NavScrollExample from './Components/Navbar';
import About from './Components/About';
import Notestate from './Context/Notes/notestate';
import "./App.css"
import Login from './Components/Login';
import Signup from './Components/Signup';

function App() {
  const [count, setCount] = useState(0)

  return (
    <Notestate>
    <BrowserRouter>
    <NavScrollExample/>
    <Routes>
    <Route path="/" element={<Home />}></Route>
    <Route path="/about" element={<About />}></Route>
    <Route path="/login" element={<Login />}></Route>
    <Route path="/signup" element={<Signup />}></Route>
    </Routes>
  </BrowserRouter>
  </Notestate>
  )
}

export default App
