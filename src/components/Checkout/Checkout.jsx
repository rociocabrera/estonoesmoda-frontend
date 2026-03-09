import { useState } from "react";
import { Brief } from "./Brief";
import { CartItem } from "./CartItem";
import { CheckoutSteps } from "./CheckoutSteps";
import { DeliveryStep } from "./DeliveryStep";
import { PaymentStep } from "./PaymentStep";
import { ProductSuggestions } from "./ProductSuggestions";
import { OrderConfirmation } from "./OrderConfirmation";
import { ToastContainer, toast } from "react-toastify";
import "./Checkout.css";

const Cart = ({ cart, clearCart, finishPurchase, getTotalPrice }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [deliveryData, setDeliveryData] = useState({});
  const [paymentData, setPaymentData] = useState({});
  const [orderNumber, setOrderNumber] = useState(null);
  const [orderSummary, setOrderSummary] = useState([]);
  const [orderTotal, setOrderTotal] = useState(0);

  const handleNextStep = () => {
    setCurrentStep((prev) => Math.min(prev + 1, 4));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePrevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleFinishPurchase = async () => {
    try {
      // Guardar datos del pedido antes de limpiar el carrito
      setOrderSummary([...cart]);
      setOrderTotal(getTotalPrice());

      // Pasar datos del cliente a finishPurchase
      const customerData = {
        customer: {
          name: deliveryData.name || '',
          email: deliveryData.email || '',
          phone: deliveryData.phone || ''
        },
        shipping: {
          method: deliveryData.shippingMethod || '',
          address: deliveryData.address || '',
          province: deliveryData.province || '',
          canton: deliveryData.canton || '',
          postalCode: deliveryData.postalCode || '',
          notes: deliveryData.notes || ''
        },
        payment: {
          method: paymentData.method || '',
          comments: paymentData.comments || ''
        }
      };

      const result = await finishPurchase(customerData);

      // Generar número de orden
      const generatedOrderNumber = result || Date.now().toString(36).toUpperCase();
      setOrderNumber(generatedOrderNumber);

      // Ir a la pantalla de confirmación
      setCurrentStep(4);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (error) {
      toast.error("Error al procesar el pedido. Intentá de nuevo.");
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <>
            <div className="cartContainer">
              <div className="cartItems">
                {cart.map(({ item, quantity }) => (
                  <CartItem key={item.id} item={item} quantity={quantity} />
                ))}
              </div>
              <Brief
                getTotalPrice={getTotalPrice}
                clearCart={clearCart}
                onContinue={handleNextStep}
                showContinue={cart.length > 0}
              />
            </div>
            {cart.length > 0 && <ProductSuggestions currentCartItems={cart} />}
          </>
        );
      case 2:
        return (
          <DeliveryStep
            deliveryData={deliveryData}
            onDataChange={setDeliveryData}
            onNext={handleNextStep}
            onBack={handlePrevStep}
          />
        );
      case 3:
        return (
          <PaymentStep
            deliveryData={deliveryData}
            paymentData={paymentData}
            onPaymentChange={setPaymentData}
            cart={cart}
            getTotalPrice={getTotalPrice}
            onBack={handlePrevStep}
            onFinish={handleFinishPurchase}
            onEditDelivery={() => setCurrentStep(2)}
          />
        );
      case 4:
        return (
          <OrderConfirmation
            orderNumber={orderNumber}
            orderSummary={orderSummary}
            getTotalPrice={() => orderTotal}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="checkoutWrapper">
      <CheckoutSteps currentStep={currentStep} />
      {renderStep()}
      <ToastContainer position="top-center" />
    </div>
  );
};

export default Cart;
