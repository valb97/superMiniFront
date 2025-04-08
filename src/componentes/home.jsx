import { useEffect, useState } from "react";
import ItemCard from "./itemCard/itemCard";
import './home.css';
import axios from "axios";

export default function Home() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const token = localStorage.getItem('token');
                const res = await axios.get("http://localhost:3000/api/products", {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setProducts(res.data);
            } catch (err) {
                console.error("Error al obtener productos:", err);
            }
        };

        fetchProducts();
    }, []);

    return (
        <div>
            <div className="home-info-container">
                <p>Las mejores ofertas disponibles</p>
            </div>
            <div className="products-container">
                {products.map((product) => (
                    <ItemCard key={product.id} product={product} />
                ))}
            </div>
        </div>
    );
}
