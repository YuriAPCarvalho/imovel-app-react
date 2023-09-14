import { Navbar as BootstrapNavbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import { useAuth } from "../contexts/auth";

export default function CustomNavbar() {
  const { user, signout } = useAuth();

  const renderDynamicNavLinks = () => {
    if (!user.perfil) {
      return null;
    }
  
    const allowedLinks = {
      ADMINISTRADOR: ["Visita", "Proprietario", "Imobiliaria", "Imovel", "Inquilino", "Contrato", "Manutencao", "Avaliacao", "Usuario", "Perfil"],
      CLIENTE: ["Visita", "Avaliacao"],
      OPERADOR: ["Visita", "Proprietario", "Imobiliaria", "Imovel", "Inquilino", "Contrato", "Manutencao", "Avaliacao"]
    };
  
    const allowedLinksForProfile = allowedLinks[user.perfil] || [];
  
    const dynamicNavLinks = allowedLinksForProfile.map((link) => (
      <Nav.Link as={Link} to={`/Lista${link}`} key={link}>
        {link}
      </Nav.Link>
    ));
  
  
    return dynamicNavLinks;
  };
  

  return (
    <BootstrapNavbar bg="dark" variant="dark" expand="lg" fixed="top">
      <BootstrapNavbar.Brand>Imobiliária</BootstrapNavbar.Brand>
      <BootstrapNavbar.Toggle aria-controls="navbarNav" />
      <BootstrapNavbar.Collapse id="navbarNav">
        <Nav className="mr-auto">{renderDynamicNavLinks()}</Nav>
        <Nav className="navbar-nav ms-auto">
          <Nav.Link
            as="a"
            href="/"
            onClick={() => signout()}
            className="nav-link ml-auto"
          >
            Sair
          </Nav.Link>
        </Nav>
      </BootstrapNavbar.Collapse>
    </BootstrapNavbar>
  );
}

