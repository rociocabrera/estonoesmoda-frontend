import { Link } from "react-router-dom";
import Layout from "../components/Layout/Layout";
import "./NotFound.css";

const NotFound = () => {
  return (
    <Layout>
      <div className="notFoundContainer">
        <div className="notFoundContent">
          <img
            src="/images/logo.png"
            alt="Esto no es Moda"
            className="notFoundLogo"
          />
          <h1 className="notFoundTitle">404</h1>
          <h2 className="notFoundSubtitle">Página no encontrada</h2>
          <p className="notFoundText">
            Lo sentimos, la página que buscas no existe o fue movida.
          </p>
          <div className="notFoundActions">
            <Link to="/" className="notFoundBtn primary">
              Volver al inicio
            </Link>
            <Link to="/contact" className="notFoundBtn secondary">
              Contactanos
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default NotFound;
