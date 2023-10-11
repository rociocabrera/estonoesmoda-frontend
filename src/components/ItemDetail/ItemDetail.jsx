import Card from "react-bootstrap/Card";
import "./ItemDetail.css";
import { ItemQuantitySelector } from "./ItemQuantitySelector";
import { Loader } from "../Loader";
import { AddItemButton } from "./AddItemButton";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Description } from "./Description";

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
          <Description product={product} />
          <ItemQuantitySelector setCount={setCount} count={count} />
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
