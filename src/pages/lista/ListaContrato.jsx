import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faEdit, faTrash, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FormControl } from 'react-bootstrap';
import '@fortawesome/fontawesome-free/css/all.css';
import './../../style.css';

export default function ListaContrato() {
  const [contratos, setContrato] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    axios.get('http://localhost:3000/contrato')
      .then((response) => {
        const sortedContrato = response.data.sort((a, b) => a.id - b.id);
        setContrato(sortedContrato);
        setContrato(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  library.add(faEdit, faTrash);

  const handleDelete = (id) => {
    axios.delete(`http://localhost:3000/contrato/${id}`)
      .then(() => {
        setContrato(contratos.filter((contrato) => contrato.id !== id));
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredcontratos = contratos.filter((contrato) =>
    contrato.nome.toLowerCase().includes(searchQuery.toLowerCase())
  );
  

  return (
    <div className="container">
    <div className="col-12">
      <h1>Lista de Contratos</h1>
      <div className="d-flex mb-3">
        <Link to="/CadastroContrato" className="btn btn-dark me-auto p-2">Adicionar</Link>    
        <FormControl
          type="text"
          className="search-input"
          placeholder='Pesquisar por nome'
          value={searchQuery}
          onChange={handleSearch}
        />
        <span class="p-2 me-2"><FontAwesomeIcon icon={faMagnifyingGlass} size='xl' /></span>
      </div>
    </div>

      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Duração</th>
            <th scope="col">Valor</th>
            <th scope="col">Data inicio</th>
            <th scope="col">Condições Específicas</th>
            <th scope="col">Inquilino</th>
            <th scope="col">Imovel</th>
            <th scope="col">Imobiliária</th>
          </tr>
        </thead>
        <tbody>
          {filteredcontratos.map((contrato) => (
            <tr key={contrato.id}>
              <th scope="row">{contrato.id}</th>
              <td>{contrato.duracao}</td>
              <td>{contrato.valor}</td>
              <td>{contrato.dataInicio}</td>
              <td>{contrato.telcondicoesEspecificasefone}</td>
              <td>{contrato.inquilinoId}</td>
              <td>{contrato.imovelId}</td>
              <td>{contrato.imobiliariaId}</td>
              <td>
                <Link to={`/EditarContrato/${contrato.id}`} className="btn btn-sm btn-primary me-2">
                  <FontAwesomeIcon icon={faEdit} />
                </Link>
                <button className="btn btn-sm btn-danger" onClick={() => handleDelete(contrato.id)}>
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
