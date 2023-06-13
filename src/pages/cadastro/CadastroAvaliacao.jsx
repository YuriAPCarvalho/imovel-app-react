import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import queryString from "query-string";

export default function CadastroAvaliacao() {
  const [formData, setFormData] = useState({
    imovelId: "",
    avaliacao: "",
    satisfacao: "",
  });

  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [imoveis, setImoveis] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "imovelId") {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value === "" ? null : parseInt(value),
      }));
    } else {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setErrorMsg("");
    setSuccessMsg("");

    axios
      .post("http://localhost:3000/avaliacao", formData)
      .then((response) => {
        setSuccessMsg("Avaliação cadastrada com sucesso!");
        setFormData({
          imovelId: "",
          avaliacao: "",
          satisfacao: "",
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
    const parsed = queryString.parse(window.location.search);
    const imovelId = parsed.imovelId;

    if (imovelId) {
      fetchImovel(imovelId);
    }

    async function fetchImovel(imovelId) {
      try {
        const response = await axios.get(
          `http://localhost:3000/imovel/${imovelId}`
        );
        const imovel = response.data;
        setFormData((prevData) => ({
          ...prevData,
          imovelId: imovel.id,
        }));
      } catch (error) {
        console.error(error);
      }
    }

    axios
      .get("http://localhost:3000/imovel")
      .then((response) => {
        setImoveis(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div className="container">
      {errorMsg && <div className="alert alert-danger">{errorMsg}</div>}
      {successMsg && <div className="alert alert-success">{successMsg}</div>}
      <h1>Cadastro de Avaliação</h1>
      <form className="row g-3" onSubmit={handleSubmit}>
        <div className="col-md-6">
          <label htmlFor="imovelId" className="form-label">
            Imóvel
          </label>
          <select
            className="form-control"
            id="imovelid"
            name="imovelId"
            value={formData.imovelId}
            onChange={handleChange}
            required
            disabled
          >
            {imoveis.map((imovel) => (
              <option key={imovel.id} value={imovel.id}>
                {imovel.endereco}
              </option>
            ))}
          </select>
        </div>
        <div className="col-md-12">
          <label htmlFor="avaliacao" className="form-label">
            Avaliação
          </label>
          <textarea
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
            <option value="Excelente">Excelente</option>
            <option value="Otimo">Ótimo</option>
            <option value="Bom">Bom</option>
            <option value="Regular">Regular</option>
            <option value="Ruim">Ruim</option>
            <option value="Pessimo">Péssimo</option>
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
