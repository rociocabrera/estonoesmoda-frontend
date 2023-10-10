import Card from "react-bootstrap/Card";
import "./Cart.css";

const Cart = ({ cart, removeFromCart, clearCart, finishPurchase, getTotalPrice }) => {
  return (
    <div className="cartContainer">
      {cart.map(({ item, quantity }) => (
        <div key={item.id} className="cart">
          <span className="imgShoppingCart">
            {" "}
            <Card.Img className="cartImg" variant="top" src={`/images/${item.img}`} />
          </span>
          <span className="cartParagraph">
            <p>{item.title}</p>
            <p>Price: ${item.price}</p>
            <p>Quantity: {quantity} units</p>
            <p>Subtotal: ${item.price * quantity}</p>
            {/* <button> - </button> */}
            <button onClick={() => removeFromCart(item.id)}>Remove product</button>
            {/* <button> + </button> */}
          </span>
        </div>
      ))}
      <div>
        <p>Total: ${getTotalPrice()}</p>
        <button onClick={() => clearCart()}>Clear cart</button>
        <button onClick={() => finishPurchase()}>Finish purchase</button>
      </div>
    </div>
  );
};

export default Cart;
