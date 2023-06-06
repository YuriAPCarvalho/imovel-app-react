import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Home() {
  const [imoveis, setImoveis] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/imovel")
      .then((response) => response.json())
      .then((data) => setImoveis(data))
      .catch((error) => console.log(error));
  }, []);

  return (
    <div className="container">
      <div className="row row-cols-1 row-cols-md-4 g-4">
        {imoveis.map((imovel) => (
          <div className="col" key={imovel.id}>
            <div className="card h-100">
              <img
                src={imovel.imagem}
                className="card-img-top"
                alt="Imagem do imóvel"
              />
              <div className="card-body">
                <h5 className="card-title">{imovel.endereco}</h5>
                <p className="card-text">{imovel.descricao}</p>
                <Link to="/CadastroVisita" className="btn btn-primary me-2">
                  Visitar
                </Link>
                <Link
                  to={`/CadastroAvaliacao?imovelId=${imovel.id}`}
                  className="btn btn-success"
                >
                  Avaliar
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
