import NavBar from './NavBar.jsx'
import Home from './Home.jsx'
import About from './About.jsx'
import { Routes, Route } from 'react-router-dom'

function App() {
  return (
    <div>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </div>
  )
}

export default App
