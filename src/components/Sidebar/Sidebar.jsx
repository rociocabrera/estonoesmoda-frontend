import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getCategories } from "../../api/categories";
import "./Sidebar.css";

const Sidebar = ({ isOpen, onClose }) => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getCategories().then((categoriesResult) => {
      setCategories(categoriesResult);
    });
  }, []);

  return (
    <>
      <div className={`sidebar-overlay ${isOpen ? "active" : ""}`} onClick={onClose} />
      <aside className={`sidebar ${isOpen ? "open" : ""}`}>
        <div className="sidebar-header">
          <h3>Menú</h3>
          <button className="sidebar-close" onClick={onClose}>
            ✕
          </button>
        </div>

        <nav className="sidebar-nav">
          <div className="sidebar-section">
            <h4 className="sidebar-section-title">Categorías</h4>
            <ul className="sidebar-links">
              {categories.map((category) => (
                <li key={category.id}>
                  <Link to={`/category/${category.slug}`} onClick={onClose}>
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="sidebar-section">
            <h4 className="sidebar-section-title">Información</h4>
            <ul className="sidebar-links">
              <li>
                <Link to="/about" onClick={onClose}>
                  Sobre Nosotros
                </Link>
              </li>
              <li>
                <Link to="/size-guide" onClick={onClose}>
                  Guía de Tallas
                </Link>
              </li>
              <li>
                <Link to="/contact" onClick={onClose}>
                  Contacto
                </Link>
              </li>
              <li>
                <Link to="/shipping" onClick={onClose}>
                  Envíos
                </Link>
              </li>
              <li>
                <Link to="/returns" onClick={onClose}>
                  Devoluciones
                </Link>
              </li>
            </ul>
          </div>
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
