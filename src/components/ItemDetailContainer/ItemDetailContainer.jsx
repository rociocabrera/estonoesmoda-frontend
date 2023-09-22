import "./ItemDetailContainer.css";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import { getProductById } from "../../api/products";
import Card from "react-bootstrap/Card";
import { Layout } from "../Layout";

function ItemDetailContainer() {
  const { id: productId } = useParams();

  const [product, setProduct] = useState([]);

  useEffect(() => {
    if (productId) {
      getProductById(productId).then((productResult) => {
        setProduct(productResult);
      });
    }
  }, [productId]);

  return (
    <Layout>
      <h1 style={{ fontWeight: "lighter" }}>Product Details</h1>
      {product ? (
        <div>
          <Card style={{ width: "18rem" }} key={product.id}>
            <Card.Img variant="top" src={`/images/${product.img}`} />
            <h2>{product.name}</h2>
            <p>ID: {product.id}</p>
            <p>Price: ${product.price}</p>
            <p>Description: {product.title}</p>
          </Card>
        </div>
      ) : (
        <p>Product not found</p>
      )}
    </Layout>
  );
}

export default ItemDetailContainer;
