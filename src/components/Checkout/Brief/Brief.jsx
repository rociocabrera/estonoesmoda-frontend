import { CreditCard, Bank, Cash, Percent } from "react-bootstrap-icons";
import "./Brief.css";

const Brief = ({ getTotalPrice, clearCart, onContinue, showContinue }) => {
  const total = getTotalPrice();
  const transferDiscount = Math.round(total * 0.1);
  const cashDiscount = Math.round(total * 0.15);

  return (
    <div className="briefContainer">
      <h3 className="briefTitle">Resumen de compra</h3>

      <div className="briefRow">
        <span>Subtotal</span>
        <span>₡{total.toLocaleString()}</span>
      </div>

      <div className="briefDivider"></div>

      <div className="briefRow briefTotal">
        <span>Total</span>
        <span>₡{total.toLocaleString()}</span>
      </div>

      {total > 0 && (
        <>
          <div className="promotionsSection">
            <h4 className="promotionsTitle">
              <Percent /> Promociones disponibles
            </h4>

            <div className="promotionItem">
              <div className="promotionIcon">
                <Bank />
              </div>
              <div className="promotionInfo">
                <span className="promotionName">Transferencia / SINPE</span>
                <span className="promotionDiscount">10% OFF - Pagás ₡{(total - transferDiscount).toLocaleString()}</span>
              </div>
            </div>

            <div className="promotionItem">
              <div className="promotionIcon">
                <Cash />
              </div>
              <div className="promotionInfo">
                <span className="promotionName">Efectivo</span>
                <span className="promotionDiscount">15% OFF - Pagás ₡{(total - cashDiscount).toLocaleString()}</span>
              </div>
            </div>

            <div className="promotionItem">
              <div className="promotionIcon">
                <CreditCard />
              </div>
              <div className="promotionInfo">
                <span className="promotionName">3 cuotas sin interés</span>
                <span className="promotionDiscount">Con tarjetas bancarias</span>
              </div>
            </div>
          </div>

          <div className="briefButtons">
            {showContinue && (
              <button className="finishPurchase" onClick={onContinue}>
                Continuar compra
              </button>
            )}
            <button className="clearCart" onClick={() => clearCart()}>
              Vaciar carrito
            </button>
          </div>
        </>
      )}

      {total === 0 && (
        <div className="emptyCartMessage">
          <p>Tu carrito está vacío</p>
          <p>Agregá productos para comenzar</p>
        </div>
      )}
    </div>
  );
};

export default Brief;
