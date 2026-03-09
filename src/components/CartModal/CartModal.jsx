import { BagX } from "react-bootstrap-icons";
import { Link } from "react-router-dom";
import "./CartModal.css";

const CartModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <>
      <div className="cartModalOverlay" onClick={onClose} />
      <div className={`cartModal ${isOpen ? "open" : ""}`}>
        <div className="cartModalHeader">
          <h3>Mi Carrito</h3>
          <button className="cartModalClose" onClick={onClose}>
            &times;
          </button>
        </div>
        <div className="cartModalBody">
          <div className="emptyCartContent">
            <BagX className="emptyCartIcon" />
            <h4>Tu carrito está vacío</h4>
            <p>¡Explorá nuestra colección y encontrá prendas únicas!</p>
            <Link to="/" className="continueShopping" onClick={onClose}>
              Ver productos
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default CartModal;
