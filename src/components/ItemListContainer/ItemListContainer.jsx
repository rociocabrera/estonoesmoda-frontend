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

  const [products, setProducts] = useState([]);

  useEffect(() => {
    if (categorySlug) {
      getCategoryBySlug(categorySlug).then((categoryResult) => {
        getProductsByCategoryId(categoryResult.id).then((productsResult) => {
          setProducts(productsResult);
        });
      });
    } else {
      getAllProducts().then((productsResult) => {
        setProducts(productsResult);
      });
    }
  }, [categorySlug]);

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
