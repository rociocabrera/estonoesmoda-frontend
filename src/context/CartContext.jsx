import { createContext, useState } from "react";

export const CartContext = createContext(); // creo el contexto

export default function CartContextProvider({ defaultValue = [], children }) {
  // SE INICIALIZA SIEMPRE CON LO QUE HAY EN LOCAL STORAGE
  const [cart, setCart] = useState(defaultValue);

  const countTotalItems = () => {
    return cart.reduce((acc, { quantity }) => acc + quantity, 0);
  };

  const onSetCart = (newCart) => {
    setCart(newCart);
    // GUARDAR EN LOCAL STORAGE
  };

  function getFromCart(id) {
    return cart.find(({ item }) => item.id === id);
  }

  function isInCart(id) {
    return id === undefined ? undefined : getFromCart(id) !== undefined;
  }

  function addToCart(item, quantity) {
    if (isInCart(item.id)) {
      // NO DECIR QUE YA ESTABA, ES AGREGAR LA CANTIDAD LA NUEVA A LA QUE YA ESTABA
      const existingItem = getFromCart(item.id);
      const newQuantity = existingItem.quantity + quantity;
      const cartWithoutExistingItem = cart.filter((item) => item.id !== existingItem.id);
      const newCart = [...cartWithoutExistingItem, { item, quantity: newQuantity }];
      onSetCart(newCart);

      console.log("El item se ACTUALIZO en el carrito");
      return;
    }
    console.log("El item se AGREGO en el carrito");
    const newCart = [...cart, { item, quantity }];
    onSetCart(newCart);
  }

  return <CartContext.Provider value={{ cart, addToCart, isInCart, countTotalItems }}>{children}</CartContext.Provider>;
}
