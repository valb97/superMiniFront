import { useEffect, useState } from "react";
import { useParams } from "react-router";
import axios from "axios";
import './aboutItem.css';
import { useCart } from '../../cartContext';
import { useAlertDialog } from '../../alertDialogContext';

export default function AboutItem() {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [quantity, setQuantity] = useState(1);
    const { addItemToCart } = useCart();
    const { showAlert } = useAlertDialog();

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

    const handleQuantityChange = (e) => {
        const value = parseInt(e.target.value) || 1;
        setQuantity(value);
    }

    const handleAddToCart = () => {
        if (product.stock <= 0) {
            showAlert({
                message: "No hay stock disponible para este producto",
                onConfirm: () => {},
                onCancel: null
            });
            return;
        }

        if (quantity > product.stock) {
            showAlert({
                message: `Solo hay ${product.stock} unidades disponibles`,
                onConfirm: () => {
                    setQuantity(product.stock);
                },
                onCancel: () => {}
            });
            return;
        }

        addItemToCart(product.id, quantity);
        
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
                <h2>{product.name}</h2>
            </div>
            <div className="about-item-details">
                <img 
                    src={`http://localhost:3000${product.image}`} 
                    alt={product.name} 
                    className="about-item-image"
                />
                <p className="about-item-price"><strong>Precio:</strong> ${product.price}</p>
                <p><strong>Cantidad disponible:</strong> {product.stock}</p>
                <p><strong>Descripción:</strong> {product.description}</p>
            </div>
            <div className="about-item-cart-actions">
                <div className="quantity-input-container">
                    <label htmlFor="quantity-input">Cantidad:</label>
                    <input 
                        id="quantity-input"
                        type="number"
                        value={quantity}
                        onChange={handleQuantityChange}
                        min="1"
                        max={product.stock}
                        className="about-item-quantity-input"
                    />
                </div>
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