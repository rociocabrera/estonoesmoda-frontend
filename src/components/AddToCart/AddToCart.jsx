import "./AddToCart.css";

export const AddToCart = (props) => {
  const { onClickAddToCart } = props;

  return (
    <div className="addToCart">
      <button className="addToCartButton" onClick={onClickAddToCart}>
        Add to cart
      </button>
    </div>
  );
};

export default AddToCart;
