import Card from "react-bootstrap/Card";
import "./ItemDetail.css";
import { Counter } from "../Counter";
import { Loader } from "../Loader";
import { AddToCart } from "../AddToCart";

export const ItemDetail = (props) => {
  const { product, loading } = props;

  return loading ? (
    <Loader />
  ) : product ? (
    <div className="cardItemDetail">
      <Card className="cardProduct" key={product.id}>
        <Card.Img className="imgProduct" variant="top" src={`/images/${product.img}`} />
        <div className="cardDetail">
          <h2>{product.name}</h2>
          <p className="productParagraph">{product.title}</p>
          <p className="productParagraph">${product.price}</p>
          {/* add product description */}
          <Counter />
          <AddToCart />
        </div>
      </Card>
    </div>
  ) : (
    <p>Product not found</p>
  );
};

export default ItemDetail;
