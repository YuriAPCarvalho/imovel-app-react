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

export default function ListaAvaliacao() {
  const [avaliacoes, setAvaliacao] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [imoveis, setImoveis] = useState([]);
  const { user } = useAuth();

  const config = {
    headers: {
      Authorization: `Bearer ${user.token}`,
    },
  };

  useEffect(() => {
    axios
      .get("http://localhost:3000/avaliacao")
      .then((response) => {
        const listaAvalicao = response.data.sort((a, b) => a.id - b.id);
        setAvaliacao(listaAvalicao);
        setAvaliacao(response.data);
      })
      .catch((error) => {
        console.error(error);
      });

    axios
      .get("http://localhost:3000/imovel", config)
      .then((response) => {
        setImoveis(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  library.add(faEdit, faTrash);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const getImovelEndereco = (imovelId) => {
    const imovel = imoveis.find((i) => i.id === imovelId);
    return imovel ? imovel.endereco : "";
  };

  const filteredAvaliacao = avaliacoes.filter((avaliacao) =>
    avaliacao.satisfacao.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container">
      <div className="col-12">
        <h1>Lista de Avaliações</h1>
        <div className="d-flex mb-3 flex justify-content-end">
          <FormControl
            type="text"
            className="search-input"
            placeholder="Pesquisar por satisfação"
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
            <th scope="col">Imóvel</th>
            <th scope="col">Satisfação</th>
            <th scope="col">Avaliação</th>
          </tr>
        </thead>
        <tbody>
          {filteredAvaliacao.map((avaliacao) => (
            <tr key={avaliacao.id}>
              <th scope="row">{avaliacao.id}</th>
              <td>{getImovelEndereco(avaliacao.imovelId)}</td>
              <td>{avaliacao.satisfacao}</td>
              <td>{avaliacao.avaliacao}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
