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
      <div className="render">
        <div className="welcome">
          <h1 className="greeting">Product Details</h1>
        </div>
        <ItemDetail product={product} loading={loading} />
      </div>
    </Layout>
  );
}

export default ItemDetailContainer;
