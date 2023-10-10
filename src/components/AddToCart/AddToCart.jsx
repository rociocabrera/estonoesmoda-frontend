import "./AddToCart.css";
import { Link } from "react-router-dom";

export const AddToCart = (props) => {
  const { onClickAddToCart } = props;

  return (
    <div className="addToCart">
      <Link to="/cart/">
        <button className="addToCartButton" onClick={onClickAddToCart}>
          Add to cart
        </button>
      </Link>
    </div>
  );
};

export default AddToCart;
