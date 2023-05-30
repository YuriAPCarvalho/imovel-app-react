import React, { useState } from "react";
import axios from "axios";

export default function CadastroProprietario() {
  const [formData, setFormData] = useState({
    nomeCompleto: "",
    cpf: "",
    email: "",
    telefone: ""
  });
  const [error, setError] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!formData.nomeCompleto || !formData.cpf || !formData.email || !formData.telefone) {
      setError("Por favor, preencha todos os campos.");
      return;
    }

    axios
      .post("http://localhost:3000/proprietario", formData)
      .then(response => {
        console.log("Proprietário cadastrado com sucesso!");
        // Faça algo aqui, como redirecionar para outra página ou exibir uma mensagem de sucesso.
      })
      .catch(error => {
        console.error("Ocorreu um erro ao cadastrar o proprietário:", error);
        setError("Ocorreu um erro ao cadastrar o proprietário. Verifique o console para mais detalhes.");
      });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className="container">
      {error && <div className="alert alert-danger">{error}</div>}
      <h1>Cadastro de Proprietários</h1>
      <form className="row g-3" onSubmit={handleSubmit}>
        <div className="col-md-6">
          <label htmlFor="nomeCompleto" className="form-label">Nome completo</label>
          <input
            type="text"
            className="form-control"
            id="nomeCompleto"
            name="nomeCompleto"
            value={formData.nomeCompleto}
            onChange={handleChange}
            required
          />
        </div>
        <div className="col-md-6">
          <label htmlFor="cpf" className="form-label">CPF</label>
          <input
            type="text"
            className="form-control"
            id="cpf"
            name="cpf"
            value={formData.cpf}
            onChange={handleChange}
            required
          />
        </div>
        <div className="col-md-6">
          <label htmlFor="email" className="form-label">Email</label>
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
          <label htmlFor="telefone" className="form-label">Telefone</label>
          <input
            type="text"
            className="form-control"
            id="telefone"
            name="telefone"
            value={formData.telefone}
            onChange={handleChange}
            required
          />
        </div>
        <div className="col-12">
          <button className="btn btn-primary" type="submit" id="btnSalvar">Salvar</button>
        </div>
      </form>
    </div>
  );
}
