import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';


export default function EditarImobiliaria() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [imobiliaria, setImobiliaria] = useState({
    nome: '',
    cnpj: '',
    endereco: '',
    telefone: '',
  });

  useEffect(() => {
    if (id) {
      // Requisição GET para obter os dados do proprietário pelo ID
      axios.get(`http://localhost:3000/imobiliaria/${id}`)
        .then((response) => {
          setImobiliaria(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [id]);

  const handleChange = (e) => {
    setImobiliaria({
      ...imobiliaria,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (id) {
      // Requisição PUT para atualizar os dados do proprietário
      axios.put(`http://localhost:3000/imobiliaria/${id}`, imobiliaria)
        .then((response) => {
          // Redirecionar para a lista de proprietários após a edição bem-sucedida
          navigate('/ListaImobiliaria');
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      // Requisição POST para adicionar um novo proprietário
      axios.post('http://localhost:3000/imobiliaria', imobiliaria)
        .then((response) => {
          // Redirecionar para a lista de proprietários após a adição bem-sucedida
          navigate('/ListaImobiliaria');
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  return (
    <div className="container">
      <h1>{id ? 'Editar Imobiliária' : 'Adicionar Imobiliária'}</h1>
      <form className="row g-3" onSubmit={handleSubmit}>
       <div className="col-md-6">
          <label htmlFor="nome" className="form-label">Nome</label>
          <input
            type="text"
            className="form-control"
            id="nome"
            name="nome"
            value={imobiliaria.nome}
            onChange={handleChange}
            required
          />
        </div>
        <div className="col-md-6">
          <label htmlFor="cnpj" className="form-label">CNPJ</label>
          <input
            type="text"
            className="form-control"
            id="cnpj"
            name="cnpj"
            value={imobiliaria.cnpj}
            onChange={handleChange}
            required
          />
        </div>
        <div className="col-md-6">
          <label htmlFor="endereco" className="form-label">Endereço</label>
          <input
            type="endereco"
            className="form-control"
            id="endereco"
            name="endereco"
            value={imobiliaria.endereco}
            onChange={handleChange}
            required
          />
        </div>
        <div className="col-md-6">
          <label htmlFor="telefone" className="form-label">Telefone</label>
          <input
            type="tel"
            className="form-control"
            id="telefone"
            name="telefone"
            value={imobiliaria.telefone}
            onChange={handleChange}
            required
          />
        </div>
        <div className="col-12">
        <button type="submit" className="btn btn-dark me-2">{id ? 'Salvar' : 'Adicionar'}</button>
        <Link to="/ListaImobiliaria" className="btn btn-dark">Voltar</Link>
        </div>
      </form>
    </div>
  );
}
