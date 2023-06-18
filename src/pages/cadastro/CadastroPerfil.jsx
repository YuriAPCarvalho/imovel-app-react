import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function CadastroPerfil() {
  const [formData, setFormData] = useState({
    nome: "",
    visitas: false,
    proprietarios: false,
    imobiliarias: false,
    imoveis: false,
    inquilinos: false,
    contratos: false,
    manutencao: false,
    avaliacao: false,
    usuarios: false,
    perfil: false,
  });

  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const handleChange = (e) => {
    const { name, value, checked } = e.target;
    const formattedValue = name !== "nome" ? checked : value;

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: formattedValue,
    }));
  };

  const handleNameChange = (e) => {
    const { value } = e.target;
    const formattedValue = value.toUpperCase();

    setFormData((prevFormData) => ({
      ...prevFormData,
      nome: formattedValue,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.nome === "") {
      setErrorMsg("Por favor, preencha o nome da permissão.");
      return;
    }

    setErrorMsg("");
    setSuccessMsg("");

    axios
      .post("http://localhost:3000/permissao", formData)
      .then((response) => {
        setSuccessMsg("Permissão cadastrada com sucesso!");
        setFormData({
          nome: "",
          visitas: false,
          proprietarios: false,
          imobiliarias: false,
          imoveis: false,
          inquilinos: false,
          contratos: false,
          manutencao: false,
          avaliacao: false,
          usuarios: false,
          perfil: false,
        });
      })
      .catch((error) => {
        if (error.response && error.response.status === 409) {
          setErrorMsg(error.response.data.message);
        } else {
          setErrorMsg("Erro ao cadastrar a permissão.");
        }
      });
  };

  return (
    <div className="container">
      {errorMsg && <div className="alert alert-danger">{errorMsg}</div>}
      {successMsg && <div className="alert alert-success">{successMsg}</div>}
      <h1>Cadastro de Permissões</h1>
      <form className="row g-3" onSubmit={handleSubmit}>
        <div className="col-md-12">
          <label htmlFor="nome" className="form-label">
            Nome da permissão
          </label>
          <input
            type="text"
            className="form-control"
            id="nome"
            name="nome"
            value={formData.nome}
            onChange={handleNameChange}
            required
          />
        </div>

        <div className="col-md-3">
          <div className="form-check form-switch">
            <input
              className="form-check-input"
              type="checkbox"
              id="visitas"
              name="visitas"
              checked={formData.visitas}
              onChange={handleChange}
            />
            <label className="form-check-label" htmlFor="visitas">
              Visitas
            </label>
          </div>
        </div>

        <div className="col-md-3">
          <div className="form-check form-switch">
            <input
              className="form-check-input"
              type="checkbox"
              id="proprietarios"
              name="proprietarios"
              checked={formData.proprietarios}
              onChange={handleChange}
            />
            <label className="form-check-label" htmlFor="proprietarios">
              Proprietários
            </label>
          </div>
        </div>

        <div className="col-md-3">
          <div className="form-check form-switch">
            <input
              className="form-check-input"
              type="checkbox"
              id="imobiliarias"
              name="imobiliarias"
              checked={formData.imobiliarias}
              onChange={handleChange}
            />
            <label className="form-check-label" htmlFor="imobiliarias">
              Imobiliárias
            </label>
          </div>
        </div>

        <div className="col-md-3">
          <div className="form-check form-switch">
            <input
              className="form-check-input"
              type="checkbox"
              id="imoveis"
              name="imoveis"
              checked={formData.imoveis}
              onChange={handleChange}
            />
            <label className="form-check-label" htmlFor="imoveis">
              Imóveis
            </label>
          </div>
        </div>

        <div className="col-md-3">
          <div className="form-check form-switch">
            <input
              className="form-check-input"
              type="checkbox"
              id="inquilinos"
              name="inquilinos"
              checked={formData.inquilinos}
              onChange={handleChange}
            />
            <label className="form-check-label" htmlFor="inquilinos">
              Inquilinos
            </label>
          </div>
        </div>

        <div className="col-md-3">
          <div className="form-check form-switch">
            <input
              className="form-check-input"
              type="checkbox"
              id="contratos"
              name="contratos"
              checked={formData.contratos}
              onChange={handleChange}
            />
            <label className="form-check-label" htmlFor="contratos">
              Contratos
            </label>
          </div>
        </div>

        <div className="col-md-3">
          <div className="form-check form-switch">
            <input
              className="form-check-input"
              type="checkbox"
              id="manutencao"
              name="manutencao"
              checked={formData.manutencao}
              onChange={handleChange}
            />
            <label className="form-check-label" htmlFor="manutencao">
              Manutenção
            </label>
          </div>
        </div>

        <div className="col-md-3">
          <div className="form-check form-switch">
            <input
              className="form-check-input"
              type="checkbox"
              id="avaliacao"
              name="avaliacao"
              checked={formData.avaliacao}
              onChange={handleChange}
            />
            <label className="form-check-label" htmlFor="avaliacao">
              Avaliação
            </label>
          </div>
        </div>

        <div className="col-md-3">
          <div className="form-check form-switch">
            <input
              className="form-check-input"
              type="checkbox"
              id="usuarios"
              name="usuarios"
              checked={formData.usuarios}
              onChange={handleChange}
            />
            <label className="form-check-label" htmlFor="usuarios">
              Usuários
            </label>
          </div>
        </div>

        <div className="col-md-3">
          <div className="form-check form-switch">
            <input
              className="form-check-input"
              type="checkbox"
              id="perfil"
              name="perfil"
              checked={formData.perfil}
              onChange={handleChange}
            />
            <label className="form-check-label" htmlFor="perfil">
              Perfil
            </label>
          </div>
        </div>

        <div className="col-12">
          <button className="btn btn-dark me-2" type="submit" id="btnSalvar">
            Salvar
          </button>
          <Link to="/ListaPerfil" className="btn btn-dark">
            Voltar
          </Link>
        </div>
      </form>
    </div>
  );
}
