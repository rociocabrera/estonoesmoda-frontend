import Card from "react-bootstrap/Card";
import "./ItemDetail.css";
import { ItemQuantitySelector } from "./ItemQuantitySelector";
import { Loader } from "../Loader";
import { useState, useContext, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Truck, Whatsapp, Facebook, Share, Heart, HeartFill, ChevronLeft, ChevronRight } from "react-bootstrap-icons";
import { WishlistContext } from "../../context/WishlistContext";

export const ItemDetail = (props) => {
  const { product, loading, addToCart } = props;
  const { isInWishlist, toggleWishlist } = useContext(WishlistContext);

  const [count, setCount] = useState(1);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  // Get all images (support both new 'images' array and legacy 'img' field)
  const productImages = product?.images?.length > 0
    ? product.images
    : product?.img
      ? [product.img]
      : [];

  // Reset selected image when product changes
  useEffect(() => {
    setSelectedImageIndex(0);
  }, [product?.id]);

  const handlePrevImage = () => {
    setSelectedImageIndex(prev =>
      prev === 0 ? productImages.length - 1 : prev - 1
    );
  };

  const handleNextImage = () => {
    setSelectedImageIndex(prev =>
      prev === productImages.length - 1 ? 0 : prev + 1
    );
  };

  const isFavorite = product ? isInWishlist(product.id) : false;

  const onClickAddToCart = () => {
    addToCart(product, count);
    toast.success("Producto agregado al carrito");
  };

  const handleWishlistClick = () => {
    toggleWishlist(product);
    toast.success(isFavorite ? "Eliminado de favoritos" : "Agregado a favoritos");
  };

  const getShareUrl = () => {
    return window.location.href;
  };

  const shareOnWhatsApp = () => {
    const text = `Mirá este producto: ${product.title} - ₡${(product.price || 0).toLocaleString()}`;
    const url = `https://wa.me/?text=${encodeURIComponent(text + " " + getShareUrl())}`;
    window.open(url, "_blank");
  };

  const shareOnFacebook = () => {
    const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(getShareUrl())}`;
    window.open(url, "_blank", "width=600,height=400");
  };

  const copyLink = () => {
    navigator.clipboard.writeText(getShareUrl());
    toast.success("Enlace copiado al portapapeles");
  };

  // Calcular precios con descuento
  const priceWithTransferDiscount = product?.price ? (product.price * 0.9).toFixed(0) : 0;
  const priceIn3Installments = product?.price ? Math.ceil(product.price / 3) : 0;
  const freeShippingThreshold = 15000;

  return loading ? (
    <Loader />
  ) : product ? (
    <div className="cardItemDetail">
      <Card className="cardProduct">
        <div className="productGallery">
          <div className="mainImageContainer">
            {productImages.length > 1 && (
              <button className="galleryNav galleryNavPrev" onClick={handlePrevImage}>
                <ChevronLeft />
              </button>
            )}
            <img
              className="imgProduct"
              src={productImages[selectedImageIndex] || product.img}
              alt={product.title}
            />
            {productImages.length > 1 && (
              <button className="galleryNav galleryNavNext" onClick={handleNextImage}>
                <ChevronRight />
              </button>
            )}
          </div>
          {productImages.length > 1 && (
            <div className="thumbnailsContainer">
              {productImages.map((img, index) => (
                <button
                  key={index}
                  className={`thumbnail ${index === selectedImageIndex ? 'active' : ''}`}
                  onClick={() => setSelectedImageIndex(index)}
                >
                  <img src={img} alt={`${product.title} - ${index + 1}`} />
                </button>
              ))}
            </div>
          )}
        </div>
        <div className="cardDetail">
          <h2 className="productName">{product.name}</h2>
          <h3 className="productSubtitle">{product.title}</h3>

          {/* Precio principal */}
          <p className="productPrice">₡{(product.price || 0).toLocaleString()}</p>

          {/* Precios con descuento */}
          <div className="discountPrices">
            <p className="discountPrice">
              <span className="discountAmount">₡{Number(priceWithTransferDiscount).toLocaleString()}</span>
              <span className="discountLabel"> abonando por transferencia/SINPE (10% OFF)</span>
            </p>
            <p className="discountPrice">
              <span className="discountAmount">₡{priceIn3Installments.toLocaleString()}</span>
              <span className="discountLabel"> en 3 cuotas sin interés con tarjetas</span>
            </p>
          </div>

          {/* Información de envío */}
          <div className="shippingInfo">
            <Truck className="shippingIcon" />
            <span>Envío gratis superando los ₡{freeShippingThreshold.toLocaleString()}</span>
          </div>

          {/* Descripción del producto */}
          {product.description && (
            <div className="productDescriptionSection">
              <h4 className="descriptionTitle">Descripción</h4>
              <p className="productDescription">{product.description}</p>
            </div>
          )}

          {/* Selector de cantidad y botón agregar */}
          <div className="addToCartRow">
            <ItemQuantitySelector setCount={setCount} count={count} />
            <button className="addToCartButton" onClick={onClickAddToCart}>
              Agregar al carrito
            </button>
          </div>

          {/* Botón de favoritos */}
          <button
            className={`wishlistDetailBtn ${isFavorite ? 'active' : ''}`}
            onClick={handleWishlistClick}
          >
            {isFavorite ? <HeartFill /> : <Heart />}
            {isFavorite ? "En favoritos" : "Agregar a favoritos"}
          </button>

          {/* Botones de compartir */}
          <div className="shareSection">
            <span className="shareLabel">Compartir:</span>
            <div className="shareButtons">
              <button className="shareBtn whatsapp" onClick={shareOnWhatsApp} aria-label="Compartir en WhatsApp">
                <Whatsapp />
              </button>
              <button className="shareBtn facebook" onClick={shareOnFacebook} aria-label="Compartir en Facebook">
                <Facebook />
              </button>
              <button className="shareBtn copy" onClick={copyLink} aria-label="Copiar enlace">
                <Share />
              </button>
            </div>
          </div>

          <ToastContainer position="top-center" />
        </div>
      </Card>
    </div>
  ) : (
    <p className="productNotFound">Producto no encontrado</p>
  );
};

export default ItemDetail;
