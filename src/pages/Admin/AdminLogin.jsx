import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AdminContext } from "../../context/AdminContext";
import "./AdminLogin.css";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { admin, login } = useContext(AdminContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (admin) {
      navigate("/admin");
    }
  }, [admin, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const result = await login(email, password);

    if (result.success) {
      navigate("/admin");
    } else {
      setError("Credenciales incorrectas. Verificá tu email y contraseña.");
    }
    setLoading(false);
  };

  return (
    <div className="adminLoginContainer">
      <div className="adminLoginCard">
        <h1>Panel de Administración</h1>
        <p className="loginSubtitle">Ingresá tus credenciales para continuar</p>

        <form onSubmit={handleSubmit} className="loginForm">
          {error && <div className="loginError">{error}</div>}

          <div className="formGroup">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@estonoesmoda.com"
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

          <button type="submit" className="loginButton" disabled={loading}>
            {loading ? "Ingresando..." : "Ingresar"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
