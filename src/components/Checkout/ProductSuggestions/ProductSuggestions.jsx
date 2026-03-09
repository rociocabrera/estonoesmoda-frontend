import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getAllProducts } from "../../../api/products";
import "./ProductSuggestions.css";

const ProductSuggestions = ({ currentCartItems = [] }) => {
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSuggestions = async () => {
      try {
        const allProducts = await getAllProducts();
        // Filtrar productos que no están en el carrito
        const cartIds = currentCartItems.map(({ item }) => item.id);
        const filteredProducts = allProducts.filter(
          (product) => !cartIds.includes(product.id)
        );
        // Tomar 4 productos aleatorios como sugerencias
        const shuffled = filteredProducts.sort(() => 0.5 - Math.random());
        setSuggestions(shuffled.slice(0, 4));
        setLoading(false);
      } catch (error) {
        console.error("Error fetching suggestions:", error);
        setLoading(false);
      }
    };

    fetchSuggestions();
  }, [currentCartItems]);

  if (loading || suggestions.length === 0) return null;

  return (
    <div className="suggestionsContainer">
      <h3 className="suggestionsTitle">También te puede interesar</h3>
      <div className="suggestionsGrid">
        {suggestions.map((product) => (
          <Link
            to={`/item/${product.slug}`}
            key={product.id}
            className="suggestionCard"
          >
            <div className="suggestionImgWrapper">
              <img
                src={product.img}
                alt={product.title}
                className="suggestionImg"
              />
            </div>
            <div className="suggestionInfo">
              <span className="suggestionName">{product.title}</span>
              <span className="suggestionPrice">₡{(product.price || 0).toLocaleString()}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ProductSuggestions;
