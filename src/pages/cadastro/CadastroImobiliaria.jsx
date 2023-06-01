import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function CadastroImobiliaria() {
  const [formData, setFormData] = useState({
    nome: '',
    cnpj: '',
    endereco: '',
    telefone: '',
  });

  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    let formattedValue = value;

    if (name === 'nome') {
      formattedValue = value.toUpperCase();
    } else if (name === 'cnpj') {
      formattedValue = formatCNPJ(value);
    } else if (name === 'telefone') {
      formattedValue = formatTelefone(value);
    }

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: formattedValue,
    }));
  };


  const handleSubmit = (e) => {
    e.preventDefault();

    if (Object.values(formData).some((value) => value === '')) {
      setErrorMsg('Por favor, preencha todos os campos.');
      return;
    }

    const cnpj = formData.cnpj.replace(/\D/g, ''); // Remover pontos e traço
    const telefone = formData.telefone.replace(/\D/g, ''); // Remover caracteres não numéricos

    if (cnpj.length !== 14) {
      setErrorMsg('CNPJ deve ter 14 dígitos.');
      return;
    }
  
    if (telefone.length !== 11) {
      setErrorMsg('Telefone deve ter 11 dígitos.');
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

  const formatCNPJ = (value) => {
    // Remove caracteres não numéricos
    const cnpj = value.replace(/\D/g, '');

    // Formata o CPF
    const formattedCNPJ = cnpj.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5');

    return formattedCNPJ;
  };

  const formatTelefone = (value) => {
    // Remove caracteres não numéricos
    const phoneNumber = value.replace(/\D/g, '');

    // Formata o número de telefone
    const formattedPhoneNumber = phoneNumber.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');

    return formattedPhoneNumber;
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
            maxlength="14"
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
            maxlength="11"
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
