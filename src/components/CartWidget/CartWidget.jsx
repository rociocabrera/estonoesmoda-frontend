import { BagCheck } from "react-bootstrap-icons";
import "./CartWidget.css";

function CartWidget() {
  return (
    <div className={["cart-icon, bagcart"]}>
      <BagCheck />
      <i className="fa fa-shopping-cart"></i>
      <span id="cart-count" className="counter">
        1
      </span>
    </div>
  );
}

export default CartWidget;
