import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";

export default function EditarUsuario() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [usuario, setUsuario] = useState({
    nome: "",
    email: "",
    perfil: "",
    senha: "",
  });
  const [permissoes, setPermissoes] = useState([]);

  useEffect(() => {
    if (id) {
      axios
        .get(`http://localhost:3000/usuario/${id}`)
        .then((response) => {
          setUsuario(response.data);
        })
        .catch((error) => {
          console.error(error);
        });

      axios
        .get("http://localhost:3000/permissao")
        .then((response) => {
          setPermissoes(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [id]);

  const handleChange = (e) => {
    setUsuario({
      ...usuario,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (id) {
      axios
        .put(`http://localhost:3000/usuario/${id}`, usuario)
        .then((response) => {
          navigate("/ListaUsuario");
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      axios
        .post("http://localhost:3000/usuario", usuario)
        .then((response) => {
          navigate("/ListaUsuario");
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  const isFieldDisabled = (fieldName) => {
    if (id === "1") {
      return true;
    }
    return false;
  };

  return (
    <div className="container">
      <h1>{id ? "Editar Usuário" : "Adicionar Usuário"}</h1>
      <form className="row g-3" onSubmit={handleSubmit}>
        <div className="col-md-6">
          <label htmlFor="nome" className="form-label">
            Nome completo
          </label>
          <input
            type="text"
            className="form-control"
            id="nome"
            name="nome"
            value={usuario.nome}
            onChange={handleChange}
            disabled={isFieldDisabled("nome")}
            required
          />
        </div>
        <div className="col-md-6">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            type="text"
            className="form-control"
            id="email"
            name="email"
            value={usuario.email}
            onChange={handleChange}
            disabled={isFieldDisabled("email")}
            required
          />
        </div>
        <div className="col-md-6">
          <label htmlFor="perfil" className="form-label">
            Perfil
          </label>
          <select
            className="form-select col-md-12"
            aria-label="Default select example"
            name="perfil"
            value={usuario.perfil}
            onChange={handleChange}
            disabled={isFieldDisabled("perfil")}
            required
          >
            {permissoes.map((permissao) => (
              <option key={permissao.id} value={permissao.nome}>
                {permissao.nome}
              </option>
            ))}
          </select>
        </div>
        <div className="col-md-6">
          <label htmlFor="password" className="form-label">
            Senha
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="senha"
            value={usuario.senha}
            onChange={handleChange}
            disabled={isFieldDisabled("senha")}
            required
          />
        </div>
        <div className="col-12">
          <button type="submit" className="btn btn-dark me-2">
            {id ? "Salvar" : "Adicionar"}
          </button>
          <Link to="/ListaUsuario" className="btn btn-dark">
            Voltar
          </Link>
        </div>
      </form>
    </div>
  );
}
