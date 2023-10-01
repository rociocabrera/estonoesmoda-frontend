import { Item } from "../Item";
import "./ItemList.css";
import { Loader } from "../Loader";

const ItemList = (props) => {
  const { products, loading } = props;
  return loading ? (
    <Loader />
  ) : (
    <div className="itemlist">
      {products.map((product) => (
        <Item key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ItemList;
