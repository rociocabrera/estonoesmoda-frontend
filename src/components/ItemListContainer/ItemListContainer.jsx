/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import "./ItemListContainer.css";
import { useParams } from "react-router-dom";
import { getAllProducts, getProductsByCategoryId } from "../../api/products";
import { getCategoryBySlug } from "../../api/categories";
import { Layout } from "../Layout";
import { ItemList } from "../ItemList";

function ItemListContainer(props) {
  const { id: categorySlug } = useParams();

  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState([]);

  useEffect(() => {
    setLoading(true);
    if (categorySlug) {
      getCategoryBySlug(categorySlug).then((categoryResult) => {
        setCategory(categoryResult);
        getProductsByCategoryId(categoryResult.id).then((productsResult) => {
          setProducts(productsResult);
          setLoading(false);
        });
      });
    } else {
      setCategory({});
      getAllProducts().then((productsResult) => {
        setProducts(productsResult);
        setLoading(false);
      });
    }
  }, [categorySlug]);

  return (
    <Layout>
      <div className="render">
        <div className="welcome">
          <h1 className="greeting">
            {props.greeting} {category.name}
          </h1>
        </div>
        <ItemList products={products} loading={loading} />
      </div>
    </Layout>
  );
}

export default ItemListContainer;
