import Layout from "../components/Layout/Layout";
import "./AboutUs.css";

const AboutUs = () => {
  return (
    <Layout>
      <div className="aboutContainer">
        {/* Sección Sobre Nosotrxs */}
        <section className="aboutSection">
          <h1 className="aboutTitle">Sobre nosotrxs</h1>
          <div className="aboutContent">
            <p>
              Esto No es Moda es un proyecto de moda circular que nace como idea en la cuarentena y se concreta en abril del 2022.
            </p>
            <p>
              En principio era recircular la ropa que no usaba, pero inevitablemente esa idea creció.
            </p>
            <p>
              Actualmente busco nuevas maneras creativas de darle un nuevo uso a la ropa, reparando, cuidando o interviniendo una prenda, y que cada prenda represente el estilo de su nuevx dueñx.
            </p>
          </div>
        </section>

        {/* Sección Presentación */}
        <section className="aboutSection presentationSection">
          <div className="presentationContent">
            <div className="presentationImage">
              <img
                src="/images/julieta.jpg"
                alt="Julieta Laucirica"
                className="founderImage"
                onError={(e) => {
                  e.target.src = "/images/logo.png";
                  e.target.className = "founderImage fallback";
                }}
              />
            </div>
            <div className="presentationText">
              <h2 className="presentationTitle">Hola, soy Julieta</h2>
              <p>
                Mi nombre es Julieta Laucirica y la vida me trajo a construir este proyecto.
              </p>
              <p>
                Después de una crisis personal en cuarentena descubrí la pasión que me despierta la indumentaria y especialmente el vintage. Más adelante encontré más pasiones en el vestuario y en hacer mi propia ropa.
              </p>
              <p>
                Todo el universo de la ropa y la moda circular es una fuente de inspiración en donde usar mi creatividad.
              </p>
              <p className="highlightText">
                Vestirse como espacio de juego explorando las opciones que da utilizar ropa que ya tuvo vida/s.
              </p>
            </div>
          </div>
        </section>

        {/* Sección Valores */}
        <section className="aboutSection valuesSection">
          <h2 className="sectionTitle">Nuestros valores</h2>
          <div className="valuesGrid">
            <div className="valueCard">
              <div className="valueIcon">♻️</div>
              <h3>Circularidad</h3>
              <p>Cada prenda tiene una nueva oportunidad de vida y estilo.</p>
            </div>
            <div className="valueCard">
              <div className="valueIcon">✨</div>
              <h3>Creatividad</h3>
              <p>Transformamos prendas con intervenciones únicas y personalizadas.</p>
            </div>
            <div className="valueCard">
              <div className="valueIcon">🌱</div>
              <h3>Sostenibilidad</h3>
              <p>Contribuimos a reducir el impacto ambiental de la moda.</p>
            </div>
            <div className="valueCard">
              <div className="valueIcon">💚</div>
              <h3>Autenticidad</h3>
              <p>Cada pieza es única, como quien la lleva.</p>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default AboutUs;
