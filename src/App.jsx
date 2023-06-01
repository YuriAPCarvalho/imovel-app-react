import Navbar from './components/navbar'
import Home from './pages/Home'
import '@fortawesome/fontawesome-free/css/all.css';
import { Routes, Route } from 'react-router-dom'

import ListaProprietario from './pages/lista/ListaProprietario'
import CadastroProprietario from './pages/cadastro/CadastroProprietario'
import EditarProprietario from './pages/editar/editarProprietario'

import ListaImobiliaria from './pages/lista/ListaImobiliaria'
import CadastroImobiliaria from './pages/cadastro/CadastroImobiliaria'
import EditarImobiliaria from './pages/editar/EditarImobiliaria'

import ListaContrato from './pages/lista/ListaContrato'
import CadastroContrato from './pages/cadastro/CadastroContrato'
import EditarContrato from './pages/editar/EditarContrato'

import ListaImovel from './pages/lista/ListaImovel'
import CadastroImovel from './pages/cadastro/CadastroImovel'
import EditarImovel from './pages/editar/EditarImovel'

import ListaInquilino from './pages/lista/ListaInquilino'
import CadastroInquilino from './pages/cadastro/CadastroInquilino'
import EditarInquilino from './pages/editar/EditarInquilino'


function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />

        <Route path='/ListaProprietario' element={<ListaProprietario />} />
        <Route path='/CadastroProprietario' element={<CadastroProprietario />} />
        <Route path='/EditarProprietario/:id' element={<EditarProprietario />} />

        <Route path='/ListaImobiliaria' element={<ListaImobiliaria />} />
        <Route path='/CadastroImobiliaria' element={<CadastroImobiliaria />} />
        <Route path='/EditarImobiliaria/:id' element={<EditarImobiliaria />} />

        <Route path='/ListaContrato' element={<ListaContrato />} />
        <Route path='/CadastroContrato' element={<CadastroContrato />} />
        <Route path='/EditarContrato/:id' element={<EditarContrato />} />

        <Route path='/ListaImovel' element={<ListaImovel />} />
        <Route path='/CadastroImovel' element={<CadastroImovel />} />
        <Route path='/EditarImovel/:id' element={<EditarImovel />} />

        <Route path='/ListaInquilino' element={<ListaInquilino />} />
        <Route path='/CadastroInquilino' element={<CadastroInquilino />} />
        <Route path='/EditarInquilino/:id' element={<EditarInquilino />} />
      </Routes>
    </>
  )
}

export default App
