import { createContext, useEffect, useState } from "react";
import { createOrder } from "../api/orders";
import { toast } from "react-toastify";
import { sendOrderConfirmation } from "../api/emailService";

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

  function updateQuantity(id, newQuantity) {
    if (newQuantity < 1) {
      removeFromCart(id);
      return;
    }
    const newCart = cart.map((cartItem) =>
      cartItem.item.id === id
        ? { ...cartItem, quantity: newQuantity }
        : cartItem
    );
    onSetCart(newCart);
  }

  function clearCart() {
    onSetCart([]);
  }

  async function finishPurchase(customerData) {
    const orderData = {
      items: cart.map(({ item, quantity }) => ({
        id: item.id,
        title: item.title,
        img: item.img,
        quantity,
        price: item.price
      })),
      total: getTotalPrice(),
      date: new Date(),
      status: "pending",
      customer: customerData?.customer || null,
      shipping: customerData?.shipping || null,
      payment: customerData?.payment || null
    };
    let orderId = null;
    try {
      orderId = await createOrder(orderData);
      console.log(`Pedido creado con ID: ${orderId}`);

      // Enviar email de confirmación al cliente
      if (customerData?.customer?.email) {
        try {
          await sendOrderConfirmation({
            ...orderData,
            orderId
          });
          console.log("Email de confirmación enviado");
        } catch (emailError) {
          console.log("Error al enviar email de confirmación:", emailError);
        }
      }
    } catch (error) {
      console.log("Error al guardar en Firebase, pero el pedido se procesa igualmente:", error);
    }
    const newCart = [];
    onSetCart(newCart);
    return orderId;
  }
  return <CartContext.Provider value={{ cart, addToCart, getTotalPrice, isInCart, countTotalItems, removeFromCart, updateQuantity, clearCart, finishPurchase }}>{children}</CartContext.Provider>;
}
