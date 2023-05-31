import Navbar from './components/navbar'
import Home from './pages/Home'
import About from './pages/About'
import Profile from './pages/Profile'
import '@fortawesome/fontawesome-free/css/all.css';
import ListaProprietario from './pages/lista/ListaProprietario'
import CadastroProprietario from './pages/cadastro/CadastroProprietario'
import EditarProprietario from './pages/editar/editarProprietario'
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
        <Route path='/ListaProprietario' element={<ListaProprietario />} />
        <Route path='/CadastroProprietario' element={<CadastroProprietario />} />
        <Route path='/EditarProprietario/:id' element={<EditarProprietario />} />
        <Route path='/CadastroImobiliaria' element={<CadastroImobiliaria />} />
        <Route path='/CadastroContrato' element={<CadastroContrato />} />
        <Route path='/CadastroImovel' element={<CadastroImovel />} />
        <Route path='/CadastroInquilino' element={<CadastroInquilino />} />
      </Routes>
    </>
  )
}

export default App
