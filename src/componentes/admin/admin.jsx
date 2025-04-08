import './admin.css'
import { useNavigate } from 'react-router'

export default function Admind() {
    const navigate = useNavigate();
    

    


    return (
        <div className="admin-container">
            <div className="admin-card">
                <h2>Página de administrador</h2>
                <div>
                    <label>Usuario</label>
                    <input placeholder="Ingrese el nombre de usuario" />
                </div>
                <div>
                    <label>Contraseña</label>
                    <input placeholder="Ingrese la contraseña" type="password" />
                </div>
                <button onClick={() => navigate("/admin/dashboard")}>
                    
                    Iniciar sesión</button>
            </div>
        </div>
    )
}
