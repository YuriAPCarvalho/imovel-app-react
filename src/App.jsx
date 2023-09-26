import React from "react";
import RoutesApp from "./routes";
import { AuthProvider } from "./contexts/auth";
import GlobalStyle from "./styles/global";
import { BrowserRouter } from "react-router-dom";

const App = () => (
  <BrowserRouter>
  <AuthProvider>
    <RoutesApp />
    <GlobalStyle />
  </AuthProvider>
  </BrowserRouter>

);

export default App;
