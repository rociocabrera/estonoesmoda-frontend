import { Item } from "../Item";
import "./ItemList.css";
import { ProductSkeletonGrid } from "../ProductSkeleton";

const ItemList = (props) => {
  const { products, loading } = props;
  return loading ? (
    <ProductSkeletonGrid count={8} />
  ) : (
    <div className="itemlist">
      {products.map((product) => (
        <Item key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ItemList;
