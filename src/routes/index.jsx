import { Fragment } from "react";
import {
  BrowserRouter,
  Route,
  Routes,
  useLocation,
  Navigate,
} from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Signin from "../pages/Signin";
import Signup from "../pages/Signup";
import NavBar from "../components/navbar";

import ListaProprietario from "../pages/lista/ListaProprietario";
import CadastroProprietario from "../pages/cadastro/CadastroProprietario";
import EditarProprietario from "../pages/editar/editarProprietario";

import ListaImobiliaria from "../pages/lista/ListaImobiliaria";
import CadastroImobiliaria from "../pages/cadastro/CadastroImobiliaria";
import EditarImobiliaria from "../pages/editar/EditarImobiliaria";

import ListaContrato from "../pages/lista/ListaContrato";
import CadastroContrato from "../pages/cadastro/CadastroContrato";
import EditarContrato from "../pages/editar/EditarContrato";

import ListaImovel from "../pages/lista/ListaImovel";
import CadastroImovel from "../pages/cadastro/CadastroImovel";
import EditarImovel from "../pages/editar/EditarImovel";

import ListaInquilino from "../pages/lista/ListaInquilino";
import CadastroInquilino from "../pages/cadastro/CadastroInquilino";
import EditarInquilino from "../pages/editar/EditarInquilino";

import ListaManutencao from "../pages/lista/ListaManutencao";
import CadastroManutencao from "../pages/cadastro/CadastroManutencao";
import EditarManutencao from "../pages/editar/EditarManutencao";

import ListaVisita from "../pages/lista/ListaVisita";
import CadastroVisita from "../pages/cadastro/CadastroVisita";
import CadastroAvaliacao from "../pages/cadastro/CadastroAvaliacao";

const Private = ({ Item }) => {
  const { signed } = useAuth();

  return signed > 0 ? <Item /> : <Navigate to="/signin" />;
};

const AppContent = () => {
  const location = useLocation();
  const isLoginPage = location.pathname === "/";

  return (
    <Fragment>
      {!isLoginPage && <NavBar />}
      <Routes>
        <Route path="/" element={<Signin />} />
        <Route exact path="/signup" element={<Signup />} />
        <Route
          exact
          path="/ListaProprietario"
          element={<Private Item={ListaProprietario} />}
        />
        <Route
          exact
          path="/CadastroProprietario"
          element={<Private Item={CadastroProprietario} />}
        />
        <Route
          exact
          path="/EditarProprietario/:id"
          element={<Private Item={EditarProprietario} />}
        />
        <Route
          exact
          path="/ListaImobiliaria"
          element={<Private Item={ListaImobiliaria} />}
        />
        <Route
          exact
          path="/CadastroImobiliaria"
          element={<Private Item={CadastroImobiliaria} />}
        />
        <Route
          exact
          path="/EditarImobiliaria/:id"
          element={<Private Item={EditarImobiliaria} />}
        />
        <Route
          exact
          path="/ListaContrato"
          element={<Private Item={ListaContrato} />}
        />
        <Route
          exact
          path="/CadastroContrato"
          element={<Private Item={CadastroContrato} />}
        />
        <Route
          exact
          path="/EditarContrato/:id"
          element={<Private Item={EditarContrato} />}
        />
        <Route
          exact
          path="/ListaImovel"
          element={<Private Item={ListaImovel} />}
        />
        <Route
          exact
          path="/CadastroImovel"
          element={<Private Item={CadastroImovel} />}
        />
        <Route
          exact
          path="/EditarImovel/:id"
          element={<Private Item={EditarImovel} />}
        />
        <Route
          exact
          path="/ListaInquilino"
          element={<Private Item={ListaInquilino} />}
        />
        <Route
          exact
          path="/CadastroInquilino"
          element={<Private Item={CadastroInquilino} />}
        />
        <Route
          exact
          path="/EditarInquilino/:id"
          element={<Private Item={EditarInquilino} />}
        />
        <Route
          exact
          path="/ListaManutencao"
          element={<Private Item={ListaManutencao} />}
        />
        <Route
          exact
          path="/CadastroManutencao"
          element={<Private Item={CadastroManutencao} />}
        />
        <Route
          exact
          path="/EditarManutencao/:id"
          element={<Private Item={EditarManutencao} />}
        />
        <Route
          exact
          path="/ListaVisita"
          element={<Private Item={ListaVisita} />}
        />
        <Route
          exact
          path="/CadastroVisita"
          element={<Private Item={CadastroVisita} />}
        />
        <Route
          exact
          path="/CadastroAvaliacao"
          element={<Private Item={CadastroAvaliacao} />}
        />
      </Routes>
    </Fragment>
  );
};

const RoutesApp = () => {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
};

export default RoutesApp;
