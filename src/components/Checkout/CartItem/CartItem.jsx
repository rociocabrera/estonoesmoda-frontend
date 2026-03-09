import { useContext } from "react";
import { Link } from "react-router-dom";
import { DashLg, PlusLg } from "react-bootstrap-icons";
import { CartContext } from "../../../context/CartContext";
import "./CartItem.css";

const CartItem = ({ item, quantity }) => {
  const { removeFromCart, updateQuantity } = useContext(CartContext);

  const handleDecrease = () => {
    if (quantity > 1) {
      updateQuantity(item.id, quantity - 1);
    }
  };

  const handleIncrease = () => {
    updateQuantity(item.id, quantity + 1);
  };

  return (
    <div className="cart">
      <Link to={`/item/${item.slug}`} className="cartProductLink">
        <span className="imgShoppingCart">
          <img className="cartImg" src={item.img} alt={item.title} />
        </span>
      </Link>
      <span className="cartParagraph">
        <Link to={`/item/${item.slug}`} className="cartTitleLink">
          <h3>{item.title}</h3>
        </Link>
        <p>Precio: ₡{(item.price || 0).toLocaleString()}</p>
        <div className="quantitySelector">
          <button
            type="button"
            className="quantityBtn"
            onClick={handleDecrease}
            disabled={quantity <= 1}
            aria-label="Disminuir cantidad"
          >
            <DashLg />
          </button>
          <span className="quantityValue">{quantity}</span>
          <button
            type="button"
            className="quantityBtn"
            onClick={handleIncrease}
            aria-label="Aumentar cantidad"
          >
            <PlusLg />
          </button>
        </div>
        <p className="totalPrice">Subtotal: ₡{((item.price || 0) * quantity).toLocaleString()}</p>
      </span>
      <button type="button" className="removeProduct" onClick={() => removeFromCart(item.id)}>
        Eliminar
      </button>
    </div>
  );
};

export default CartItem;
