import { Link } from "react-router-dom";
import { useState, useContext } from "react";
import { Heart, HeartFill } from "react-bootstrap-icons";
import { WishlistContext } from "../../context/WishlistContext";
import "./Item.css";

const Item = ({ product }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const { isInWishlist, toggleWishlist } = useContext(WishlistContext);
  const isFavorite = isInWishlist(product.id);

  const handleWishlistClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product);
  };

  return (
    <article className={`cardStyle ${imageLoaded ? 'loaded' : 'loading'}`}>
      <div className="cardImgWrapper">
        {product.isNew && <span className="badge badgeNew">Nuevo</span>}
        {product.discount && <span className="badge badgeSale">-{product.discount}%</span>}
        <button
          className={`wishlistBtn ${isFavorite ? 'active' : ''}`}
          onClick={handleWishlistClick}
          aria-label={isFavorite ? "Quitar de favoritos" : "Agregar a favoritos"}
        >
          {isFavorite ? <HeartFill /> : <Heart />}
        </button>
        <img
          className="cardImg"
          src={product.img}
          alt={product.title}
          loading="lazy"
          onLoad={() => setImageLoaded(true)}
          style={{ opacity: imageLoaded ? 1 : 0 }}
        />
        {!imageLoaded && <div className="imagePlaceholder"></div>}
        <div className="cardOverlay">
          <Link to={`/item/${product.slug}`} className="quickViewBtn">
            Ver Producto
          </Link>
        </div>
      </div>
      <div className="cardBody">
        <h3 className="productTitle">{product.title}</h3>
        <div className="priceContainer">
          {product.originalPrice && (
            <span className="originalPrice">₡{product.originalPrice.toLocaleString()}</span>
          )}
          <span className="productPrice">₡{(product.price || 0).toLocaleString()}</span>
        </div>
      </div>
    </article>
  );
};

export default Item;
