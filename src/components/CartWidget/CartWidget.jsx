import { BagCheck } from "react-bootstrap-icons";
import "./CartWidget.css";
import { useContext } from "react";
import { CartContext } from "../../context/CartContext";
import { Link } from "react-router-dom";

function CartWidget() {
  const { countTotalItems } = useContext(CartContext);

  return (
    <div className={["cart-icon, bagcart"]}>
      <Link to="/cart">
        <BagCheck />
      </Link>
      <i className="fa fa-shopping-cart"></i>
      <span id="cart-count" className="counter">
        {countTotalItems()}
      </span>
    </div>
  );
}

export default CartWidget;
