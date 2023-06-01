import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function CadastroProprietario() {
  const [formData, setFormData] = useState({
    nome: '',
    cpf: '',
    email: '',
    telefone: '',
  });

  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    let formattedValue = value;

    if (name === 'nome') {
      formattedValue = value.toUpperCase();
    } else if (name === 'cpf') {
      formattedValue = formatCPF(value);
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
  
    const cpf = formData.cpf.replace(/\D/g, ''); // Remover pontos e traço
    const telefone = formData.telefone.replace(/\D/g, ''); // Remover caracteres não numéricos
  
    if (cpf.length !== 11) {
      setErrorMsg('CPF deve ter 11 dígitos.');
      return;
    }
  
    if (telefone.length !== 11) {
      setErrorMsg('Telefone deve ter 11 dígitos.');
      return;
    }
  
    setErrorMsg('');
    setSuccessMsg('');

    axios
      .post('http://localhost:3000/proprietario', formData)
      .then((response) => {
        setSuccessMsg('Proprietário cadastrado com sucesso!');
        setFormData({
          nome: '',
          cpf: '',
          email: '',
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

  const formatCPF = (value) => {
    // Remove caracteres não numéricos
    const cpf = value.replace(/\D/g, '');

    // Formata o CPF
    const formattedCPF = cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');

    return formattedCPF;
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
      <h1>Cadastro de Proprietários</h1>
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
          <label htmlFor="cpf" className="form-label">
            CPF
          </label>
          <input
            type="text"
            className="form-control"
            id="cpf"
            name="cpf"
            value={formData.cpf}
            onChange={handleChange}
            maxlength="11"
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
          <button className="btn btn-dark me-2" type="submit" id="btnSalvar">
            Salvar
          </button>
          <Link to="/ListaProprietario" className="btn btn-dark">
            Voltar
          </Link>
        </div>
      </form>
    </div>
  );
}
