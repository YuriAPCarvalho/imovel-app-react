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

  useEffect(() => {
    if (id) {
      // Requisição GET para obter os dados do proprietário pelo ID
      axios
        .get(`http://localhost:3000/usuario/${id}`)
        .then((response) => {
          setUsuario(response.data);
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
      // Requisição PUT para atualizar os dados do proprietário
      axios
        .put(`http://localhost:3000/usuario/${id}`, usuario)
        .then((response) => {
          // Redirecionar para a lista de proprietários após a edição bem-sucedida
          navigate("/ListaUsuario");
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      // Requisição POST para adicionar um novo proprietário
      axios
        .post("http://localhost:3000/usuario", usuario)
        .then((response) => {
          // Redirecionar para a lista de proprietários após a adição bem-sucedida
          navigate("/ListaUsuario");
        })
        .catch((error) => {
          console.error(error);
        });
    }
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
            required
          >
            <option value=""></option>
            <option value="cliente">Cliente</option>
            <option value="operador">Operador</option>
            <option value="administrador">Administrador</option>
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
