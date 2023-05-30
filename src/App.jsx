import Navbar from './components/navbar'
import Home from './pages/Home'
import About from './pages/About'
import Profile from './pages/Profile'
import CadastroProprietario from './pages/cadastro/CadastroProprietario'
import CadastroImobiliaria from './pages/cadastro/CadastroImobiliaria'
import CadastroContrato from './pages/cadastro/CadastroContrato'
import CadastroImovel from './pages/cadastro/CadastroImovel'
import CadastroInquilino from './pages/cadastro/CadastroInquilino'
import { Routes, Route } from 'react-router-dom'

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/CadastroProprietario' element={<CadastroProprietario />} />
        <Route path='/CadastroImobiliaria' element={<CadastroImobiliaria />} />
        <Route path='/CadastroContrato' element={<CadastroContrato />} />
        <Route path='/CadastroImovel' element={<CadastroImovel />} />
        <Route path='/CadastroInquilino' element={<CadastroInquilino />} />
      </Routes>
    </>
  )
}

export default App
