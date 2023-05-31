import { Link, useMatch, useResolvedPath } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';

export default function Navbar() {
  return (
    <nav className='navbar navbar-expand-lg navbar-dark bg-dark fixed-top'>
      <h3 className="navbar-brand">Imobiliária</h3>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav"
      aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNav">
    <ul className="navbar-nav mr-auto">
    <li className="nav-item">
          <Link className="nav-link" to="/">Home</Link>
        </li>
        <li className="nav-item dropdown">
          <a className="nav-link dropdown-toggle" href="#" id="navbarScrollingDropdown" role="button"
            data-bs-toggle="dropdown" aria-expanded="false">
            Cadastro
          </a>
          <ul className="dropdown-menu" aria-labelledby="navbarScrollingDropdown">
            <li><Link className="dropdown-item" to="/ListaProprietario">Proprietario</Link></li>
            <li><Link className="dropdown-item" to="/CadastroImobiliaria">Imobiliária</Link></li>
            <li><Link className="dropdown-item" to="/CadastroContrato">Contrato</Link></li>
            <li><Link className="dropdown-item" to="/CadastroImovel">Imóvel</Link></li>
            <li><Link className="dropdown-item" to="/CadastroInquilino">Inquilino</Link></li>
          </ul>
        </li>
      </ul>
      <ul className="navbar-nav ms-auto">
        <li className="nav-item">
          <a className="nav-link" href="#">Sair</a>
        </li>
    </ul>
    </div>
    </nav>
  )
}

function CustomLink({ to, children, ...props }) {
  const resolvedPath = useResolvedPath(to)
  const isActive = useMatch({ path: resolvedPath.pathname, end: true })

  return (
    <li className={isActive ? 'active' : ''}>
      <Link to={to} {...props}>
        {children}
      </Link>
    </li>
  )
}
