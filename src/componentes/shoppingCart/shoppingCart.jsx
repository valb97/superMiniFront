"use client"

import { useState, useEffect } from "react"
import { ShoppingCart, X, Trash2 } from "lucide-react"
import "./shoppingCart.css"
import { useCart } from "../../cartContext"
import axios from "axios"

export default function ShoppingCartContainer() {
  const { cart, removeItemFromCart } = useCart()
  const [isOpen, setIsOpen] = useState(false)
  const [productsDetails, setProductsDetails] = useState([])

  async function fetchProductDetails(ids) {
    try {
      const response = await axios.post("http://localhost:3000/api/products/details", { ids })
      setProductsDetails(response.data)
    } catch (error) {
      console.error("Error al obtener los productos:", error)
    }
  }

  useEffect(() => {
    const ids = cart.map((item) => item.id)
    if (ids.length > 0) {
      fetchProductDetails(ids)
    } else {
      setProductsDetails([])
    }
  }, [cart])

  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0)

  return (
    <>
      <div className="cart-icon-container" onClick={() => setIsOpen(true)}>
        <ShoppingCart size={20} />
        {totalItems > 0 && (
          <div className="cart-counter">
            <span>{totalItems}</span>
          </div>
        )}
      </div>

      {isOpen && (
        <div className="cart-overlay" onClick={() => setIsOpen(false)}>
          <div className="cart-modal" onClick={(e) => e.stopPropagation()}>
            <div className="cart-header">
              <h3>Mi Carrito</h3>
              <button className="close-button" onClick={() => setIsOpen(false)}>
                <X size={18} />
              </button>
            </div>

            <div className="cart-items-container">
              {cart.length > 0 ? (
                cart.map((item) => {
                  const product = productsDetails.find((p) => p.id === item.id)
                  return (
                    <div key={item.id} className="cart-item">
                      <div className="cart-item-image-container">
                        {product && (
                          <img
                            src={`http://localhost:3000${product.image}`}
                            alt={product.name}
                            className="cart-item-image"
                          />
                        )}
                      </div>
                      <div className="cart-item-details">
                        <h4>{product ? product.name : "Cargando..."}</h4>
                        <p className="cart-item-quantity">Cantidad: {item.quantity}</p>
                      </div>
                      <button
                        className="remove-item-button"
                        onClick={() => removeItemFromCart(item.id)}
                        aria-label="Eliminar producto"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  )
                })
              ) : (
                <div className="empty-cart">
                  <p>Tu carrito está vacío</p>
                </div>
              )}
            </div>

            <div className="cart-footer">
              <button className="close-cart-button" onClick={() => setIsOpen(false)}>
                Cerrar
              </button>
              {cart.length > 0 && <button className="checkout-button">Finalizar compra</button>}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
