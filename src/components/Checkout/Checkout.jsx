import { Brief } from "./Brief";
import "./Checkout.css";
import { CartItem } from "./CartItem";

const Cart = ({ cart, removeFromCart, clearCart, finishPurchase, getTotalPrice }) => {
  return (
    <div className="cartContainer">
      {cart.map(({ item, quantity }) => (
        <CartItem key={item.id} item={item} quantity={quantity} removeFromCart={removeFromCart} />
      ))}
      <Brief getTotalPrice={getTotalPrice} clearCart={clearCart} finishPurchase={finishPurchase} />
    </div>
  );
};

export default Cart;
