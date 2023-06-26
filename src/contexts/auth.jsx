import { createContext, useEffect, useState, useContext } from "react";

export const AuthContext = createContext({});

export const useAuth = () => {
  const { user, perfil, signed, signin, signup, signout } =
    useContext(AuthContext);
  return { user, perfil, signed, signin, signup, signout };
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user_token");
    return storedUser ? JSON.parse(storedUser) : null;
  });
  const [perfil, setPerfil] = useState(null);

  useEffect(() => {
    if (user && user.id) {
      const fetchData = async () => {
        try {
          const response = await fetch(
            `http://localhost:3000/permissao/${user.id}`
          );

          if (response.ok) {
            const data = await response.json();
            setPerfil(data);
          } else {
            throw new Error("Falha ao obter as permissões do usuário");
          }
        } catch (error) {
          console.error(error);
        }
      };

      fetchData();
    }
  }, [user]);

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
        return null;
      } else {
        throw new Error("Falha ao fazer login");
      }
    } catch (error) {
      console.error(error);

      return "Usuário ou senha incorreto";
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
    }
  };

  const signout = () => {
    setUser(null);
    localStorage.removeItem("user_token");
  };

  return (
    <AuthContext.Provider
      value={{ user, perfil, signed: !!user, signin, signup, signout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
