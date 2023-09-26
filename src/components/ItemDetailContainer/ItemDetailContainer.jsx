import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import { getProductBySlug } from "../../api/products";
import { Layout } from "../Layout";
import { ItemDetail } from "../ItemDetail";

function ItemDetailContainer() {
  const { id: productSlug } = useParams();

  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState([]);

  useEffect(() => {
    if (productSlug) {
      setLoading(true);
      getProductBySlug(productSlug).then((productResult) => {
        setProduct(productResult);
        setLoading(false);
      });
    }
  }, [productSlug]);

  return (
    <Layout>
      <ItemDetail product={product} loading={loading} />
    </Layout>
  );
}

export default ItemDetailContainer;
