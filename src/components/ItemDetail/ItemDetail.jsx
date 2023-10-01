import Card from "react-bootstrap/Card";
import "./ItemDetail.css";
import { Counter } from "../Counter";
import { Loader } from "../Loader";

export const ItemDetail = (props) => {
  const { product, loading } = props;

  return loading ? (
    <Loader />
  ) : product ? (
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
  );
};

export default ItemDetail;
