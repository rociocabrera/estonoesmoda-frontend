import { BagCheck } from "react-bootstrap-icons";
import "./CartWidget.css";
import { useContext } from "react";
import { CartContext } from "../../context/CartContext";

function CartWidget() {
  const { countTotalItems } = useContext(CartContext);

  return (
    <div className={["cart-icon, bagcart"]}>
      <BagCheck />
      <i className="fa fa-shopping-cart"></i>
      <span id="cart-count" className="counter">
        {countTotalItems()}
      </span>
    </div>
  );
}

export default CartWidget;
