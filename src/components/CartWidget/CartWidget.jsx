import { BagCheck } from "react-bootstrap-icons";
import "./CartWidget.css";
import { useContext } from "react";
import { CartContext } from "../../context/CartContext";
import { Link } from "react-router-dom";

function CartWidget() {
  const { countTotalItems } = useContext(CartContext);

  return (
    <Link to="/cart">
      <div className={["cart-icon, bagcart"]}>
        <BagCheck />
        <i className="fa fa-shopping-cart"></i>
        <span id="cart-count" className="counter">
          {countTotalItems()}
        </span>
      </div>
    </Link>
  );
}

export default CartWidget;
