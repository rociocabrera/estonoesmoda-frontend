import { BagCheck } from "react-bootstrap-icons";
import "./CartWidget.css";
import { useContext, useState } from "react";
import { CartContext } from "../../context/CartContext";
import { Link, useNavigate } from "react-router-dom";
import { CartModal } from "../CartModal";

function CartWidget() {
  const { countTotalItems } = useContext(CartContext);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const itemCount = countTotalItems();

  const handleCartClick = (e) => {
    e.preventDefault();
    if (itemCount === 0) {
      setShowModal(true);
    } else {
      navigate("/cart");
    }
  };

  return (
    <>
      <div className="cart-icon bagcart" onClick={handleCartClick} style={{ cursor: "pointer" }}>
        <BagCheck />
        <i className="fa fa-shopping-cart"></i>
        <span id="cart-count" className="counter">
          {itemCount}
        </span>
      </div>
      <CartModal isOpen={showModal} onClose={() => setShowModal(false)} />
    </>
  );
}

export default CartWidget;
