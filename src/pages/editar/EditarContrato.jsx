import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import moment from "moment";

export default function EditarContrato() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [contrato, setContrato] = useState({
    duracao: "",
    valor: "",
    dataInicio: "",
    condicoesEspecificas: "",
    inquilinoId: "",
    imovelId: "",
    imobiliariaId: "",
  });
  const [inquilinos, setInquilinos] = useState([]);
  const [imoveis, setImoveis] = useState([]);
  const [imobiliarias, setImobiliarias] = useState([]);

  useEffect(() => {
    if (id) {
      axios
        .get(`http://localhost:3000/contrato/${id}`)
        .then((response) => {
          if (response.data) {
            setContrato(response.data);
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }
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
        setImobiliarias(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [id]);

  const handleChange = (e) => {
    setContrato({
      ...contrato,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const dataConvertida = moment(manutencao.data).toISOString();

    const contratoAtualizado = {
      ...contrato,
      data: dataConvertida,
    };

    if (id) {
      axios
        .put(`http://localhost:3000/contrato/${id}`, contratoAtualizado)
        .then((response) => {
          navigate("/ListaContrato");
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      axios
        .post("http://localhost:3000/contrato", contratoAtualizado)
        .then((response) => {
          navigate("/ListaContrato");
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  const dataFormatada =
    contrato.dataInicio && moment(contrato.dataInicio).isValid()
      ? moment(contrato.dataInicio).format("YYYY-MM-DD")
      : "";

  return (
    <div className="container">
      <h1>{id ? "Editar Contrato" : "Adicionar Contrato"}</h1>
      <form className="row g-3" onSubmit={handleSubmit}>
        <div className="col-md-6">
          <label htmlFor="duracao" className="form-label">
            Duração em meses
          </label>
          <input
            type="text"
            className="form-control"
            id="duracao"
            name="duracao"
            value={contrato.duracao}
            onChange={handleChange}
            required
          />
        </div>
        <div className="col-md-6">
          <label htmlFor="valor" className="form-label">
            Valor R$
          </label>
          <input
            type="text"
            className="form-control"
            id="valor"
            name="valor"
            value={contrato.valor}
            onChange={handleChange}
            required
          />
        </div>
        <div className="col-md-6">
          <label htmlFor="dataInicio" className="form-label">
            Data Início
          </label>
          <input
            type="date"
            className="form-control"
            id="dataInicio"
            name="dataInicio"
            value={dataFormatada}
            onChange={handleChange}
            required
          />
        </div>
        <div className="col-md-6">
          <label htmlFor="condicoesEspecificas" className="form-label">
            Condições Específicas
          </label>
          <input
            type="text"
            className="form-control"
            id="condicoesEspecificas"
            name="condicoesEspecificas"
            value={contrato.condicoesEspecificas}
            onChange={handleChange}
            required
          />
        </div>
        <div className="col-md-6">
          <label htmlFor="inquilinoId" className="form-label">
            Inquilíno
          </label>
          <select
            className="form-select"
            id="inquilinoId"
            name="inquilinoId"
            value={contrato.inquilinoId}
            onChange={handleChange}
            required
          >
            <option value="">Selecione um inquilino</option>
            {inquilinos.map((prop) => (
              <option key={prop.id} value={prop.id}>
                {prop.nome}
              </option>
            ))}
          </select>
        </div>
        <div className="col-md-6">
          <label htmlFor="imovelId" className="form-label">
            Imóvel
          </label>
          <select
            className="form-select"
            id="imovelId"
            name="imovelId"
            value={contrato.imovelId}
            onChange={handleChange}
            required
          >
            <option value="">Selecione um imóvel</option>
            {imoveis.map((prop) => (
              <option key={prop.id} value={prop.id}>
                {prop.endereco}
              </option>
            ))}
          </select>
        </div>
        <div className="col-md-6">
          <label htmlFor="imobiliariaId" className="form-label">
            Imobiliária
          </label>
          <select
            className="form-select"
            id="imobiliariaId"
            name="imobiliariaId"
            value={contrato.imobiliariaId}
            onChange={handleChange}
            required
          >
            <option value="">Selecione uma imobiliária</option>
            {imobiliarias.map((prop) => (
              <option key={prop.id} value={prop.id}>
                {prop.nome}
              </option>
            ))}
          </select>
        </div>

        <div className="col-12">
          <button type="submit" className="btn btn-dark me-2">
            {id ? "Salvar" : "Adicionar"}
          </button>
          <Link to="/ListaContrato" className="btn btn-dark">
            Voltar
          </Link>
        </div>
      </form>
    </div>
  );
}
