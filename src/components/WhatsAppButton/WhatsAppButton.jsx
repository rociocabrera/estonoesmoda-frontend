import { Whatsapp } from "react-bootstrap-icons";
import "./WhatsAppButton.css";

const WhatsAppButton = () => {
  const phoneNumber = "50686648591";
  const message = "Hola! Me interesa consultar sobre sus productos y servicios.";
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="whatsappButton"
      aria-label="Contactar por WhatsApp"
    >
      <Whatsapp />
    </a>
  );
};

export default WhatsAppButton;
