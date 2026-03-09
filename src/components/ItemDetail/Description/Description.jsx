import "./Description.css";

const Description = ({ product }) => {
  return (
    <>
      <h2 className="productName">{product.name}</h2>
      <h3 className="productSubtitle">{product.title}</h3>
      <p className="productDescription">{product.description}</p>
      <p className="productParagraph">₡{(product.price || 0).toLocaleString()}</p>
    </>
  );
};

export default Description;
