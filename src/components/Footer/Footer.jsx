import { Link } from "react-router-dom";
import { Instagram, Facebook, Envelope, GeoAlt, Telephone, Scissors, Tools } from "react-bootstrap-icons";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footerMain">
        <div className="footerContainer">
          {/* Brand Column */}
          <div className="footerColumn">
            <h3 className="footerLogo">Esto no es Moda</h3>
            <p className="footerTagline">Moda sostenible y trabajos personalizados</p>
            <div className="socialLinks">
              <a href="https://www.instagram.com/_estonoesmoda_?igsh=MXgyMzI5N3gyaWw2cg==" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <Instagram />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                <Facebook />
              </a>
            </div>
          </div>

          {/* Services Column */}
          <div className="footerColumn">
            <h4 className="footerTitle">Servicios</h4>
            <ul className="footerServices">
              <li><Scissors /> Reparo y modifico prendas</li>
              <li><Tools /> Reciclaje de prendas</li>
              <li><Scissors /> Prendas a pedido desde cero</li>
              <li>Patronaje incluido</li>
              <li>Trabajos personalizados y artesanales</li>
            </ul>
          </div>

          {/* How I Work Column */}
          <div className="footerColumn">
            <h4 className="footerTitle">¿Cómo trabajo?</h4>
            <ol className="footerSteps">
              <li>Cotización</li>
              <li>Acordar día y hora para traer prendas y tomar medidas</li>
              <li>Estimación de tiempo de trabajo</li>
              <li>Confirmación con seña del 50%</li>
            </ol>
          </div>

          {/* Contact Column */}
          <div className="footerColumn">
            <h4 className="footerTitle">Contacto</h4>
            <ul className="footerContact">
              <li>
                <Telephone />
                <span>+506 8664 8591</span>
              </li>
              <li>
                <GeoAlt />
                <span>Carmen de Guadalupe, San José, Costa Rica</span>
              </li>
              <li>
                <Envelope />
                <span>info@estonoesmoda.com</span>
              </li>
            </ul>
          </div>

          {/* Links Column */}
          <div className="footerColumn">
            <h4 className="footerTitle">Navegación</h4>
            <ul className="footerLinks">
              <li><Link to="/">Inicio</Link></li>
              <li><Link to="/about">Nosotros</Link></li>
              <li><Link to="/size-guide">Guía de Tallas</Link></li>
              <li><Link to="/shipping">Envíos</Link></li>
              <li><Link to="/returns">Devoluciones</Link></li>
              <li><Link to="/faq">Preguntas Frecuentes</Link></li>
              <li><Link to="/contact">Contacto</Link></li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="footerBottom">
        <div className="footerContainer">
          <span>&copy; 2026 Esto no es Moda - Todos los derechos reservados</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
