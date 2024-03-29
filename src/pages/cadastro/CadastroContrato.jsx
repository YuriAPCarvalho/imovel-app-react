import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function CadastroContrato() {
  const [formData, setFormData] = useState({
    duracao: "",
    valor: "",
    dataInicio: "",
    condicoesEspecificas: "",
    inquilinoId: "",
    imovelId: "",
    imobiliariaId: "",
  });

  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [inquilinos, setInquilinos] = useState([]);
  const [imoveis, setImoveis] = useState([]);
  const [imobiliarias, setImobiliaria] = useState([]);

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
      .post("http://localhost:3000/contrato", formData)
      .then((response) => {
        setSuccessMsg("Contrato cadastrado com sucesso!");
        setFormData({
          duracao: "",
          valor: "",
          dataInicio: "",
          condicoesEspecificas: "",
          inquilinoId: "",
          imovelId: "",
          imobiliariaId: "",
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
      .get("http://localhost:3000/inquilino")
      .then((response) => {
        setInquilinos(response.data);
      })
      .catch((error) => {
        console.error(error);
      });

    axios
      .get("http://localhost:3000/imovel")
      .then((response) => {
        setImoveis(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
    axios
      .get("http://localhost:3000/imobiliaria")
      .then((response) => {
        setImobiliaria(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div className="container">
      {errorMsg && <div className="alert alert-danger">{errorMsg}</div>}
      {successMsg && <div className="alert alert-success">{successMsg}</div>}
      <h1>Cadastro de Contratos</h1>
      <form className="row g-3" onSubmit={handleSubmit}>
        <div className="col-md-6">
          <label htmlFor="duracao" className="form-label">
            Duração em meses
          </label>
          <input
            type="number"
            className="form-control"
            id="duracao"
            name="duracao"
            value={formData.duracao}
            onChange={handleChange}
            required
          />
        </div>
        <div className="col-md-6">
          <label htmlFor="valor" className="form-label">
            Valor em R$
          </label>
          <input
            type="number"
            className="form-control"
            id="valor"
            name="valor"
            value={formData.valor}
            onChange={handleChange}
            required
          />
        </div>
        <div className="col-md-6">
          <label htmlFor="date" className="form-label">
            Data Inicio
          </label>
          <input
            type="date"
            className="form-control"
            id="dataInicio"
            name="dataInicio"
            value={formData.dataInicio}
            onChange={handleChange}
            required
          />
        </div>
        <div className="col-md-6">
          <label htmlFor="condicoesEspecificas" className="form-label">
            Condicoes Especificas
          </label>
          <input
            type="text"
            className="form-control"
            id="condicoesEspecificas"
            name="condicoesEspecificas"
            value={formData.condicoesEspecificas}
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
          <Link to="/ListaContrato" className="btn btn-dark">
            Voltar
          </Link>
        </div>
      </form>
    </div>
  );
}
