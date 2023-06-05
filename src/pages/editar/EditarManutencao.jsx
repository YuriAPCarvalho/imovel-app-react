import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';


export default function EditarImovel() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [proprietario, setProprietario] = useState({
    nome: '',
    cpf: '',
    email: '',
    telefone: '',
  });

  useEffect(() => {
    if (id) {
      // Requisição GET para obter os dados do proprietário pelo ID
      axios.get(`http://localhost:3000/proprietario/${id}`)
        .then((response) => {
          setProprietario(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [id]);

  const handleChange = (e) => {
    setProprietario({
      ...proprietario,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (id) {
      // Requisição PUT para atualizar os dados do proprietário
      axios.put(`http://localhost:3000/proprietario/${id}`, proprietario)
        .then((response) => {
          // Redirecionar para a lista de proprietários após a edição bem-sucedida
          navigate('/ListaProprietario');
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      // Requisição POST para adicionar um novo proprietário
      axios.post('http://localhost:3000/proprietario', proprietario)
        .then((response) => {
          // Redirecionar para a lista de proprietários após a adição bem-sucedida
          navigate('/ListaProprietario');
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  return (
    <div className="container">
      <h1>{id ? 'Editar Proprietário' : 'Adicionar Proprietário'}</h1>
      <form className="row g-3" onSubmit={handleSubmit}>
       <div className="col-md-6">
          <label htmlFor="nome" className="form-label">Nome</label>
          <input
            type="text"
            className="form-control"
            id="nome"
            name="nome"
            value={proprietario.nome}
            onChange={handleChange}
            required
          />
        </div>
        <div className="col-md-6">
          <label htmlFor="cpf" className="form-label">CPF</label>
          <input
            type="text"
            className="form-control"
            id="cpf"
            name="cpf"
            value={proprietario.cpf}
            onChange={handleChange}
            required
          />
        </div>
        <div className="col-md-6">
          <label htmlFor="email" className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={proprietario.email}
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
            value={proprietario.telefone}
            onChange={handleChange}
            required
          />
        </div>
        <div className="col-12">
        <button type="submit" className="btn btn-dark me-2">{id ? 'Salvar' : 'Adicionar'}</button>
        <Link to="/ListaProprietario" className="btn btn-dark">Voltar</Link>
        </div>
      </form>
    </div>
  );
}
