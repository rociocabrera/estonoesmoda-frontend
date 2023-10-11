import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import "./Item.css";

const Item = ({ product }) => {
  return (
    <div className="itemContainer">
      <Card className="cardStyle" key={product.id}>
        <Card.Img className="CardImg" variant="top" src={product.img} />
        <Card.Body>
          <Card.Title className="productTitle">{product.title}</Card.Title>
          <Card.Text className="productPrice">${product.price}</Card.Text>
          <Link to={`/item/${product.slug}`}>
            <Button className="buttonDetails" variant="primary">
              See details
            </Button>
          </Link>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Item;
