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

export default function ListaProprietario() {
  const [proprietarios, setProprietarios] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:3000/proprietario")
      .then((response) => {
        const sortedProprietarios = response.data.sort((a, b) => a.id - b.id);
        setProprietarios(sortedProprietarios);
        setProprietarios(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  library.add(faEdit, faTrash);

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:3000/proprietario/${id}`)
      .then(() => {
        setProprietarios(
          proprietarios.filter((proprietario) => proprietario.id !== id)
        );
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredProprietarios = proprietarios.filter((proprietario) =>
    proprietario.nome.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container">
      <div className="col-12">
        <h1>Lista de Proprietários</h1>
        <div className="d-flex mb-3">
          <Link to="/CadastroProprietario" className="btn btn-dark me-auto p-2">
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
          {filteredProprietarios.map((proprietario) => (
            <tr key={proprietario.id}>
              <th scope="row">{proprietario.id}</th>
              <td>{proprietario.nome}</td>
              <td>{proprietario.cpf}</td>
              <td>{proprietario.email}</td>
              <td>{proprietario.telefone}</td>
              <td>
                <Link
                  to={`/EditarProprietario/${proprietario.id}`}
                  className="btn btn-sm btn-primary me-2"
                >
                  <FontAwesomeIcon icon={faEdit} />
                </Link>
                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => handleDelete(proprietario.id)}
                >
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
