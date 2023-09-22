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
      <h1 className="greeting">{props.greeting}</h1>
      {products.map((product) => (
        <Card style={{ width: "18rem" }} key={product.id}>
          <Card.Img variant="top" src={`/images/${product.img}`} />
          <Card.Body>
            <Card.Title>{product.title}</Card.Title>
            <Card.Text></Card.Text>
            <Link to={`/item/${product.id}`}>
              <Button variant="primary">See details</Button>
            </Link>
          </Card.Body>
        </Card>
      ))}
    </Layout>
  );
}

export default ItemListContainer;
