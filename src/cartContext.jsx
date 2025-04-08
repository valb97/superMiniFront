import { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  // Al iniciar el componente, cargamos el carrito de localStorage si existe
  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem('cart'));
    if (savedCart) {
      setCart(savedCart);
    }
  }, []);

  // Función para agregar productos al carrito
  const addItemToCart = (id, quantity) => {
    let newCart = [...cart];
    const existingItemIndex = newCart.findIndex(item => item.id === id);
    
    if (existingItemIndex > -1) {
      newCart[existingItemIndex].quantity += quantity;
    } else {
      newCart.push({ id, quantity });
    }

    setCart(newCart);
    localStorage.setItem('cart', JSON.stringify(newCart)); // Guardamos el carrito actualizado en localStorage
  };

  // Función para eliminar productos del carrito
  const removeItemFromCart = (id) => {
    const newCart = cart.filter(item => item.id !== id);
    setCart(newCart);
    localStorage.setItem('cart', JSON.stringify(newCart)); // Guardamos el carrito actualizado en localStorage
  };

  return (
    <CartContext.Provider value={{ cart, addItemToCart, removeItemFromCart }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
