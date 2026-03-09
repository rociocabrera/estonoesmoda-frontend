import "./AddItemButton.css";

export const AddItemButton = (props) => {
  const { onClickAddToCart } = props;

  return (
    <div className="addToCart">
      <button className="addToCartButton" onClick={onClickAddToCart}>
        Agregar al carrito
      </button>
    </div>
  );
};

export default AddItemButton;
