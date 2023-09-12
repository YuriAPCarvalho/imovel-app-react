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

export default function ListaInquilino() {
  const [inquilinos, setInquilinos] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  const config = {
    headers: {
      Authorization: `Bearer ${user.token}`,
    },
  };

  useEffect(() => {
    axios
      .get("http://localhost:3000/inquilino", config)
      .then((response) => {
        const sortedInquilinos = response.data.sort((a, b) => a.id - b.id);
        setInquilinos(sortedInquilinos);
        setInquilinos(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  library.add(faEdit, faTrash);

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:3000/inquilino/${id}`)
      .then(() => {
        setInquilinos(inquilinos.filter((inquilino) => inquilino.id !== id));
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredInquilinos = inquilinos.filter((inquilino) =>
    inquilino.nome.toLowerCase().includes(searchQuery.toLowerCase())
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
            <h1>Lista de Inquilinos</h1>
            <div className="d-flex mb-3">
              <Link
                to="/CadastroInquilino"
                onClick={handleClick}
                className="btn btn-dark me-auto p-2"
                style={{
                  cursor:
                    user.perfil !== "ADMINISTRADOR" ? "not-allowed" : "auto",
                }}
              >
                Adicionar
              </Link>
              <FormControl
                type="text"
                className="search-input"
                placeholder="Pesquisar por nome"
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
                <th scope="col">Nome</th>
                <th scope="col">CPF</th>
                <th scope="col">Email</th>
                <th scope="col">Telefone</th>
                <th scope="col">Ações</th>
              </tr>
            </thead>
            <tbody>
              {filteredInquilinos.map((inquilino) => (
                <tr key={inquilino.id}>
                  <th scope="row">{inquilino.id}</th>
                  <td>{inquilino.nome}</td>
                  <td>{inquilino.cpf}</td>
                  <td>{inquilino.email}</td>
                  <td>{inquilino.telefone}</td>
                  <td>
                    <Link
                      to={`/EditarInquilino/${inquilino.id}`}
                      className="btn btn-sm btn-primary me-2"
                    >
                      <FontAwesomeIcon icon={faEdit} />
                    </Link>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => handleDelete(inquilino.id)}
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
