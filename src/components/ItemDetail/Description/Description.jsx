import "./Description.css";

const Description = ({ product }) => {
  return (
    <>
      <h2>{product.name}</h2>
      <h3>{product.title}</h3>
      <p>{product.description}</p>
      <p className="productParagraph">${product.price}</p>
    </>
  );
};

export default Description;
