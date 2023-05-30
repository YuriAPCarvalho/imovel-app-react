import Navbar from './components/navbar'
import Home from './pages/Home'
import About from './pages/About'
import Profile from './pages/Profile'
import CadastroProprietario from './pages/proprietario/CadastroProprietario'
import { Routes, Route } from 'react-router-dom'

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/cadastroProprietario' element={<CadastroProprietario />} />
      </Routes>
    </>
  )
}

export default App
