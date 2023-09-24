import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import "./Item.css";

const Item = ({ product }) => {
  return (
    <Card className="cardStyle" key={product.id}>
      <Card.Img className="img" variant="top" src={`/images/${product.img}`} />
      <Card.Body>
        <Card.Title className="productTitle">{product.title}</Card.Title>
        <Link to={`/item/${product.slug}`}>
          <Button className="buttonDetails" variant="primary">
            See details
          </Button>
        </Link>
      </Card.Body>
    </Card>
  );
};

export default Item;
