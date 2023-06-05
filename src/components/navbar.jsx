import { Navbar as BootstrapNavbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";

export default function CustomNavbar() {
  return (
    <BootstrapNavbar bg="dark" variant="dark" expand="lg" fixed="top">
      <BootstrapNavbar.Brand>Imobiliária</BootstrapNavbar.Brand>
      <BootstrapNavbar.Toggle aria-controls="navbarNav" />
      <BootstrapNavbar.Collapse id="navbarNav">
        <Nav className="mr-auto">
          <Nav.Link as={Link} to="/">
            Visitas
          </Nav.Link>
          <Nav.Link as={Link} to="/ListaProprietario">
            Proprietários
          </Nav.Link>
          <Nav.Link as={Link} to="/ListaImobiliaria">
            Imobiliárias
          </Nav.Link>
          <Nav.Link as={Link} to="/ListaImovel">
            Imóveis
          </Nav.Link>
          <Nav.Link as={Link} to="/ListaInquilino">
            Inquilínos
          </Nav.Link>
          <Nav.Link as={Link} to="/ListaContrato">
            Contratos
          </Nav.Link>
          <Nav.Link as={Link} to="/ListaManutencao">
            Manutenção
          </Nav.Link>
          <Nav.Link as={Link} to="/ListaAvaliacao">
            Avaliação
          </Nav.Link>
        </Nav>
        <Nav className="navbar-nav ms-auto">
          <Nav.Link as="a" href="#" className="nav-link ml-auto">
            Sair
          </Nav.Link>
        </Nav>
      </BootstrapNavbar.Collapse>
    </BootstrapNavbar>
  );
}
