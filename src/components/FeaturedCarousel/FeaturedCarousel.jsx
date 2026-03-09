import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getAllProducts } from "../../api/products";
import "./FeaturedCarousel.css";

// Productos destacados por nombre
const FEATURED_PRODUCTS = [
  "Butterfly Shirt",
  "Black Shirt",
  "Blue Jean",
  "Square Dress",
  "Bby Pink Shirt"
];

const FeaturedCarousel = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        const allProducts = await getAllProducts();
        // Filtrar productos destacados por nombre
        const featured = FEATURED_PRODUCTS.map(name =>
          allProducts.find(p =>
            p.name?.toLowerCase().includes(name.toLowerCase()) ||
            p.title?.toLowerCase().includes(name.toLowerCase())
          )
        ).filter(Boolean);

        // Duplicar array para loop infinito
        const productsToShow = featured.length > 0 ? featured : allProducts.slice(0, 5);
        setProducts([...productsToShow, ...productsToShow]);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching featured products:", error);
        setLoading(false);
      }
    };

    fetchFeaturedProducts();
  }, []);

  if (loading) {
    return (
      <section className="featuredSection">
        <h2 className="featuredTitle">Destacados</h2>
        <div className="featuredLoading">Cargando...</div>
      </section>
    );
  }

  if (products.length === 0) return null;

  return (
    <section className="featuredSection">
      <h2 className="featuredTitle">Destacados</h2>

      <div className="carouselContainer">
        <div className="carouselTrack">
          {products.map((product, index) => (
            <Link
              to={`/item/${product.slug}`}
              className="carouselItem"
              key={`${product.id}-${index}`}
            >
              <div className="carouselImgWrapper">
                <img
                  src={product.img}
                  alt={product.title || product.name}
                  className="carouselImg"
                />
                <div className="carouselOverlay">
                  <span className="viewProductBtn">Ver Producto</span>
                </div>
              </div>
              <div className="carouselInfo">
                <h3 className="carouselProductName">{product.title || product.name}</h3>
                <span className="carouselProductPrice">₡{(product.price || 0).toLocaleString()}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedCarousel;
