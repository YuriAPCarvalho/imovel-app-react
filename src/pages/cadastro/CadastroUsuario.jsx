import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function CadastroUsuario() {
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    senha: "",
    perfil: "",
  });

  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [permissoes, setPermissao] = useState([]);

  const handleChange = (e) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (Object.values(formData).some((value) => value === "")) {
      setErrorMsg("Por favor, preencha todos os campos.");
      return;
    }

    setErrorMsg("");
    setSuccessMsg("");

    axios
      .post("http://localhost:3000/usuario", formData)
      .then((response) => {
        setSuccessMsg("Usuário cadastrado com sucesso!");
        setFormData({
          nome: "",
          email: "",
          senha: "",
          perfil: "",
        });
      })
      .catch((error) => {
        if (error.response && error.response.status === 409) {
          setErrorMsg(error.response.data.message);
        } else {
          setErrorMsg(error.response.data.message);
          console.error(error);
        }
      });
  };

  useEffect(() => {
    axios
      .get("http://localhost:3000/permissao")
      .then((response) => {
        setPermissao(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div className="container">
      {errorMsg && <div className="alert alert-danger">{errorMsg}</div>}
      {successMsg && <div className="alert alert-success">{successMsg}</div>}
      <h1>Cadastro de Usuários</h1>
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
            value={formData.nome}
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
            value={formData.email}
            onChange={handleChange}
            required
          />
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
            value={formData.senha}
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
            value={formData.perfil}
            onChange={handleChange}
            required
          >
            <option value=""></option>
            {permissoes.map((permissao) => (
              <option key={permissao.id} value={permissao.nome}>
                {permissao.nome}
              </option>
            ))}
          </select>
        </div>
        <div className="col-12">
          <button className="btn btn-dark me-2" type="submit" id="btnSalvar">
            Salvar
          </button>
          <Link to="/ListaUsuario" className="btn btn-dark">
            Voltar
          </Link>
        </div>
      </form>
    </div>
  );
}
