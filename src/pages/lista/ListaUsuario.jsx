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

export default function ListaUsuario() {
  const [usuarios, setUsuarios] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:3000/usuario")
      .then((response) => {
        const sortedUsuario = response.data.sort((a, b) => a.id - b.id);
        setUsuarios(sortedUsuario);
        setUsuarios(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  library.add(faEdit, faTrash);

  const handleDelete = (id) => {
    setErrorMsg("");

    axios
      .delete(`http://localhost:3000/usuario/${id}`)
      .then(() => {
        setUsuarios(usuarios.filter((usuario) => usuario.id !== id));
      })
      .catch((error) => {
        setErrorMsg(error.response.data.message);
      });
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredUsuario = usuarios.filter((usuario) =>
    usuario.nome.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container">
      {errorMsg && <div className="alert alert-danger">{errorMsg}</div>}
      <div className="col-12">
        <h1>Lista de Usuários</h1>
        <div className="d-flex mb-3">
          <Link to="/CadastroUsuario" className="btn btn-dark me-auto p-2">
            Adicionar
          </Link>
          <FormControl
            type="text"
            className="search-input"
            placeholder="Pesquisar por usuário"
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
            <th scope="col">Email</th>
            <th scope="col">Perfil</th>
            <th scope="col">Ações</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsuario.map((usuario) => (
            <tr key={usuario.id}>
              <th scope="row">{usuario.id}</th>
              <td>{usuario.nome}</td>
              <td>{usuario.email}</td>
              <td>{usuario.perfil}</td>
              <td>
                <Link
                  to={`/EditarUsuario/${usuario.id}`}
                  className="btn btn-sm btn-primary me-2"
                >
                  <FontAwesomeIcon icon={faEdit} />
                </Link>
                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => handleDelete(usuario.id)}
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
