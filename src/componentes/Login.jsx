import './Login.css';
import { useUser } from '../useContext';
import { useNavigate } from 'react-router';
import { useState } from 'react';

export default function Login() {
    const navigate = useNavigate();
    // Estados para el inicio de sesión
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    
    // Estados para el registro
    const [username, setUsername] = useState('');
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [confirmPass, setConfirmPass] = useState('');
    
    // Estados para errores y toggle de registro
    const [localError, setLocalError] = useState('');
    const [register, setRegister] = useState(false);
    const { login, loading, error } = useUser();
    
    async function handleLogin(e) {
        e.preventDefault();
        setLocalError('');
        
        if (!email || !pass) {
            setLocalError('Por favor complete todos los campos');
            return;
        }
        
        try {
            await login(email, pass);
            // Si el login es exitoso, redirigir al usuario
            navigate('/store');
        } catch (err) {
            setLocalError('Error al iniciar sesión: ' + (err.message || 'Intente nuevamente'));
        }
    }
    
    async function handleRegister(e) {
        e.preventDefault();
        setLocalError('');
        
        // Validación básica de campos
        if (!username || !pass || !name || !email || !phone || !address) {
            setLocalError('Por favor complete todos los campos');
            return;
        }
        
        if (pass !== confirmPass) {
            setLocalError('Las contraseñas no coinciden');
            return;
        }
        
        // Crear objeto con datos del usuario
        const userData = {
            username,
            password: pass,
            name,
            email,
            phone,
            address
        };
        
        try {
            const response = await fetch('http://localhost:3000/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userData)
            });
            
            const data = await response.json();
            
            if (!response.ok) {
                throw new Error(data.errors ? data.errors.join(', ') : 'Error al registrar');
            }
            
            // Si el registro es exitoso, cambia a la vista de login
            setLocalError('');
            setRegister(false);
            // Opcional: Mostrar mensaje de éxito
            alert('Usuario registrado correctamente. Inicie sesión.');
            // Limpiar campos
            setUsername('');
            setName('');
            setEmail('');
            setPhone('');
            setAddress('');
            setPass('');
            setConfirmPass('');
        } catch (err) {
            setLocalError(err.message || 'Error al registrar usuario');
        }
    }
    
    // Función para cambiar entre formularios
    function toggleRegister(e) {
        e.preventDefault();
        setRegister(!register);
        setLocalError('');
        // Limpiar campos al cambiar de formulario
        setEmail('');
        setPass('');
        setUsername('');
        setName('');
        setPhone('');
        setAddress('');
        setConfirmPass('');
    }

    return (
        <div className="login-container">
            {/* Muestra errores locales o del contexto */}
            {(localError || error) && 
                <div className="error-message">
                    <p>{localError || error}</p>
                </div>
            }
            
            {/* Formulario de inicio de sesión */}
            {!register ? (
                <form className="login-form" onSubmit={handleLogin}>
                    <h2>Iniciar sesión</h2>

                    <div className="input-group">
                        <p>Email de usuario</p>
                        <input 
                            type="email" 
                            placeholder="Ingrese su email" 
                            onChange={(e) => setEmail(e.target.value)} 
                            value={email}
                            required
                        />
                    </div>

                    <div className="input-group">
                        <p>Contraseña</p>
                        <input 
                            type="password" 
                            placeholder="Ingrese su contraseña" 
                            onChange={(e) => setPass(e.target.value)} 
                            value={pass}
                            required
                        />
                    </div>

                    <button 
                        type="submit"
                        className="btn-primary"
                        disabled={loading}
                    >
                        {loading ? 'Cargando...' : 'Iniciar sesión'}
                    </button>
                    <button 
                        className="btn-secondary"
                        onClick={toggleRegister}
                    >
                        Quiero registrarme
                    </button>
                </form>
            ) : (
                // Formulario de registro
                <form className="login-form register-form" onSubmit={handleRegister}>
                    <h2>Registrar usuario</h2>

                    <div className="form-grid">
                        <div className="input-group full-width">
                            <p>Nombre completo</p>
                            <input 
                                type="text" 
                                placeholder="Ingrese su nombre completo" 
                                onChange={(e) => setName(e.target.value)} 
                                value={name}
                                required
                            />
                        </div>

                        <div className="input-group">
                            <p>Nombre de usuario</p>
                            <input 
                                type="text" 
                                placeholder="Elija un nombre de usuario" 
                                onChange={(e) => setUsername(e.target.value)} 
                                value={username}
                                required
                            />
                        </div>

                        <div className="input-group">
                            <p>Email</p>
                            <input 
                                type="email" 
                                placeholder="Ingrese su email" 
                                onChange={(e) => setEmail(e.target.value)} 
                                value={email}
                                required
                            />
                        </div>

                        <div className="input-group">
                            <p>Teléfono</p>
                            <input 
                                type="tel" 
                                placeholder="Ingrese su número de teléfono" 
                                onChange={(e) => setPhone(e.target.value)} 
                                value={phone}
                                required
                            />
                        </div>

                        <div className="input-group">
                            <p>Dirección</p>
                            <input 
                                type="text" 
                                placeholder="Ingrese su dirección" 
                                onChange={(e) => setAddress(e.target.value)} 
                                value={address}
                                required
                            />
                        </div>

                        <div className="input-group">
                            <p>Contraseña</p>
                            <input 
                                type="password" 
                                placeholder="Cree una contraseña" 
                                onChange={(e) => setPass(e.target.value)}
                                value={pass}
                                required
                            />
                        </div>

                        <div className="input-group">
                            <p>Confirmar contraseña</p>
                            <input 
                                type="password" 
                                placeholder="Confirme su contraseña" 
                                onChange={(e) => setConfirmPass(e.target.value)}
                                value={confirmPass}
                                required
                            />
                        </div>
                    </div>

                    <button 
                        type="submit"
                        className="btn-primary"
                        disabled={loading}
                    >
                        {loading ? 'Registrando...' : 'Registrarme'}
                    </button>
                    <button 
                        className="btn-secondary"
                        onClick={toggleRegister}
                    >
                        Ya tengo cuenta
                    </button>
                </form>
            )}
        </div>
    );
}