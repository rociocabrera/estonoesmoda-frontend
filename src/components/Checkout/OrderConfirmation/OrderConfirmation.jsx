import { CheckCircleFill } from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";
import "./OrderConfirmation.css";

const OrderConfirmation = ({ orderNumber, orderSummary, getTotalPrice }) => {
  const navigate = useNavigate();

  const handleBackToStore = () => {
    navigate("/");
  };

  return (
    <div className="orderConfirmation">
      <div className="confirmationContent">
        <div className="successIcon">
          <CheckCircleFill />
        </div>

        <h1 className="confirmationTitle">¡Gracias por tu compra!</h1>

        <p className="confirmationMessage">
          Tu pedido ha sido procesado exitosamente. Te contactaremos pronto para coordinar la entrega.
        </p>

        {orderNumber && (
          <div className="orderNumber">
            <span>Número de orden:</span>
            <strong>#{orderNumber}</strong>
          </div>
        )}

        <div className="orderSummary">
          <h3>Resumen del pedido</h3>
          <div className="summaryItems">
            {orderSummary.map(({ item, quantity }) => (
              <div key={item.id} className="summaryItem">
                <img src={item.img} alt={item.title} className="summaryItemImg" />
                <div className="summaryItemInfo">
                  <span className="summaryItemTitle">{item.title}</span>
                  <span className="summaryItemQty">Cantidad: {quantity}</span>
                </div>
                <span className="summaryItemPrice">₡{(item.price * quantity).toLocaleString()}</span>
              </div>
            ))}
          </div>
          <div className="summaryTotal">
            <span>Total:</span>
            <strong>₡{getTotalPrice().toLocaleString()}</strong>
          </div>
        </div>

        <button className="backToStoreBtn" onClick={handleBackToStore}>
          Volver a la tienda
        </button>
      </div>
    </div>
  );
};

export default OrderConfirmation;
