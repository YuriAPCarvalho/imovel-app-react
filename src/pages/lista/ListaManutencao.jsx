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

export default function ListaManutencao() {
  const [manutencaos, setManutencao] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [imoveis, setImoveis] = useState([]);
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
      .get("http://localhost:3000/manutencao", config)
      .then((response) => {
        setManutencao(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
      });

    axios
      .get("http://localhost:3000/imovel", config)
      .then((response) => {
        setImoveis(response.data);
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
      .delete(`http://localhost:3000/manutencao/${id}`)
      .then(() => {
        setManutencao(manutencaos.filter((manutencao) => manutencao.id !== id));
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const getImobiliariaNome = (imobiliariaId) => {
    const imobiliaria = imobiliarias.find((i) => i.id === imobiliariaId);
    return imobiliaria ? imobiliaria.nome : "";
  };

  const getImovelEndereco = (imovelId) => {
    const imovel = imoveis.find((i) => i.id === imovelId);
    return imovel ? imovel.endereco : "";
  };

  const filteredManutencao = manutencaos.filter((manutencao) =>
    manutencao.descricao?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleClick = (event) => {
    if (user.perfil !== 'ADMINISTRADOR') {
      event.preventDefault();
    }
  };


  const formatarData = (data) => {
    const date = new Date(data);
    const dia = date.getDate().toString().padStart(2, "0");
    const mes = (date.getMonth() + 1).toString().padStart(2, "0");
    const ano = date.getFullYear();
    return `${dia}/${mes}/${ano}`;
  };

  return (
    <div className="container">
      {loading ? (
        <div className="alert alert-info">Carregando...</div>
      ) : (
        <>
          <div className="col-12">
            <h1>Lista de Manutenção</h1>
            <div className="d-flex mb-3">
              <Link
                to="/CadastroManutencao"
                onClick={handleClick}
                className="btn btn-dark me-auto p-2"
                style={{ cursor: user.perfil !== 'ADMINISTRADOR' ? 'not-allowed' : 'pointer' }}
              >
                Adicionar
              </Link>
              <FormControl
                type="text"
                className="search-input"
                placeholder="Pesquisar por descrição"
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
                <th scope="col">Endereço</th>
                <th scope="col">Data</th>
                <th scope="col">Imobiliária</th>
                <th scope="col">Valor</th>
                <th scope="col">Descrição</th>
                <th scope="col">Ações</th>
              </tr>
            </thead>
            <tbody>
              {filteredManutencao.map((manutencao) => (
                <tr key={manutencao.id}>
                  <th scope="row">{manutencao.id}</th>
                  <td>{getImovelEndereco(manutencao.imovelId)}</td>
                  <td>{formatarData(manutencao.data)}</td>
                  <td>{getImobiliariaNome(manutencao.imobiliariaId)}</td>
                  <td>{manutencao.valor}</td>
                  <td>{manutencao.descricao}</td>
                  <td>
                    <Link
                      to={`/EditarManutencao/${manutencao.id}`}
                      className="btn btn-sm btn-primary me-2"
                    >
                      <FontAwesomeIcon icon={faEdit} />
                    </Link>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => handleDelete(manutencao.id)}
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
