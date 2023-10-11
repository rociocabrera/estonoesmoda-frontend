import Card from "react-bootstrap/Card";
import "./ItemDetail.css";
import { Counter } from "../Counter";
import { Loader } from "../Loader";
import { AddItemButton } from "./AddItemButton";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const ItemDetail = (props) => {
  const { product, loading, addToCart } = props;

  const [count, setCount] = useState(1);

  const onClickAddToCart = () => {
    addToCart(product, count);
    toast.success("Product added to cart");
  };

  return loading ? (
    <Loader />
  ) : product ? (
    <div className="cardItemDetail">
      <Card className="cardProduct" key={product.id}>
        <Card.Img className="imgProduct" variant="top" src={`/images/${product.img}`} />
        <div className="cardDetail">
          <h2>{product.name}</h2>
          <h3>{product.title}</h3>
          <p>{product.description}</p>
          <p className="productParagraph">${product.price}</p>
          {/* add product description */}
          <Counter setCount={setCount} count={count} />
          <AddItemButton onClickAddToCart={onClickAddToCart} />
          <ToastContainer position="top-center" />
        </div>
      </Card>
    </div>
  ) : (
    <p>Product not found</p>
  );
};

export default ItemDetail;
