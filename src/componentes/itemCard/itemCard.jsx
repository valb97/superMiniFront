import './itemCard.css';
import { useNavigate } from 'react-router';
import { useCart } from '../../cartContext';
import { useState } from 'react';

export default function ItemCard({ product }) {
  const [quant, setQuant] = useState(1);
  const navigate = useNavigate();
  const { addItemToCart } = useCart();

  const maxQuantity = product.quantity || 10;  // Si product.quantity no existe, asumir 10 como cantidad máxima

  function handleRev() {
    if (quant > 1) {  // No permitir cantidad negativa
      setQuant(prevQuant => prevQuant - 1);  // Decrementar cantidad
    }
  }

  function handleAdd() {
    if (quant < maxQuantity) {  // Asegurarse de no superar la cantidad disponible
      setQuant(prevQuant => prevQuant + 1);  // Incrementar cantidad
    }
  }

  function handleAddToCart() {
    addItemToCart(product.id, quant);  // Agregar al carrito
  }

  console.log(`Cantidad: ${quant}, Cantidad máxima: ${maxQuantity}`);  // Debugging

  return (
    <div className='card-container'>
      <img
        src={`http://localhost:3000${product.image}`}
        alt={product.name}
        className='product-image'
      />
      <p className='product-name'>Nombre: {product.name}</p>
      <p className='product-price'>Precio: ${product.price}</p>
      <div className='cart-container-div'>
        <button onClick={handleRev}>-</button>
        <p>{quant}</p>
        <button onClick={handleAdd}>+</button>
      </div>
      <button onClick={handleAddToCart}>Agregar al carrito</button>

      <button onClick={() => navigate(`/store/${product.id}`)}>
        Más información
      </button>
    </div>
  );
}
