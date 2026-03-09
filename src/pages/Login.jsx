import Layout from "../components/Layout/Layout";
import { useState } from "react";
import { PersonCircle } from "react-bootstrap-icons";
import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Implementar autenticación
    console.log("Login attempt:", { email, password });
  };

  return (
    <Layout>
      <div className="loginPage">
        <div className="loginCard">
          <div className="loginHeader">
            <PersonCircle className="loginAvatar" />
            <h2>Iniciar Sesión</h2>
          </div>
          <form onSubmit={handleSubmit} className="loginForm">
            <div className="formGroup">
              <label htmlFor="email">Correo electrónico</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="tu@email.com"
                required
              />
            </div>
            <div className="formGroup">
              <label htmlFor="password">Contraseña</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
              />
            </div>
            <button type="submit" className="loginBtn">
              Ingresar
            </button>
          </form>
          <div className="loginFooter">
            <a href="#" className="forgotPassword">¿Olvidaste tu contraseña?</a>
            <p className="registerLink">
              ¿No tenés cuenta? <a href="#">Registrate</a>
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Login;
