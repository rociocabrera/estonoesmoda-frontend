/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import "./ItemListContainer.css";
import { useParams } from "react-router-dom";
import getProducts from "../../api/products";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";

function ItemListContainer(props) {
  const { id: categoryId } = useParams();

  const [products, setProducts] = useState([]);

  useEffect(() => {
    if (categoryId) {
      getProducts(categoryId).then((productsResult) => {
        setProducts(productsResult);
      });
    }
  }, [categoryId]);

  return (
    <div>
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
    </div>
  );
}

export default ItemListContainer;
