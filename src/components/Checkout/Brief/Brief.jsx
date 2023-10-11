import "./Brief.css";

const Brief = ({ getTotalPrice, clearCart, finishPurchase }) => {
  const total = getTotalPrice();
  return (
    <div>
      <p>Total: ${total}</p>
      {total > 0 && (
        <>
          <button onClick={() => clearCart()}>Clear cart</button>
          <button onClick={() => finishPurchase()}>Finish purchase</button>{" "}
        </>
      )}
    </div>
  );
};

export default Brief;
