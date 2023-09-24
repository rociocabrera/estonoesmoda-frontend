/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import "./ItemListContainer.css";
import { useParams } from "react-router-dom";
import { getAllProducts, getProductsByCategory } from "../../api/products";
import { Layout } from "../Layout";
import { ItemList } from "../ItemList";

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
        <ItemList products={products} />
      </div>
    </Layout>
  );
}

export default ItemListContainer;
