import { useState } from "react";
import {
  CreditCard,
  Bank,
  Cash,
  Phone,
  CheckCircleFill,
  PencilSquare,
} from "react-bootstrap-icons";
import { shippingOptions } from "../DeliveryStep";
import "./PaymentStep.css";

const paymentMethods = [
  {
    id: "card",
    name: "Tarjeta de crédito/débito",
    description: "3 cuotas sin interés",
    discount: 0,
    icon: CreditCard,
  },
  {
    id: "transfer",
    name: "Transferencia bancaria",
    description: "10% de descuento",
    discount: 0.1,
    icon: Bank,
  },
  {
    id: "cash",
    name: "Efectivo al retirar",
    description: "15% de descuento",
    discount: 0.15,
    icon: Cash,
  },
  {
    id: "sinpe",
    name: "SINPE Móvil",
    description: "10% de descuento",
    discount: 0.1,
    icon: Phone,
  },
];

const PaymentStep = ({
  deliveryData,
  paymentData,
  onPaymentChange,
  cart,
  getTotalPrice,
  onBack,
  onFinish,
  onEditDelivery,
}) => {
  const [errors, setErrors] = useState({});
  const subtotal = getTotalPrice();
  const selectedShipping = shippingOptions.find(
    (opt) => opt.id === deliveryData.shippingMethod
  );
  const shippingCost = selectedShipping?.price || 0;
  const selectedPayment = paymentMethods.find(
    (m) => m.id === paymentData.method
  );
  const discount = selectedPayment ? subtotal * selectedPayment.discount : 0;
  const total = subtotal + shippingCost - discount;

  const handlePaymentSelect = (methodId) => {
    onPaymentChange({ ...paymentData, method: methodId });
    if (errors.method) {
      setErrors({ ...errors, method: null });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!paymentData.method) newErrors.method = "Seleccioná un método de pago";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      onFinish();
    }
  };

  return (
    <div className="paymentStep">
      <div className="paymentContent">
        <div className="paymentMain">
          <div className="orderReview">
            <div className="reviewHeader">
              <h3>Datos de entrega</h3>
              <button className="editBtn" onClick={onEditDelivery}>
                <PencilSquare /> Editar
              </button>
            </div>
            <div className="reviewContent">
              <p>
                <strong>{deliveryData.name}</strong>
              </p>
              <p>{deliveryData.email}</p>
              <p>{deliveryData.phone}</p>
              {deliveryData.shippingMethod !== "pickup" && (
                <>
                  <p className="addressText">
                    {deliveryData.address}, {deliveryData.canton},{" "}
                    {deliveryData.province}
                  </p>
                  {deliveryData.postalCode && <p>CP: {deliveryData.postalCode}</p>}
                </>
              )}
              <p className="shippingMethod">
                <strong>Envío:</strong> {selectedShipping?.name}
              </p>
              {deliveryData.notes && (
                <p className="notesText">
                  <strong>Notas:</strong> {deliveryData.notes}
                </p>
              )}
            </div>
          </div>

          <h3 className="sectionTitle">Método de pago</h3>
          <div className="paymentMethods">
            {paymentMethods.map((method) => {
              const Icon = method.icon;
              return (
                <div
                  key={method.id}
                  className={`paymentMethod ${
                    paymentData.method === method.id ? "selected" : ""
                  }`}
                  onClick={() => handlePaymentSelect(method.id)}
                >
                  <div className="paymentMethodIcon">
                    <Icon />
                  </div>
                  <div className="paymentMethodInfo">
                    <span className="paymentMethodName">{method.name}</span>
                    <span className="paymentMethodDesc">{method.description}</span>
                  </div>
                  {paymentData.method === method.id && (
                    <CheckCircleFill className="selectedCheck" />
                  )}
                </div>
              );
            })}
            {errors.method && <span className="errorText">{errors.method}</span>}
          </div>

          {paymentData.method === "card" && (
            <div className="cardForm">
              <p className="cardNote">
                Al confirmar, serás redirigido a una pasarela de pago segura.
              </p>
            </div>
          )}

          {(paymentData.method === "transfer" || paymentData.method === "sinpe") && (
            <div className="transferInfo">
              <h4>Datos para {paymentData.method === "sinpe" ? "SINPE" : "transferencia"}</h4>
              {paymentData.method === "sinpe" ? (
                <p>SINPE Móvil: <strong>8664-8591</strong></p>
              ) : (
                <>
                  <p>Banco: <strong>Banco Nacional</strong></p>
                  <p>Cuenta IBAN: <strong>CR0000000000000000000</strong></p>
                  <p>A nombre de: <strong>Esto no es Moda</strong></p>
                </>
              )}
              <p className="transferNote">
                Enviá el comprobante por WhatsApp al 8664-8591
              </p>
            </div>
          )}

          <div className="formRow">
            <div className="formGroup">
              <label>Comentarios adicionales</label>
              <textarea
                value={paymentData.comments || ""}
                onChange={(e) =>
                  onPaymentChange({ ...paymentData, comments: e.target.value })
                }
                placeholder="¿Algún comentario sobre tu pedido?"
                rows={3}
              />
            </div>
          </div>
        </div>

        <div className="paymentSummary">
          <h3>Resumen del pedido</h3>

          <div className="orderItems">
            {cart.map(({ item, quantity }) => (
              <div key={item.id} className="orderItem">
                <img src={item.img} alt={item.title} className="orderItemImg" />
                <div className="orderItemInfo">
                  <span className="orderItemName">{item.title}</span>
                  <span className="orderItemQty">x{quantity}</span>
                </div>
                <span className="orderItemPrice">₡{(item.price * quantity).toLocaleString()}</span>
              </div>
            ))}
          </div>

          <div className="summaryDivider"></div>

          <div className="summaryRow">
            <span>Subtotal</span>
            <span>₡{subtotal.toLocaleString()}</span>
          </div>

          {discount > 0 && (
            <div className="summaryRow discount">
              <span>Descuento ({Math.round(selectedPayment.discount * 100)}%)</span>
              <span>-₡{Math.round(discount).toLocaleString()}</span>
            </div>
          )}

          <div className="summaryDivider"></div>

          <div className="summaryRow total">
            <span>Total</span>
            <span>₡{Math.round(total).toLocaleString()}</span>
          </div>
        </div>
      </div>

      <div className="paymentActions">
        <button className="backBtn" onClick={onBack}>
          Volver a entrega
        </button>
        <button className="finishBtn" onClick={handleSubmit}>
          Confirmar pedido
        </button>
      </div>
    </div>
  );
};

export default PaymentStep;
