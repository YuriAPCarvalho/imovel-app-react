import { Navbar as BootstrapNavbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import { useAuth } from "../contexts/auth";

export default function CustomNavbar() {
  const { user, perfil, signout } = useAuth();

  console.log("Perfil do usuário:", user ? user.perfil : null);

  const renderDynamicNavLinks = () => {
    if (!user || !perfil) {
      return null;
    }

    const {
      visitas,
      proprietarios,
      imobiliarias,
      imoveis,
      inquilinos,
      contratos,
      manutencao,
      avaliacao,
      usuarios,
      perfil: perfilEnabled,
    } = perfil;

    return (
      <>
        {visitas && (
          <Nav.Link as={Link} to="/ListaVisita">
            Visitas
          </Nav.Link>
        )}
        {proprietarios && (
          <Nav.Link as={Link} to="/ListaProprietario">
            Proprietários
          </Nav.Link>
        )}
        {imobiliarias && (
          <Nav.Link as={Link} to="/ListaImobiliaria">
            Imobiliárias
          </Nav.Link>
        )}
        {imoveis && (
          <Nav.Link as={Link} to="/ListaImovel">
            Imóveis
          </Nav.Link>
        )}
        {inquilinos && (
          <Nav.Link as={Link} to="/ListaInquilino">
            Inquilínos
          </Nav.Link>
        )}
        {contratos && (
          <Nav.Link as={Link} to="/ListaContrato">
            Contratos
          </Nav.Link>
        )}
        {manutencao && (
          <Nav.Link as={Link} to="/ListaManutencao">
            Manutenção
          </Nav.Link>
        )}
        {avaliacao && (
          <Nav.Link as={Link} to="/ListaAvaliacao">
            Avaliação
          </Nav.Link>
        )}
        {usuarios && (
          <Nav.Link as={Link} to="/ListaUsuario">
            Usuários
          </Nav.Link>
        )}
        {perfilEnabled && (
          <Nav.Link as={Link} to="/ListaPerfil">
            Perfil
          </Nav.Link>
        )}
      </>
    );
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
