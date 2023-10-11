import "./Brief.css";

const Brief = ({ getTotalPrice, clearCart, finishPurchase }) => {
  return (
    <div>
      <p>Total: ${getTotalPrice()}</p>
      <button onClick={() => clearCart()}>Clear cart</button>
      <button onClick={() => finishPurchase()}>Finish purchase</button>
    </div>
  );
};

export default Brief;
