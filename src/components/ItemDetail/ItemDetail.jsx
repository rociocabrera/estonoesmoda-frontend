import Card from "react-bootstrap/Card";
import { Counter } from "../Counter";
import "./ItemDetail.css";

export const ItemDetail = (props) => {
  const { product, loading } = props;
  return loading ? (
    <span>Loading...</span>
  ) : (
    <div className="render">
      <div className="welcome">
        <h1 className="greeting">Product Details</h1>
      </div>
      {product ? (
        <div>
          <Card className="cardProduct" key={product.id}>
            <Card.Img className="imgProduct" variant="top" src={`/images/${product.img}`} />
            <span className="cardContent">
              <h2>{product.name}</h2>
              <p className="productParagraph">ID: {product.id}</p>
              <p className="productParagraph">Price: ${product.price}</p>
              <p className="productParagraph">Description: {product.title}</p>
              <Counter />
            </span>
          </Card>
        </div>
      ) : (
        <p>Product not found</p>
      )}
    </div>
  );
};

export default ItemDetail;
