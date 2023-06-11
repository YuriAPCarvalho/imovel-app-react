import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import queryString from "query-string";

export default function CadastroAvaliacao() {
  const [formData, setFormData] = useState({
    imovel: "",
    avaliacao: "",
    satisfacao: "",
  });

  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  useEffect(() => {
    const parsed = queryString.parse(window.location.search);
    const imovelId = parsed.imovelId;

    if (imovelId) {
      fetchImovel(imovelId);
    }
  }, []);

  const fetchImovel = async (imovelId) => {
    try {
      const response = await axios.get(
        `http://localhost:3000/imovel/${imovelId}`
      );
      const imovel = response.data;
      setFormData((prevData) => ({
        ...prevData,
        imovel: imovel.endereco,
      }));
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Lógica para enviar os dados para a API e tratar a resposta
  };

  return (
    <div className="container">
      {errorMsg && <div className="alert alert-danger">{errorMsg}</div>}
      {successMsg && <div className="alert alert-success">{successMsg}</div>}
      <h1>Cadastro de Avaliação</h1>
      <form className="row g-3" onSubmit={handleSubmit}>
        <div className="col-md-6">
          <label htmlFor="imovel" className="form-label">
            Imóvel
          </label>
          <input
            type="text"
            className="form-control"
            id="imovel"
            name="imovel"
            value={formData.imovel}
            onChange={handleChange}
            required
            readOnly // Impede a edição do campo
          />
        </div>
        <div className="col-md-12">
          <label htmlFor="avaliacao" className="form-label">
            Avaliação
          </label>
          <textarea
            type="text"
            className="form-control"
            id="avaliacao"
            name="avaliacao"
            value={formData.avaliacao}
            onChange={handleChange}
            required
          />
        </div>
        <div className="col-md-3">
          <select
            className="form-select col-md-12"
            aria-label="Default select example"
            name="satisfacao"
            value={formData.satisfacao}
            onChange={handleChange}
            required
          >
            <option value="">Satisfação</option>
            <option value="1">Excelente</option>
            <option value="2">Ótimo</option>
            <option value="3">Bom</option>
            <option value="4">Regular</option>
            <option value="5">Ruim</option>
            <option value="6">Péssimo</option>
          </select>
        </div>
        <div className="col-12">
          <button className="btn btn-dark me-2" type="submit" id="btnSalvar">
            Salvar
          </button>
          <Link to="/ListaVisita" className="btn btn-dark">
            Voltar
          </Link>
        </div>
      </form>
    </div>
  );
}
