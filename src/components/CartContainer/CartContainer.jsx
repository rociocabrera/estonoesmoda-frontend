import { Layout } from "../Layout";
import { Checkout } from "../Checkout";
import { useContext } from "react";
import { CartContext } from "../../context/CartContext";

const CartContainer = () => {
  const { cart, removeFromCart, clearCart, finishPurchase, getTotalPrice } = useContext(CartContext);

  return (
    <Layout>
      <div className="render">
        <div className="welcome">
          <h1 className="greeting">Shopping Cart</h1>
        </div>
        <Checkout cart={cart} removeFromCart={removeFromCart} clearCart={clearCart} finishPurchase={finishPurchase} getTotalPrice={getTotalPrice} />
      </div>
    </Layout>
  );
};

export default CartContainer;
