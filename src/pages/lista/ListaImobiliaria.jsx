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

export default function ListaImobiliaria() {
  const [imobiliarias, setImobiliaria] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:3000/imobiliaria")
      .then((response) => {
        const sortedImobiliarias = response.data.sort((a, b) => a.id - b.id);
        setImobiliaria(sortedImobiliarias);
        setImobiliaria(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  library.add(faEdit, faTrash);

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:3000/imobiliaria/${id}`)
      .then(() => {
        setImobiliaria(
          imobiliarias.filter((imobiliaria) => imobiliaria.id !== id)
        );
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredImobiliarias = imobiliarias.filter((imobiliaria) =>
    imobiliaria.nome.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container">
      <div className="col-12">
        <h1>Lista de Imobiliárias</h1>
        <div className="d-flex mb-3">
          <Link to="/CadastroImobiliaria" className="btn btn-dark me-auto p-2">
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
            <th scope="col">CNPJ</th>
            <th scope="col">endereco</th>
            <th scope="col">Telefone</th>
            <th scope="col">Ações</th>
          </tr>
        </thead>
        <tbody>
          {filteredImobiliarias.map((imobiliaria) => (
            <tr key={imobiliaria.id}>
              <th scope="row">{imobiliaria.id}</th>
              <td>{imobiliaria.nome}</td>
              <td>{imobiliaria.cnpj}</td>
              <td>{imobiliaria.endereco}</td>
              <td>{imobiliaria.telefone}</td>
              <td>
                <Link
                  to={`/EditarImobiliaria/${imobiliaria.id}`}
                  className="btn btn-sm btn-primary me-2"
                >
                  <FontAwesomeIcon icon={faEdit} />
                </Link>
                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => handleDelete(imobiliaria.id)}
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
