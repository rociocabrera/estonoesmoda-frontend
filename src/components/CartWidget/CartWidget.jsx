import { BagCheck } from "react-bootstrap-icons";

function CartWidget() {
  return (
    <div className="cart-icon">
      <BagCheck />
      <i className="fa fa-shopping-cart"></i>
      <span id="cart-count">0</span>
    </div>
  );
}

export default CartWidget;
