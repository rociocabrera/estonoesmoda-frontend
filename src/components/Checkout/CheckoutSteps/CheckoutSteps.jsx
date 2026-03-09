import { Check } from "react-bootstrap-icons";
import "./CheckoutSteps.css";

const CheckoutSteps = ({ currentStep }) => {
  const steps = [
    { number: 1, label: "Carrito" },
    { number: 2, label: "Entrega" },
    { number: 3, label: "Pago" },
  ];

  return (
    <div className="checkoutSteps">
      {steps.map((step, index) => (
        <div key={step.number} className="stepWrapper">
          <div
            className={`step ${
              currentStep > step.number
                ? "completed"
                : currentStep === step.number
                ? "active"
                : ""
            }`}
          >
            {currentStep > step.number ? <Check /> : step.number}
          </div>
          <span className={`stepLabel ${currentStep >= step.number ? "active" : ""}`}>
            {step.label}
          </span>
          {index < steps.length - 1 && (
            <div className={`stepConnector ${currentStep > step.number ? "completed" : ""}`} />
          )}
        </div>
      ))}
    </div>
  );
};

export default CheckoutSteps;
