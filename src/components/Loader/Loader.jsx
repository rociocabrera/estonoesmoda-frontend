import "./Loader.css";

const Loader = () => {
  return (
    <div className="loaderContainer">
      <img
        src="/images/logo.png"
        alt="Cargando..."
        className="loaderLogo"
      />
      <p className="loaderText">Cargando...</p>
    </div>
  );
};

export default Loader;
