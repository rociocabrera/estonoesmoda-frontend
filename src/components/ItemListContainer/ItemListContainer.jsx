/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import "./ItemListContainer.css";
import { useParams } from "react-router-dom";
import { getAllProducts, getProductsByCategory } from "../../api/products";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import { Layout } from "../Layout";

function ItemListContainer(props) {
  const { id: categoryId } = useParams();

  const [products, setProducts] = useState([]);

  useEffect(() => {
    if (categoryId) {
      getProductsByCategory(categoryId).then((productsResult) => {
        setProducts(productsResult);
      });
    } else {
      getAllProducts().then((productsResult) => {
        setProducts(productsResult);
      });
    }
  }, [categoryId]);

  return (
    <Layout>
      <div className="render">
        <div className="welcome">
          <h1 className="greeting">{props.greeting}</h1>
        </div>
        <div className="itemlist">
          {products.map((product) => (
            <Card className="cardStyle" key={product.id}>
              <Card.Img className="img" variant="top" src={`/images/${product.img}`} />
              <Card.Body>
                <Card.Title className="productTitle">{product.title}</Card.Title>
                <Link to={`/item/${product.id}`}>
                  <Button className="buttonDetails" variant="primary">
                    See details
                  </Button>
                </Link>
              </Card.Body>
            </Card>
          ))}
        </div>
      </div>
    </Layout>
  );
}

export default ItemListContainer;
