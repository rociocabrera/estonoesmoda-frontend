import { useContext } from "react";
import { Link } from "react-router-dom";
import { HeartFill, BagX } from "react-bootstrap-icons";
import { Layout } from "../../components/Layout";
import { WishlistContext } from "../../context/WishlistContext";
import { CartContext } from "../../context/CartContext";
import "./Wishlist.css";

const Wishlist = () => {
  const { wishlist, removeFromWishlist } = useContext(WishlistContext);
  const { addToCart } = useContext(CartContext);

  const handleAddToCart = (product) => {
    addToCart(product, 1);
  };

  return (
    <Layout>
      <div className="wishlistPage">
        <h1 className="wishlistTitle">
          <HeartFill /> Mis Favoritos
        </h1>

        {wishlist.length === 0 ? (
          <div className="emptyWishlist">
            <BagX className="emptyIcon" />
            <h2>Tu lista de favoritos está vacía</h2>
            <p>Guardá tus productos favoritos para encontrarlos fácilmente.</p>
            <Link to="/" className="continueShopping">
              Explorar productos
            </Link>
          </div>
        ) : (
          <div className="wishlistGrid">
            {wishlist.map((product) => (
              <div key={product.id} className="wishlistItem">
                <button
                  className="removeWishlistBtn"
                  onClick={() => removeFromWishlist(product.id)}
                  aria-label="Eliminar de favoritos"
                >
                  &times;
                </button>
                <Link to={`/item/${product.slug}`} className="wishlistItemLink">
                  <img
                    src={product.img}
                    alt={product.title}
                    className="wishlistItemImg"
                    loading="lazy"
                  />
                  <div className="wishlistItemInfo">
                    <h3>{product.title}</h3>
                    <span className="wishlistItemPrice">
                      ₡{(product.price || 0).toLocaleString()}
                    </span>
                  </div>
                </Link>
                <button
                  className="addToCartBtn"
                  onClick={() => handleAddToCart(product)}
                >
                  Agregar al carrito
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Wishlist;
