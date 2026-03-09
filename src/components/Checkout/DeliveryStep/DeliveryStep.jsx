import { useState } from "react";
import { Truck, GeoAlt, Shop } from "react-bootstrap-icons";
import "./DeliveryStep.css";

const shippingOptions = [
  {
    id: "moto",
    name: "MOTO EN EL DÍA",
    description: "Entrega en el día para San José",
    price: 2500,
    icon: Truck,
  },
  {
    id: "correo",
    name: "Correo de Costa Rica",
    description: "3-5 días hábiles a todo el país",
    price: 1500,
    icon: GeoAlt,
  },
  {
    id: "pickup",
    name: "Retiro en tienda",
    description: "Carmen de Guadalupe, San José",
    price: 0,
    icon: Shop,
  },
];

const DeliveryStep = ({ deliveryData, onDataChange, onNext, onBack }) => {
  const [errors, setErrors] = useState({});

  const handleInputChange = (field, value) => {
    onDataChange({ ...deliveryData, [field]: value });
    if (errors[field]) {
      setErrors({ ...errors, [field]: null });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!deliveryData.name?.trim()) newErrors.name = "Ingresá tu nombre";
    if (!deliveryData.email?.trim()) newErrors.email = "Ingresá tu email";
    if (!deliveryData.phone?.trim()) newErrors.phone = "Ingresá tu teléfono";
    if (!deliveryData.shippingMethod) newErrors.shippingMethod = "Seleccioná un método de envío";

    if (deliveryData.shippingMethod !== "pickup") {
      if (!deliveryData.address?.trim()) newErrors.address = "Ingresá tu dirección";
      if (!deliveryData.province?.trim()) newErrors.province = "Seleccioná tu provincia";
      if (!deliveryData.canton?.trim()) newErrors.canton = "Ingresá tu cantón";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      onNext();
    }
  };

  const selectedShipping = shippingOptions.find((opt) => opt.id === deliveryData.shippingMethod);

  return (
    <div className="deliveryStep">
      <div className="deliveryContent">
        <div className="deliveryForm">
          <h3 className="sectionTitle">Datos de contacto</h3>

          <div className="formRow">
            <div className="formGroup">
              <label>Nombre completo *</label>
              <input
                type="text"
                value={deliveryData.name || ""}
                onChange={(e) => handleInputChange("name", e.target.value)}
                placeholder="Tu nombre"
                className={errors.name ? "error" : ""}
              />
              {errors.name && <span className="errorText">{errors.name}</span>}
            </div>
          </div>

          <div className="formRow twoColumns">
            <div className="formGroup">
              <label>Email *</label>
              <input
                type="email"
                value={deliveryData.email || ""}
                onChange={(e) => handleInputChange("email", e.target.value)}
                placeholder="tu@email.com"
                className={errors.email ? "error" : ""}
              />
              {errors.email && <span className="errorText">{errors.email}</span>}
            </div>
            <div className="formGroup">
              <label>Teléfono *</label>
              <input
                type="tel"
                value={deliveryData.phone || ""}
                onChange={(e) => handleInputChange("phone", e.target.value)}
                placeholder="+506 8888 8888"
                className={errors.phone ? "error" : ""}
              />
              {errors.phone && <span className="errorText">{errors.phone}</span>}
            </div>
          </div>

          <h3 className="sectionTitle">Método de envío</h3>

          <div className="shippingOptions">
            {shippingOptions.map((option) => {
              const Icon = option.icon;
              return (
                <div
                  key={option.id}
                  className={`shippingOption ${
                    deliveryData.shippingMethod === option.id ? "selected" : ""
                  }`}
                  onClick={() => handleInputChange("shippingMethod", option.id)}
                >
                  <div className="shippingOptionIcon">
                    <Icon />
                  </div>
                  <div className="shippingOptionInfo">
                    <span className="shippingOptionName">{option.name}</span>
                    <span className="shippingOptionDesc">{option.description}</span>
                  </div>
                  <div className="shippingOptionPrice">
                    {option.price === 0 ? "Gratis" : `₡${option.price.toLocaleString()}`}
                  </div>
                </div>
              );
            })}
            {errors.shippingMethod && (
              <span className="errorText">{errors.shippingMethod}</span>
            )}
          </div>

          {deliveryData.shippingMethod && deliveryData.shippingMethod !== "pickup" && (
            <>
              <h3 className="sectionTitle">Dirección de envío</h3>

              <div className="formRow">
                <div className="formGroup">
                  <label>Dirección *</label>
                  <input
                    type="text"
                    value={deliveryData.address || ""}
                    onChange={(e) => handleInputChange("address", e.target.value)}
                    placeholder="Calle, número, barrio"
                    className={errors.address ? "error" : ""}
                  />
                  {errors.address && <span className="errorText">{errors.address}</span>}
                </div>
              </div>

              <div className="formRow twoColumns">
                <div className="formGroup">
                  <label>Provincia *</label>
                  <select
                    value={deliveryData.province || ""}
                    onChange={(e) => handleInputChange("province", e.target.value)}
                    className={errors.province ? "error" : ""}
                  >
                    <option value="">Seleccionar...</option>
                    <option value="San José">San José</option>
                    <option value="Alajuela">Alajuela</option>
                    <option value="Cartago">Cartago</option>
                    <option value="Heredia">Heredia</option>
                    <option value="Guanacaste">Guanacaste</option>
                    <option value="Puntarenas">Puntarenas</option>
                    <option value="Limón">Limón</option>
                  </select>
                  {errors.province && <span className="errorText">{errors.province}</span>}
                </div>
                <div className="formGroup">
                  <label>Cantón *</label>
                  <input
                    type="text"
                    value={deliveryData.canton || ""}
                    onChange={(e) => handleInputChange("canton", e.target.value)}
                    placeholder="Tu cantón"
                    className={errors.canton ? "error" : ""}
                  />
                  {errors.canton && <span className="errorText">{errors.canton}</span>}
                </div>
              </div>

              <div className="formRow">
                <div className="formGroup">
                  <label>Código postal</label>
                  <input
                    type="text"
                    value={deliveryData.postalCode || ""}
                    onChange={(e) => handleInputChange("postalCode", e.target.value)}
                    placeholder="10101"
                  />
                </div>
              </div>

              <div className="formRow">
                <div className="formGroup">
                  <label>Notas adicionales</label>
                  <textarea
                    value={deliveryData.notes || ""}
                    onChange={(e) => handleInputChange("notes", e.target.value)}
                    placeholder="Indicaciones para la entrega..."
                    rows={3}
                  />
                </div>
              </div>
            </>
          )}

          {deliveryData.shippingMethod === "pickup" && (
            <div className="pickupInfo">
              <h4>Dirección de retiro</h4>
              <p>Carmen de Guadalupe, San José, Costa Rica</p>
              <p className="pickupNote">Te contactaremos para coordinar el horario de retiro</p>
            </div>
          )}
        </div>
      </div>

      <div className="deliveryActions">
        <button className="backBtn" onClick={onBack}>
          Volver al carrito
        </button>
        <button className="nextBtn" onClick={handleSubmit}>
          Continuar al pago
        </button>
      </div>
    </div>
  );
};

export { shippingOptions };
export default DeliveryStep;
