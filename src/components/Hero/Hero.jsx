import "./Hero.css";

const Hero = () => {
  const handleScrollToProducts = (e) => {
    e.preventDefault();
    const productsSection = document.getElementById('productos');
    if (productsSection) {
      productsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="hero">
      <div className="hero-overlay"></div>
      <div className="hero-content">
        <h1 className="hero-title">Últimos Ingresos</h1>
        <p className="hero-subtitle">Descubrí las últimas tendencias en moda sostenible</p>
        <a href="#productos" className="hero-cta" onClick={handleScrollToProducts}>
          Ver Colección
        </a>
      </div>
    </section>
  );
};

export default Hero;
