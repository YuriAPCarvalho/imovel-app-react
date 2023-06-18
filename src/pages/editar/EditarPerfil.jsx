import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";

export default function EditarPerfil() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [perfil, setPerfil] = useState({
    nome: "",
    visitas: "",
    proprietarios: "",
    imobiliarias: "",
    imoveis: "",
    inquilinos: "",
    contratos: "",
    manutencao: "",
    avaliacao: "",
    usuarios: "",
    perfil: "",
  });

  useEffect(() => {
    if (id) {
      // Requisição GET para obter os dados do proprietário pelo ID
      axios
        .get(`http://localhost:3000/permissao/${id}`)
        .then((response) => {
          setPerfil(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setPerfil((prevState) => ({
      ...prevState,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (id) {
      // Requisição PUT para atualizar os dados do proprietário
      axios
        .put(`http://localhost:3000/permissao/${id}`, perfil)
        .then((response) => {
          // Redirecionar para a lista de proprietários após a edição bem-sucedida
          navigate("/ListaPerfil");
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      // Requisição POST para adicionar um novo proprietário
      axios
        .post("http://localhost:3000/permissao", perfil)
        .then((response) => {
          // Redirecionar para a lista de proprietários após a adição bem-sucedida
          navigate("/ListaPerfil");
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  const isFieldDisabled = (fieldName) => {
    if (id === "1") {
      return true; // Desabilitar todos os campos para ID 1
    }
    if (id === "2" && fieldName === "nome") {
      return true; // Desabilitar o campo de nome para ID 2
    }
    return false; // Habilitar os outros campos
  };

  return (
    <div className="container">
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
            value={perfil.nome}
            onChange={handleChange}
            disabled={isFieldDisabled("nome")}
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
              checked={perfil.visitas}
              onChange={handleChange}
              disabled={isFieldDisabled("visitas")}
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
              checked={perfil.proprietarios}
              onChange={handleChange}
              disabled={isFieldDisabled("proprietarios")}
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
              checked={perfil.imobiliarias}
              onChange={handleChange}
              disabled={isFieldDisabled("imobiliarias")}
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
              checked={perfil.imoveis}
              onChange={handleChange}
              disabled={isFieldDisabled("imoveis")}
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
              checked={perfil.inquilinos}
              onChange={handleChange}
              disabled={isFieldDisabled("inquilinos")}
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
              checked={perfil.contratos}
              onChange={handleChange}
              disabled={isFieldDisabled("contratos")}
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
              checked={perfil.manutencao}
              onChange={handleChange}
              disabled={isFieldDisabled("manutencao")}
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
              checked={perfil.avaliacao}
              onChange={handleChange}
              disabled={isFieldDisabled("avaliacao")}
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
              checked={perfil.usuarios}
              onChange={handleChange}
              disabled={isFieldDisabled("usuarios")}
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
              checked={perfil.perfil}
              onChange={handleChange}
              disabled={isFieldDisabled("perfil")}
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
