import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from './Components/Home';
import NavScrollExample from './Components/Navbar';
import About from './Components/About';
import Notestate from './Context/Notes/notestate';

function App() {
  const [count, setCount] = useState(0)

  return (
    <Notestate>
    <BrowserRouter>
    <NavScrollExample/>
    <Routes>
    <Route path="/" element={<Home />}></Route>
    <Route path="/about" element={<About />}></Route>
    </Routes>
  </BrowserRouter>
  </Notestate>
  )
}

export default App
