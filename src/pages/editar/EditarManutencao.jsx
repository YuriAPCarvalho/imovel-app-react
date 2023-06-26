import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import moment from "moment";

export default function EditarImovel() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [manutencao, setManutencao] = useState({
    descricao: "",
    valor: "",
    data: "",
    imovelId: "",
    imobiliariaId: "",
  });
  const [imoveis, setImoveis] = useState([]);
  const [imobiliarias, setImobiliarias] = useState([]);

  useEffect(() => {
    if (id) {
      axios
        .get(`http://localhost:3000/manutencao/${id}`)
        .then((response) => {
          setManutencao(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    }
    axios
      .get("http://localhost:3000/imovel")
      .then((response) => {
        setImoveis(response.data);
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
    setManutencao({
      ...manutencao,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Converter a data para o formato esperado pela API
    const dataConvertida = moment(manutencao.data).toISOString();

    // Atualizar o objeto "manutencao" com a data convertida
    const manutencaoAtualizada = {
      ...manutencao,
      data: dataConvertida,
    };

    if (id) {
      axios
        .put(`http://localhost:3000/manutencao/${id}`, manutencaoAtualizada)
        .then((response) => {
          navigate("/ListaManutencao");
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      axios
        .post("http://localhost:3000/manutencao", manutencaoAtualizada)
        .then((response) => {
          navigate("/ListaManutencao");
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  const dataFormatada =
    manutencao.data && moment(manutencao.data).isValid()
      ? moment(manutencao.data).format("YYYY-MM-DD")
      : "";

  return (
    <div className="container">
      <h1>{id ? "Editar Manutenção" : "Adicionar Manutenção"}</h1>
      <form className="row g-3" onSubmit={handleSubmit}>
        <div className="col-md-6">
          <label htmlFor="descricao" className="form-label">
            Descrição
          </label>
          <input
            type="text"
            className="form-control"
            id="descricao"
            name="descricao"
            value={manutencao.descricao}
            onChange={handleChange}
            required
          />
        </div>
        <div className="col-md-6">
          <label htmlFor="valor" className="form-label">
            Valor em R$
          </label>
          <input
            type="number"
            className="form-control"
            id="valor"
            name="valor"
            value={manutencao.valor}
            onChange={handleChange}
            required
          />
        </div>
        <div className="col-md-6">
          <label htmlFor="data" className="form-label">
            Data
          </label>
          <input
            type="date"
            className="form-control"
            id="data"
            name="data"
            value={dataFormatada}
            onChange={handleChange}
            required
          />
        </div>
        <div className="col-md-6">
          <label htmlFor="imovel" className="form-label">
            Imóvel
          </label>
          <select
            className="form-select"
            id="imovel"
            name="imovelId"
            value={manutencao.imovelId}
            onChange={handleChange}
            required
          >
            <option value="">Selecione um imóvel</option>
            {imoveis.map((prop) => (
              <option key={prop.id} value={prop.id}>
                {prop.endereco}
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
            value={manutencao.imobiliariaId}
            onChange={handleChange}
            required
          >
            <option value="">Selecione uma imobiliária</option>
            {imobiliarias.map((prop) => (
              <option key={prop.id} value={prop.id}>
                {prop.nome}
              </option>
            ))}
          </select>
        </div>
        <div className="col-12">
          <button type="submit" className="btn btn-dark me-2">
            {id ? "Salvar" : "Adicionar"}
          </button>
          <Link to="/ListaManutencao" className="btn btn-dark">
            Voltar
          </Link>
        </div>
      </form>
    </div>
  );
}
