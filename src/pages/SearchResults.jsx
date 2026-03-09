import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Layout from "../components/Layout/Layout";
import { ItemList } from "../components/ItemList";
import { getAllProducts } from "../api/products";
import "./SearchResults.css";

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "";
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    setLoading(true);
    getAllProducts().then((allProducts) => {
      setProducts(allProducts);
      const filtered = allProducts.filter((product) =>
        product.title.toLowerCase().includes(query.toLowerCase()) ||
        (product.description && product.description.toLowerCase().includes(query.toLowerCase()))
      );
      setFilteredProducts(filtered);
      setLoading(false);
    });
  }, [query]);

  return (
    <Layout>
      <div className="searchResultsContainer">
        <h1 className="searchTitle">
          Resultados para: <span>"{query}"</span>
        </h1>
        <p className="searchCount">
          {filteredProducts.length} producto{filteredProducts.length !== 1 ? "s" : ""} encontrado{filteredProducts.length !== 1 ? "s" : ""}
        </p>
        {filteredProducts.length === 0 && !loading ? (
          <div className="noResults">
            <p>No encontramos productos que coincidan con tu búsqueda.</p>
            <p>Intentá con otras palabras o explorá nuestras categorías.</p>
          </div>
        ) : (
          <ItemList products={filteredProducts} loading={loading} />
        )}
      </div>
    </Layout>
  );
};

export default SearchResults;
