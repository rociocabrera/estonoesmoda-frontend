import { useState } from "react";
import Layout from "../components/Layout/Layout";
import { ChevronDown, ChevronUp } from "react-bootstrap-icons";
import "./FAQ.css";

const faqData = [
  {
    question: "¿Las prendas tienen cambio?",
    answer: `No, las prendas no tienen cambio ni devolución. Todos los detalles de la prenda están aclarados en cada publicación y siempre está disponible el chat para despejar dudas antes de comprar.

Siendo un emprendimiento de moda circular no contamos con stock ni variedad de talles de una misma prenda. Cada prenda es única.`
  },
  {
    question: "¿Dónde se puede retirar?",
    answer: "Se puede retirar en Carmen de Guadalupe, San José (día y horario a coordinar por WhatsApp)."
  },
  {
    question: "¿Se hacen envíos?",
    answer: "Sí, se hacen envíos por MOTO EN EL DÍA dentro del Gran Área Metropolitana o con Correo de Costa Rica a todo el territorio nacional."
  },
  {
    question: "¿Cómo me tomo las medidas?",
    answer: "Las medidas de las prendas se toman en plano, de lado a lado. Por lo tanto es la mitad de la medida de contorno."
  },
  {
    question: "¿Cuáles son los métodos de pago?",
    answer: "Aceptamos SINPE Móvil, transferencia bancaria y efectivo al momento del retiro."
  },
  {
    question: "¿Cuánto demora un envío?",
    answer: "Los envíos por moto dentro del GAM generalmente se realizan el mismo día o al día siguiente. Los envíos por Correo de Costa Rica pueden demorar entre 3 a 7 días hábiles dependiendo de la zona."
  }
];

const FAQItem = ({ question, answer, isOpen, onClick }) => {
  return (
    <div className={`faqItem ${isOpen ? "open" : ""}`}>
      <button className="faqQuestion" onClick={onClick}>
        <span>{question}</span>
        {isOpen ? <ChevronUp /> : <ChevronDown />}
      </button>
      <div className={`faqAnswer ${isOpen ? "show" : ""}`}>
        <p>{answer}</p>
      </div>
    </div>
  );
};

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleQuestion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <Layout>
      <div className="faqContainer">
        <h1 className="faqTitle">Preguntas Frecuentes</h1>
        <p className="faqSubtitle">
          Encontrá respuestas a las dudas más comunes sobre nuestros productos y servicios
        </p>

        <div className="faqList">
          {faqData.map((item, index) => (
            <FAQItem
              key={index}
              question={item.question}
              answer={item.answer}
              isOpen={openIndex === index}
              onClick={() => toggleQuestion(index)}
            />
          ))}
        </div>

        <div className="faqContact">
          <h3>¿Tenés otra pregunta?</h3>
          <p>No dudes en contactarnos por WhatsApp o a través de nuestras redes sociales.</p>
          <a
            href="https://wa.me/50686648591"
            target="_blank"
            rel="noopener noreferrer"
            className="faqWhatsappBtn"
          >
            Escribinos por WhatsApp
          </a>
        </div>
      </div>
    </Layout>
  );
};

export default FAQ;
