import { createContext, useContext, useEffect, useState } from "react";

export const WishlistContext = createContext();

export const useWishlist = () => useContext(WishlistContext);

export default function WishlistContextProvider({ children }) {
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem("wishlist");
    if (saved) {
      setWishlist(JSON.parse(saved));
    }
  }, []);

  const saveWishlist = (newWishlist) => {
    localStorage.setItem("wishlist", JSON.stringify(newWishlist));
    setWishlist(newWishlist);
  };

  const addToWishlist = (product) => {
    if (!isInWishlist(product.id)) {
      saveWishlist([...wishlist, product]);
    }
  };

  const removeFromWishlist = (productId) => {
    saveWishlist(wishlist.filter((p) => p.id !== productId));
  };

  const toggleWishlist = (product) => {
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  const isInWishlist = (productId) => {
    return wishlist.some((p) => p.id === productId);
  };

  const getWishlistCount = () => wishlist.length;

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        addToWishlist,
        removeFromWishlist,
        toggleWishlist,
        isInWishlist,
        getWishlistCount,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}
