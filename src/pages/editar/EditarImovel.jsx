import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";

export default function EditarImovel() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [imoveis, setImoveis] = useState({
    endereco: "",
    descricao: "",
    imagem: "",
    proprietarioId: "",
    imobiliariaId: "",
  });
  const [proprietarios, setProprietarios] = useState([]);
  const [imobiliarias, setImobiliarias] = useState([]);

  useEffect(() => {
    if (id) {
      axios
        .get(`http://localhost:3000/imovel/${id}`)
        .then((response) => {
          setImoveis(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    }
    axios
      .get("http://localhost:3000/proprietario")
      .then((response) => {
        setProprietarios(response.data);
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
    setImoveis({
      ...imoveis,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (id) {
      axios
        .put(`http://localhost:3000/imovel/${id}`, imoveis)
        .then((response) => {
          navigate("/ListaImovel");
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      axios
        .post("http://localhost:3000/imovel", imoveis)
        .then((response) => {
          navigate("/ListaImovel");
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  return (
    <div className="container">
      <h1>{id ? "Editar Imóvel" : "Adicionar Imóvel"}</h1>
      <form className="row g-3" onSubmit={handleSubmit}>
        <div className="col-md-6">
          <label htmlFor="endereco" className="form-label">
            Endereço
          </label>
          <input
            type="text"
            className="form-control"
            id="endereco"
            name="endereco"
            value={imoveis.endereco}
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
            value={imoveis.descricao}
            onChange={handleChange}
            required
          />
        </div>
        <div className="col-md-6">
          <label htmlFor="imagem" className="form-label">
            URL da Imagem
          </label>
          <input
            type="text"
            className="form-control"
            id="imagem"
            name="imagem"
            value={imoveis.imagem}
            onChange={handleChange}
            required
          />
        </div>
        <div className="col-md-6">
          <label htmlFor="proprietario" className="form-label">
            Proprietário
          </label>
          <select
            className="form-select"
            id="proprietario"
            name="proprietarioId"
            value={imoveis.proprietarioId}
            onChange={handleChange}
            required
          >
            <option value="">Selecione um proprietário</option>
            {proprietarios.map((proprietario) => (
              <option key={proprietario.id} value={proprietario.id}>
                {proprietario.nome}
              </option>
            ))}
          </select>
        </div>
        <div className="col-md-6">
          <label htmlFor="imobiliaria" className="form-label">
            Imobiliária
          </label>
          <select
            className="form-select"
            id="imobiliaria"
            name="imobiliariaId"
            value={imoveis.imobiliariaId}
            onChange={handleChange}
            required
          >
            <option value="">Selecione uma imobiliária</option>
            {imobiliarias.map((imobiliaria) => (
              <option key={imobiliaria.id} value={imobiliaria.id}>
                {imobiliaria.nome}
              </option>
            ))}
          </select>
        </div>
        <div className="col-12">
          <button type="submit" className="btn btn-dark me-2">
            {id ? "Salvar" : "Adicionar"}
          </button>
          <Link to="/ListaImovel" className="btn btn-dark">
            Voltar
          </Link>
        </div>
      </form>
    </div>
  );
}
