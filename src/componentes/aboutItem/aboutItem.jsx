import { useEffect, useState } from "react";
import { useParams } from "react-router";
import axios from "axios";
import './aboutItem.css';
import { useCart } from '../../cartContext'; // Importamos el contexto del carrito
import { useAlertDialog } from '../../alertDialogContext'; // Importamos el contexto de alerta

export default function AboutItem() {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [quantity, setQuantity] = useState(1); // Estado para manejar la cantidad
    const { addItemToCart } = useCart(); // Obtenemos la función para agregar al carrito
    const { showAlert } = useAlertDialog(); // Obtenemos la función para mostrar alertas

    const fetchData = async () => {
        setLoading(true);
        try {
            const res = await axios.get(`http://localhost:3000/api/products/${id}`);
            if (res) {
                setProduct(res.data);
            }
        } catch (error) {
            console.log('Error al obtener el producto ', error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchData();
    }, [id]);

    // Función para manejar el cambio de cantidad
    const handleQuantityChange = (e) => {
        const value = parseInt(e.target.value) || 1;
        setQuantity(value);
    }

    // Función para agregar al carrito
    const handleAddToCart = () => {
        // Verificar si hay suficiente stock
        if (product.stock <= 0) {
            showAlert({
                message: "No hay stock disponible para este producto",
                onConfirm: () => {},
                onCancel: null // No necesitamos cancelar en este caso
            });
            return;
        }

        // Verificar si la cantidad solicitada excede el stock
        if (quantity > product.stock) {
            showAlert({
                message: `Solo hay ${product.stock} unidades disponibles`,
                onConfirm: () => {
                    // Opcionalmente, ajustar la cantidad automáticamente al stock disponible
                    setQuantity(product.stock);
                },
                onCancel: () => {}
            });
            return;
        }

        // Si todo está bien, agregar al carrito
        addItemToCart(product.id, quantity);
        
        // Mostrar confirmación
        showAlert({
            message: `Se agregaron ${quantity} unidades de ${product.name} al carrito`,
            onConfirm: () => {},
            onCancel: null
        });
    }

    if (loading) {
        return <div className="loading">Cargando...</div>;
    }

    if (!product) {
        return <div className="no-product">No se encontró el producto.</div>;
    }

    return (
        <div className="about-item-container">
            <div className="about-item-header">
                <h2>Detalles del Producto</h2>
            </div>
            <div className="about-item-details">
                <img 
                    src={`http://localhost:3000${product.image}`} 
                    alt={product.name} 
                    className="about-item-image"
                />
                <p><strong>Nombre:</strong> {product.name}</p>
                <p className="about-item-price"><strong>Precio:</strong> ${product.price}</p>
                <p><strong>Cantidad disponible:</strong> {product.stock}</p>
                <p><strong>Descripción:</strong> {product.description}</p>
            </div>
            <div className="about-item-cart-actions">
                <input 
                    type="number"
                    value={quantity}
                    onChange={handleQuantityChange}
                    min="1"
                    max={product.stock}
                    placeholder="Ingrese la cantidad deseada"
                    className="about-item-container-input"
                />
                <button 
                    className="about-item-button"
                    onClick={handleAddToCart}
                    disabled={product.stock <= 0}
                >
                    {product.stock > 0 ? 'Agregar al carrito' : 'Sin stock'}
                </button>
            </div>
        </div>
    );
}