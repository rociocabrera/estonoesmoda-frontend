import "./ItemDetailContainer.css";
import { useParams } from "react-router-dom";
import { useEffect } from "react";

function ItemDetailContainer() {
  const { id: productId } = useParams();

  useEffect(() => {
    if (productId) {
      console.log(`Estas en el producto ${productId}`);
    }
  }, [productId]);

  return (
    <div>
      <h1>Detalle del producto</h1>
    </div>
  );
}

export default ItemDetailContainer;
