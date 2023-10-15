import { createContext, useEffect, useState } from "react";
import { createOrder } from "../api/orders";
import { toast } from "react-toastify";

export const CartContext = createContext();

export default function CartContextProvider({ defaultValue = [], children }) {
  const [cart, setCart] = useState(defaultValue);

  const loadCart = () => {
    const cartString = localStorage.getItem("cart") || "[]";
    const productCart = JSON.parse(cartString);
    setCart(productCart);
  };

  const saveCart = (newCart) => {
    const cartString = JSON.stringify(newCart);
    localStorage.setItem("cart", cartString);
  };

  useEffect(() => {
    loadCart();
  }, []);

  const countTotalItems = () => {
    return cart.reduce((acc, { quantity }) => acc + quantity, 0);
  };

  const getTotalPrice = () => {
    return cart.reduce((acc, { item, quantity }) => acc + item.price * quantity, 0);
  };

  const onSetCart = (newCart) => {
    setCart(newCart);
    saveCart(newCart);
  };

  function getFromCart(id) {
    return cart.find(({ item }) => item.id === id);
  }

  function isInCart(id) {
    return id === undefined ? undefined : getFromCart(id) !== undefined;
  }

  function addToCart(item, quantity) {
    if (isInCart(item.id)) {
      const existingItem = getFromCart(item.id);
      const newQuantity = existingItem.quantity + quantity;
      const currentItemIndex = cart.findIndex(({ item }) => item.id === existingItem.item.id);
      const cartWithoutExistingItem = cart.filter(({ item }) => item.id !== existingItem.item.id);
      cartWithoutExistingItem.splice(currentItemIndex, 0, { item, quantity: newQuantity });
      onSetCart(cartWithoutExistingItem);
      return;
    }
    onSetCart([...cart, { item, quantity }]);
  }

  function removeFromCart(id) {
    const newCart = cart.filter((item) => item.item.id !== id);
    onSetCart(newCart);
  }

  function clearCart() {
    onSetCart([]);
  }

  async function finishPurchase() {
    const orderData = {
      items: cart.map(({ item, quantity }) => ({ id: item.id, quantity, price: item.price })),
      total: getTotalPrice(),
      date: new Date(),
    };
    const orderId = await createOrder(orderData);
    toast.success(`Order with ID ${orderId} created!`, { autoClose: 10000 });
    const newCart = [];
    onSetCart(newCart);
  }
  return <CartContext.Provider value={{ cart, addToCart, getTotalPrice, isInCart, countTotalItems, removeFromCart, clearCart, finishPurchase }}>{children}</CartContext.Provider>;
}
