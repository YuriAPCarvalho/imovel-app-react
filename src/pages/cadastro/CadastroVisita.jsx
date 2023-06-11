import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function CadastroImovel() {
  const [formData, setFormData] = useState({
    dataHora: "",
    inquilinoId: "",
    imovelId: "",
    observacao: "",
    imobiliariaId: "",
  });
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [inquilinos, setInquilinos] = useState([]);
  const [imoveis, setImoveis] = useState([]);
  const [imobiliarias, setImobiliarias] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseImoveis = await axios.get("http://localhost:3000/imovel");
        const responseImobiliarias = await axios.get(
          "http://localhost:3000/imobiliaria"
        );
        const responseInquilinos = await axios.get(
          "http://localhost:3000/inquilino"
        );
        setImoveis(responseImoveis.data);
        setImobiliarias(responseImobiliarias.data);
        setInquilinos(responseInquilinos.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Lógica para enviar os dados para a API e tratar a resposta
  };

  return (
    <div className="container">
      {errorMsg && <div className="alert alert-danger">{errorMsg}</div>}
      {successMsg && <div className="alert alert-success">{successMsg}</div>}
      <h1>Cadastro de Visita</h1>
      <form className="row g-3" onSubmit={handleSubmit}>
        <div className="col-md-6">
          <label htmlFor="dataHora" className="form-label">
            Data Visita
          </label>
          <input
            type="date"
            className="form-control"
            id="dataHora"
            name="dataHora"
            value={formData.dataHora}
            onChange={handleChange}
            required
          />
        </div>
        <div className="col-md-6">
          <label htmlFor="observacao" className="form-label">
            Observação
          </label>
          <input
            type="text"
            className="form-control"
            id="observacao"
            name="observacao"
            value={formData.observacao}
            onChange={handleChange}
            required
          />
        </div>
        <div className="col-md-6">
          <label htmlFor="inquilinoId" className="form-label">
            Inquilino
          </label>
          <select
            className="form-control"
            id="inquilinoId"
            name="inquilinoId"
            value={formData.inquilinoId}
            onChange={handleChange}
            required
          >
            <option value="">Selecione o Inquilíno</option>
            {inquilinos.map((inquilino) => (
              <option key={inquilino.id} value={inquilino.id}>
                {inquilino.nome}
              </option>
            ))}
          </select>
        </div>
        <div className="col-md-6">
          <label htmlFor="imovelId" className="form-label">
            Imóvel
          </label>
          <select
            className="form-control"
            id="imovelId"
            name="imovelId"
            value={formData.imovelId}
            onChange={handleChange}
            required
          >
            <option value="">Selecione o Imóvel</option>
            {imoveis.map((imovel) => (
              <option key={imovel.id} value={imovel.id}>
                {imovel.descricao}
              </option>
            ))}
          </select>
        </div>
        <div className="col-md-6">
          <label htmlFor="imobiliariaId" className="form-label">
            Imobiliária
          </label>
          <select
            className="form-control"
            id="imobiliariaId"
            name="imobiliariaId"
            value={formData.imobiliariaId}
            onChange={handleChange}
            required
          >
            <option value="">Selecione a Imobiliária</option>
            {imobiliarias.map((imobiliaria) => (
              <option key={imobiliaria.id} value={imobiliaria.id}>
                {imobiliaria.nome}
              </option>
            ))}
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
