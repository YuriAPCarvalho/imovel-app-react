import React, { useEffect, useState } from "react";
import Input from "../../components/Input";
import Button from "../../components/Button";
import * as C from "./styles";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import jwt_decode from "jwt-decode";

const Signin = () => {
  const { signin } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    if (!email || !senha) {
      setError("Preencha todos os campos");
      return;
    }

    const res = await signin(email, senha);

    if (res) {
      setError(res);
      return;
    }

    navigate("/ListaVisita");
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Enter") {
        event.preventDefault();
        handleLogin();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [email, senha]);

  return (
    <C.Container>
      <C.Content>
        <div>
          <img
            className="logo-image"
            src="https://img.freepik.com/vetores-premium/ilustracao-de-assistencia-de-corretor-de-imoveis-com-homem_23-2148683208.jpg"
            alt="Imagem de corretor de imóveis"
          />
          <div className="titulo">
            <C.Label>GESTÃO DE ALUGUÉIS</C.Label>
          </div>
        </div>
        <Input
          type="email"
          placeholder="Digite seu E-mail"
          value={email}
          onChange={(e) => [setEmail(e.target.value), setError("")]}
        />
        <Input
          type="password"
          placeholder="Digite sua Senha"
          value={senha}
          onChange={(e) => [setSenha(e.target.value), setError("")]}
        />
        <C.labelError>{error}</C.labelError>
        <Button Text="Entrar" onClick={handleLogin} />
        <GoogleOAuthProvider clientId="790835500681-6c603dvrqn5rqpeqg6biajrv9udf6s2h.apps.googleusercontent.com">
          <GoogleLogin
            onSuccess={(credentialResponse) => {
              var decoded = jwt_decode(credentialResponse.credential);
              console.log(decoded);
            }}
            onError={() => {
              console.log("Login Failed");
            }}
          />
        </GoogleOAuthProvider>

        <C.LabelSignup>
          Não tem uma conta?
          <C.Strong>
            <Link to="/signup">&nbsp;Registre-se</Link>
          </C.Strong>
        </C.LabelSignup>
      </C.Content>
    </C.Container>
  );
};

export default Signin;
