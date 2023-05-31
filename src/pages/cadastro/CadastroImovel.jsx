import React, { useState } from 'react';
import axios from 'axios';

export default function CadastroImovel() {
  const [formData, setFormData] = useState({
    endereco: '',
    descricao: '',
    proprietarioId: '',
    imobiliariaId: '',
   
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
      .post('http://localhost:3000/imovel', formData) 
      .then((response) => {
        setSuccessMsg('Imovel cadastrado com sucesso!');
        setFormData({
          endereco: '',
          descricao: '',
          proprietarioId: '',
          imobiliariaId: '',
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
    <h1>Cadastro de Imovel</h1>
    <form className="row g-3" onSubmit={handleSubmit}>
        <div className="col-md-6">
          <label htmlFor="endereco" className="form-label">
          Endereco
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
          <label htmlFor="descricao" className="form-label">
          Descrição
          </label>
          <input
            type="text"
            className="form-control"
            id="descricao"
            name="descricao"
            value={formData.descricao}
            onChange={handleChange}
            required
          />
        </div>
        <div className="col-md-6">
          <label htmlFor="proprietarioId" className="form-label">
          Proprietario
          </label>
          <input
            type="text"
            className="form-control"
            id="proprietarioId"
            name="proprietarioId"
            value={formData.proprietarioId}
            onChange={handleChange}
            required
          />
        </div>
        <div className="col-md-6">
          <label htmlFor="imobiliariaId" className="form-label">
          Imobiliaria
          </label>
          <input
            type="text"
            className="form-control"
            id="imobiliariaId"
            name="imobiliariaId"
            value={formData.imobiliariaId}
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
