import { Item } from "../Item";
import "./ItemList.css";

const ItemList = (props) => {
  console.log(props);
  const { products, loading } = props;
  return loading ? (
    <span> Loading... </span>
  ) : (
    <div className="itemlist">
      {products.map((product) => (
        <Item key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ItemList;
