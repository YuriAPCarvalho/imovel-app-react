import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faEdit, faTrash, faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FormControl } from "react-bootstrap";
import "@fortawesome/fontawesome-free/css/all.css";
import "./../../style.css";
import { useAuth } from "../../contexts/auth";

export default function ListaContrato() {
  const [contratos, setContratos] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [inquilinos, setInquilinos] = useState({});
  const [imoveis, setImoveis] = useState({});
  const [imobiliarias, setImobiliarias] = useState({});
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  const config = {
    headers: {
      Authorization: `Bearer ${user.token}`,
    },
  };

  useEffect(() => {
    axios
      .get("http://localhost:3000/contrato", config)
      .then((response) => {
        const sortedContratos = response.data.sort((a, b) => a.id - b.id);
        setContratos(sortedContratos);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:3000/inquilino", config)
      .then((response) => {
        const inquilinosData = response.data.reduce(
          (acc, inquilino) => ({
            ...acc,
            [inquilino.id]: inquilino.nome,
          }),
          {}
        );
        setInquilinos(inquilinosData);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
      });

    axios
      .get("http://localhost:3000/imovel", config)
      .then((response) => {
        const imoveisData = response.data.reduce(
          (acc, imovel) => ({
            ...acc,
            [imovel.id]: imovel,
          }),
          {}
        );
        setImoveis(imoveisData);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
      });

    axios
      .get("http://localhost:3000/imobiliaria", config)
      .then((response) => {
        const imobiliariasData = response.data.reduce(
          (acc, imobiliaria) => ({
            ...acc,
            [imobiliaria.id]: imobiliaria.nome,
          }),
          {}
        );
        setImobiliarias(imobiliariasData);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  library.add(faEdit, faTrash, faSearch);

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:3000/contrato/${id}`)
      .then(() => {
        setContratos(contratos.filter((contrato) => contrato.id !== id));
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredContratos = contratos.filter((contrato) =>
    contrato.duracao.toString().includes(searchQuery.toLowerCase())
  );

  const handleClick = (event) => {
    if (user.perfil !== "ADMINISTRADOR") {
      event.preventDefault();
    }
  };

  return (
    <div className="container">
      {loading ? (
        <div className="alert alert-info">Carregando...</div>
      ) : (
        <>
          <div className="col-12">
            <h1>Lista de Contratos</h1>
            <div className="d-flex mb-3">
              <Link
                to="/CadastroContrato"
                onClick={handleClick}
                className="btn btn-dark me-auto p-2"
                style={{
                  cursor:
                    user.perfil !== "ADMINISTRADOR" ? "not-allowed" : "pointer",
                }}
              >
                Adicionar
              </Link>
              <FormControl
                type="text"
                className="search-input"
                placeholder="Pesquisar por duração"
                value={searchQuery}
                onChange={handleSearch}
              />
              <span className="p-2 me-2">
                <FontAwesomeIcon icon={faSearch} size="xl" />
              </span>
            </div>
          </div>

          <table className="table table-striped">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Duração</th>
                <th scope="col">Valor</th>
                <th scope="col">Data de Início</th>
                <th scope="col">Condições Específicas</th>
                <th scope="col">Inquilino</th>
                <th scope="col">Endereço</th>
                <th scope="col">Imobiliária</th>
                <th scope="col">Ações</th>
              </tr>
            </thead>
            <tbody>
              {filteredContratos.map((contrato) => (
                <tr key={contrato.id}>
                  <th scope="row">{contrato.id}</th>
                  <td>{contrato.duracao}</td>
                  <td>{contrato.valor}</td>
                  <td>{new Date(contrato.dataInicio).toLocaleDateString()}</td>
                  <td>{contrato.condicoesEspecificas}</td>
                  <td>{inquilinos[contrato.inquilinoId]}</td>
                  <td>{imoveis[contrato.imovelId]?.endereco}</td>
                  <td>{imobiliarias[contrato.imobiliariaId]}</td>
                  <td>
                    <Link
                      to={`/EditarContrato/${contrato.id}`}
                      className="btn btn-sm btn-primary me-2"
                    >
                      <FontAwesomeIcon icon={faEdit} />
                    </Link>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => handleDelete(contrato.id)}
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
}
