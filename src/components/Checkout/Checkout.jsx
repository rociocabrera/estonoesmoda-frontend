import { Brief } from "./Brief";
import "./Checkout.css";
import { CartItem } from "./CartItem";
import { ToastContainer } from "react-toastify";

const Cart = ({ cart, removeFromCart, clearCart, finishPurchase, getTotalPrice }) => {
  return (
    <div className="cartContainer">
      {cart.map(({ item, quantity }) => (
        <CartItem key={item.id} item={item} quantity={quantity} removeFromCart={removeFromCart} />
      ))}
      <Brief getTotalPrice={getTotalPrice} clearCart={clearCart} finishPurchase={finishPurchase} />
      <ToastContainer position="top-center" />
    </div>
  );
};

export default Cart;
