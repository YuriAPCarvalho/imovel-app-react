import React, { useState } from 'react';
import axios from 'axios';

export default function CadastroProprietario() {
  const [formData, setFormData] = useState({
    nome: '',
    cnpj: '',
    endereco: '',
    telefone: '',
  });

  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const handleChange = (e) => {
    setFormData((prevFormData) => ({ 
      ...prevFormData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (Object.values(formData).some((value) => value === '')) {
      setErrorMsg('Por favor, preencha todos os campos.');
      return;
    }

    setErrorMsg('');
    setSuccessMsg('');

    axios
      .post('http://localhost:3000/imobiliaria', formData) 
      .then((response) => {
        setSuccessMsg('Imobiliária cadastrada com sucesso!');
        setFormData({
          nome: '',
          cnpj: '',
          endereco: '',
          telefone: '',
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
  return (
    <div className="container">
    {errorMsg && <div className="alert alert-danger">{errorMsg}</div>}
    {successMsg && <div className="alert alert-success">{successMsg}</div>}
    <h1>Cadastro de Imobiliária</h1>
    <form className="row g-3" onSubmit={handleSubmit}>
        <div className="col-md-6">
          <label htmlFor="nome" className="form-label">
            Nome
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
          <label htmlFor="cpcnpjf" className="form-label">
            CNPJ
          </label>
          <input
            type="text"
            className="form-control"
            id="cnpj"
            name="cnpj"
            value={formData.cnpj}
            onChange={handleChange}
            required
          />
        </div>
        <div className="col-md-6">
          <label htmlFor="endereco" className="form-label">
            Endereço
          </label>
          <input
            type="text"
            className="form-control"
            id="endereco"
            name="endereco"
            value={formData.endereco}
            onChange={handleChange}
            required
          />
        </div>
        <div className="col-md-6">
          <label htmlFor="telefone" className="form-label">
            Telefone
          </label>
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
          <button className="btn btn-primary" type="submit" id="btnSalvar">
            Salvar
          </button>
        </div>
      </form>
    </div>
  );
}
