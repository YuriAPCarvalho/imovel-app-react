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
import {
  faCheckCircle,
  faTimesCircle,
} from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "../../contexts/auth";

export default function ListaPerfil() {
  const [permissoes, setPermissao] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  const config = {
    headers: {
      Authorization: `Bearer ${user.token}`,
    },
  };

  library.add(faEdit, faTrash);

  useEffect(() => {
    if (user && user.token) {
      const fetchPermissoes = async () => {
        try {
          const response = await axios.get(
            "http://localhost:3000/permissao",
            config
          );

          const sortedPermissoes = response.data.sort((a, b) => a.id - b.id);
          setPermissao(sortedPermissoes);
          setLoading(false);
        } catch (error) {
          setErrorMsg("Erro ao carregar permissões.");
          console.error(error);
        }
      };

      if (user && user.perfil === "ADMINISTRADOR") {
        fetchPermissoes();
      } else {
        setErrorMsg("Usuário não é um administrador.");
      }
    }
  }, [user]);

  const handleDelete = (id) => {
    setErrorMsg("");

    axios
      .delete(`http://localhost:3000/permissao/${id}`)
      .then(() => {
        setPermissao(permissoes.filter((permissao) => permissao.id !== id));
      })
      .catch((error) => {
        setErrorMsg(error.response.data.message);
      });
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredPermissao = permissoes.filter((permissao) =>
    permissao.nome.toLowerCase().includes(searchQuery.toLowerCase())
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
          {errorMsg && <div className="alert alert-danger">{errorMsg}</div>}
          <div className="col-12">
            <h1>Lista de Permissões</h1>
            <div className="d-flex mb-3" onSubmit={handleDelete}>
              <Link
                to="/CadastroPerfil"
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
                <th scope="col">Visitas</th>
                <th scope="col">Proprietários</th>
                <th scope="col">Imobilíarias</th>
                <th scope="col">Imóveis</th>
                <th scope="col">Inquilínos</th>
                <th scope="col">Contratos</th>
                <th scope="col">Manutenção</th>
                <th scope="col">Avaliação</th>
                <th scope="col">Usuários</th>
                <th scope="col">Perfil</th>
                <th scope="col">Ações</th>
              </tr>
            </thead>
            <tbody>
              {filteredPermissao.map((permissao) => (
                <tr key={permissao.id}>
                  <th scope="row">{permissao.id}</th>
                  <td>{permissao.nome}</td>
                  <td className="text-center">
                    {permissao.visitas ? (
                      <FontAwesomeIcon
                        icon={faCheckCircle}
                        className="text-success"
                      />
                    ) : (
                      <FontAwesomeIcon
                        icon={faTimesCircle}
                        className="text-danger"
                      />
                    )}
                  </td>
                  <td className="text-center">
                    {permissao.proprietarios ? (
                      <FontAwesomeIcon
                        icon={faCheckCircle}
                        className="text-success"
                      />
                    ) : (
                      <FontAwesomeIcon
                        icon={faTimesCircle}
                        className="text-danger"
                      />
                    )}
                  </td>
                  <td className="text-center">
                    {permissao.imobiliarias ? (
                      <FontAwesomeIcon
                        icon={faCheckCircle}
                        className="text-success"
                      />
                    ) : (
                      <FontAwesomeIcon
                        icon={faTimesCircle}
                        className="text-danger"
                      />
                    )}
                  </td>
                  <td className="text-center">
                    {permissao.imoveis ? (
                      <FontAwesomeIcon
                        icon={faCheckCircle}
                        className="text-success"
                      />
                    ) : (
                      <FontAwesomeIcon
                        icon={faTimesCircle}
                        className="text-danger"
                      />
                    )}
                  </td>
                  <td className="text-center">
                    {permissao.inquilinos ? (
                      <FontAwesomeIcon
                        icon={faCheckCircle}
                        className="text-success"
                      />
                    ) : (
                      <FontAwesomeIcon
                        icon={faTimesCircle}
                        className="text-danger"
                      />
                    )}
                  </td>
                  <td className="text-center">
                    {permissao.contratos ? (
                      <FontAwesomeIcon
                        icon={faCheckCircle}
                        className="text-success"
                      />
                    ) : (
                      <FontAwesomeIcon
                        icon={faTimesCircle}
                        className="text-danger"
                      />
                    )}
                  </td>
                  <td className="text-center">
                    {permissao.manutencao ? (
                      <FontAwesomeIcon
                        icon={faCheckCircle}
                        className="text-success"
                      />
                    ) : (
                      <FontAwesomeIcon
                        icon={faTimesCircle}
                        className="text-danger"
                      />
                    )}
                  </td>
                  <td className="text-center">
                    {permissao.avaliacao ? (
                      <FontAwesomeIcon
                        icon={faCheckCircle}
                        className="text-success"
                      />
                    ) : (
                      <FontAwesomeIcon
                        icon={faTimesCircle}
                        className="text-danger"
                      />
                    )}
                  </td>
                  <td className="text-center">
                    {permissao.usuarios ? (
                      <FontAwesomeIcon
                        icon={faCheckCircle}
                        className="text-success"
                      />
                    ) : (
                      <FontAwesomeIcon
                        icon={faTimesCircle}
                        className="text-danger"
                      />
                    )}
                  </td>
                  <td className="text-center">
                    {permissao.perfil ? (
                      <FontAwesomeIcon
                        icon={faCheckCircle}
                        className="text-success"
                      />
                    ) : (
                      <FontAwesomeIcon
                        icon={faTimesCircle}
                        className="text-danger"
                      />
                    )}
                  </td>
                  <td>
                    <Link
                      to={`/EditarPerfil/${permissao.id}`}
                      className="btn btn-sm btn-primary me-2"
                    >
                      <FontAwesomeIcon icon={faEdit} />
                    </Link>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => handleDelete(permissao.id)}
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
