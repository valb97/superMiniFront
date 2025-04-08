import { useState, useEffect } from 'react';
import './dashboard.css';
import { useNavigate } from 'react-router';
import axios from 'axios';

export default function DashBoard() {
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [newProduct, setNewProduct] = useState({
        name: '',
        category: 'Comida',
        price: 0,
        stock: 0,
        description: '',
        image: null
    });
    const [showForm, setShowForm] = useState(false);

    // Cargar productos al montar el componente
    useEffect(() => {
        fetchProducts();
    }, []);

    // Función para obtener productos del backend
    const fetchProducts = async () => {
        try {
            const token = localStorage.getItem('token'); // Suponiendo que guardas el token en localStorage
            const response = await axios.get('http://localhost:3000/api/products', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            
          console.log(response);

            setProducts(response.data);
        } catch (error) {
            console.error('Error al obtener productos:', error);
            alert('Error al cargar los productos. Por favor, intenta de nuevo.');
        }
    };

    // Manejar cambios en el formulario
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewProduct({
            ...newProduct,
            [name]: value
        });
    };

    // Manejar cambio de archivo (imagen)
    const handleFileChange = (e) => {
        setNewProduct({
            ...newProduct,
            image: e.target.files[0]
        });
    };

    // Función para agregar un producto
    const addProduct = async (e) => {
        e.preventDefault();
        
        const formData = new FormData();
        formData.append('name', newProduct.name);
        formData.append('category', newProduct.category);
        formData.append('price', newProduct.price);
        formData.append('stock', newProduct.stock);
        formData.append('description', newProduct.description);
        if (newProduct.image) {
            formData.append('image', newProduct.image);
        }
        
        try {
            const token = localStorage.getItem('token');
            await axios.post('http://localhost:3000/api/products', formData, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data'
                }
            });
            
            // Recargar la lista de productos
            fetchProducts();
            // Resetear el formulario
            setNewProduct({
                name: '',
                category: 'Comida',
                price: 0,
                stock: 0,
                description: '',
                image: null
            });
            setShowForm(false);
            alert('Producto agregado correctamente');
        } catch (error) {
            console.error('Error al agregar producto:', error);
            alert('Error al agregar el producto. Por favor, intenta de nuevo.');
        }
    };

    // Función para marcar un producto como no disponible
    const toggleAvailability = async (id) => {
        // Encuentra el producto actual
        const product = products.find(p => p.id === id);
        
        // Actualiza localmente para feedback inmediato
        setProducts(products.map(product =>
            product.id === id ? { ...product, available: !product.available } : product
        ));
        
        // Aquí podrías añadir una llamada al backend para actualizar el estado en la base de datos
        // Por ejemplo:
        // try {
        //     const token = localStorage.getItem('token');
        //     await axios.patch(`http://localhost:3000/products/${id}/availability`, 
        //         { available: !product.available },
        //         { headers: { 'Authorization': `Bearer ${token}` } }
        //     );
        // } catch (error) {
        //     console.error('Error al actualizar disponibilidad:', error);
        //     alert('Error al actualizar disponibilidad. Por favor, intenta de nuevo.');
        //     // Revertir el cambio local si falla
        //     setProducts(prevProducts => prevProducts.map(p =>
        //         p.id === id ? { ...p, available: product.available } : p
        //     ));
        // }
    };

    return (
        <div className='dashboard-container'>
            <div className='dashboard-header'>
                <button onClick={() => setShowForm(!showForm)}>
                    {showForm ? 'Cancelar' : 'Agregar producto'}
                </button>
                <button onClick={() => navigate("/admin")}>
                    Cerrar sesión
                </button>
            </div>
            
            {showForm && (
                <div className='form-container'>
                    <form onSubmit={addProduct}>
                        <div className='form-group'>
                            <label>Nombre:</label>
                            <input 
                                type="text" 
                                name="name" 
                                value={newProduct.name} 
                                onChange={handleInputChange} 
                                required 
                            />
                        </div>
                        
                        <div className='form-group'>
                            <label>Categoría:</label>
                            <input 
                                type="text" 
                                name="category" 
                                value={newProduct.category} 
                                onChange={handleInputChange} 
                                required 
                            />
                        </div>
                        
                        <div className='form-group'>
                            <label>Precio:</label>
                            <input 
                                type="number" 
                                name="price" 
                                value={newProduct.price} 
                                onChange={handleInputChange} 
                                required 
                            />
                        </div>
                        
                        <div className='form-group'>
                            <label>Stock:</label>
                            <input 
                                type="number" 
                                name="stock" 
                                value={newProduct.stock} 
                                onChange={handleInputChange} 
                                required 
                            />
                        </div>
                        
                        <div className='form-group'>
                            <label>Descripción:</label>
                            <textarea 
                                name="description" 
                                value={newProduct.description} 
                                onChange={handleInputChange} 
                                required 
                            />
                        </div>
                        
                        <div className='form-group'>
                            <label>Imagen:</label>
                            <input 
                                type="file" 
                                accept="image/*" 
                                onChange={handleFileChange} 
                            />
                        </div>
                        
                        <button type="submit">Guardar producto</button>
                    </form>
                </div>
            )}
            
            <div className='products-table'>
                <table>
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Categoría</th>
                            <th>Precio</th>
                            <th>Stock</th>
                            <th>Descripción</th>
                            <th>Disponibilidad</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.length > 0 ? (
                            products.map(product => (
                                <tr key={product.id}>
                                    <td>{product.name}</td>
                                    <td>{product.category}</td>
                                    <td>${product.price}</td>
                                    <td>{product.stock}</td>
                                    <td>{product.description}</td>
                                    <td>{product.available ? 'Disponible' : 'No disponible'}</td>
                                    <td>
                                        <button onClick={() => toggleAvailability(product.id)}>
                                            {product.available ? 'Marcar como no disponible' : 'Marcar como disponible'}
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="7">No hay productos disponibles</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}