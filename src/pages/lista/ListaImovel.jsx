import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faEdit,
  faTrash,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FormControl } from "react-bootstrap";
import "@fortawesome/fontawesome-free/css/all.css";
import "./../../style.css";
import { useAuth } from "../../contexts/auth";

export default function ListaImovel() {
  const [imoveis, setImovel] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [proprietarios, setProprietarios] = useState([]);
  const [imobiliarias, setImobiliarias] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  const config = {
    headers: {
      Authorization: `Bearer ${user.token}`,
    },
  };
  useEffect(() => {
    axios
      .get("http://localhost:3000/imovel", config)
      .then((response) => {
        const sortedImoveis = response.data.sort((a, b) => a.id - b.id);
        setImovel(sortedImoveis);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
      });

    axios
      .get("http://localhost:3000/proprietario", config)
      .then((response) => {
        setProprietarios(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
      });

    axios
      .get("http://localhost:3000/imobiliaria", config)
      .then((response) => {
        setImobiliarias(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  library.add(faEdit, faTrash);

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:3000/imovel/${id}`)
      .then(() => {
        setImovel(imoveis.filter((imovel) => imovel.id !== id));
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const getProprietarioNome = (proprietarioId) => {
    const proprietario = proprietarios.find((p) => p.id === proprietarioId);
    return proprietario ? proprietario.nome : "";
  };

  const getImobiliariaNome = (imobiliariaId) => {
    const imobiliaria = imobiliarias.find((i) => i.id === imobiliariaId);
    return imobiliaria ? imobiliaria.nome : "";
  };

  const filteredImoveis = imoveis.filter((imovel) =>
    imovel.endereco?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleClick = (event) => {
    if (user.perfil !== 'ADMINISTRADOR') {
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
            <h1>Lista de Imóveis</h1>
            <div className="d-flex mb-3">
              <Link
                to="/CadastroImovel"
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
                placeholder="Pesquisar por endereço"
                value={searchQuery}
                onChange={handleSearch}
              />
              <span className="p-2 me-2">
                <FontAwesomeIcon icon={faMagnifyingGlass} size="xl" />
              </span>
            </div>
          </div>

          <table className="table table-striped">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Endereco</th>
                <th scope="col">Descricao</th>
                <th scope="col">Proprietario</th>
                <th scope="col">Imobiliaria</th>
                <th scope="col">Ações</th>
              </tr>
            </thead>
            <tbody>
              {filteredImoveis.map((imovel) => (
                <tr key={imovel.id}>
                  <th scope="row">{imovel.id}</th>
                  <td>{imovel.endereco}</td>
                  <td>{imovel.descricao}</td>
                  <td>{getProprietarioNome(imovel.proprietarioId)}</td>
                  <td>{getImobiliariaNome(imovel.imobiliariaId)}</td>
                  <td>
                    <Link
                      to={`/EditarImovel/${imovel.id}`}
                      className="btn btn-sm btn-primary me-2"
                    >
                      <FontAwesomeIcon icon={faEdit} />
                    </Link>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => handleDelete(imovel.id)}
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
