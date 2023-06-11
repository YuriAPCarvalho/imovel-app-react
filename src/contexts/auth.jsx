import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3000/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: "admin@gmail.com",
            senha: "admin",
          }),
        });

        if (response.ok) {
          const data = await response.json();
          setUser(data.usuario);
        } else {
          throw new Error("Falha ao obter os dados do usuário");
        }
      } catch (error) {
        console.error(error);
        // Lógica para tratamento de erro ao obter os dados do usuário
      }
    };

    fetchData();
  }, []);

  const signin = async (email, password) => {
    try {
      const response = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, senha: password }),
      });

      if (response.ok) {
        const data = await response.json();
        const token = data.token;
        localStorage.setItem("user_token", JSON.stringify({ email, token }));
        setUser(data.usuario);
      } else {
        throw new Error("Falha ao fazer login");
      }
    } catch (error) {
      console.error(error);
      // Lógica para tratamento de erro ao fazer login
    }
  };

  const signup = async (nome, email, senha) => {
    try {
      const response = await fetch("http://localhost:3000/usuario", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ nome, email, senha }),
      });

      if (response.ok) {
        const data = await response.json();
        const token = data.token;
        localStorage.setItem("user_token", JSON.stringify({ email, token }));
        setUser(data.usuario);
      } else {
        throw new Error("Falha ao cadastrar o usuário");
      }
    } catch (error) {
      console.error(error);
      // Lógica para tratamento de erro ao cadastrar o usuário
    }
  };

  const signout = () => {
    setUser(null);
    localStorage.removeItem("user_token");
  };

  return (
    <AuthContext.Provider
      value={{ user, signed: !!user, signin, signup, signout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
