import "./ItemDetailContainer.css";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import { getProductById } from "../../api/products";
import Card from "react-bootstrap/Card";
import { Layout } from "../Layout";
import { Counter } from "../Counter";

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
      <div className="render">
        <div className="welcome">
          <h1 style={{ fontWeight: "lighter" }}>Product Details</h1>
        </div>
        {product ? (
          <div>
            <Card className="cardProduct" key={product.id}>
              <Card.Img className="imgProduct" variant="top" src={`/images/${product.img}`} />
              <h2>{product.name}</h2>
              <p className="productParagraph">ID: {product.id}</p>
              <p className="productParagraph">Price: ${product.price}</p>
              <p className="productParagraph">Description: {product.title}</p>
              <Counter />
            </Card>
          </div>
        ) : (
          <p>Product not found</p>
        )}
      </div>
    </Layout>
  );
}

export default ItemDetailContainer;
