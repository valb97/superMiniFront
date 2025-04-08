import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router'; 
import { useUser } from '../../useContext';
import './profile.css'; 


export default function Profile({ closeProfile }) {
  const { user, logOut } = useUser();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const profileRef = useRef(null);

  const getData = async (userId) => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No token found');
      }
      const response = await axios.get(`http://localhost:3000/api/userData/${userId}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      if (response.data) {
        setUserData(response.data);
      }
      setLoading(false);
    } catch (error) {
      console.error('Error al obtener los datos del usuario:', error);
      setError('Error al obtener los datos del usuario');
      setLoading(false);
    }
  };
  
  useEffect(() => {
    console.log(user);
    if (user) {
      getData(user);
    } else {
      setLoading(false);
    }

    // Cierra el perfil cuando se hace clic fuera del componente
    function handleClickOutside(event) {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        closeProfile();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [user, closeProfile]); 

  async function handleLogOut() {
    try {
      await logOut();
      closeProfile();
      navigate('/');
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
      setError('Error al cerrar sesión');
    }
  }

  if (loading) {
    return (
      <div className="profile-dropdown" ref={profileRef}>
        <div className="loading-container">
          <p>Cargando datos del usuario...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="auth-status-dropdown" ref={profileRef}>
      <div className="auth-error-box">
        <p className="auth-error-message">Expiró la sesion, inicie de vuelta </p>
        <button className="auth-action-button" onClick={() => navigate("/login")}>
          Iniciar sesión
        </button>
      </div>
    </div>
    );
  }

  return (    
    <div className="profile-dropdown" ref={profileRef}>
      <div className="profile-container">
        <button className="close-button" onClick={closeProfile}>×</button>
        <h2>Perfil de Usuario</h2>
        {userData ? (
          <div className="profile-data">
            <p><strong>Nombre:</strong> {userData.name}</p>
            <p><strong>Correo electrónico:</strong> {userData.email}</p>
            <p><strong>Teléfono:</strong> {userData.phone}</p>
            <p><strong>Dirección:</strong> {userData.address}</p>
            <button 
              className="logout-button"
              onClick={handleLogOut}
            >
              Cerrar sesión
            </button>
          </div>
        ) : (
          <div className="no-data">
            <p>No se han encontrado datos del usuario.</p>
          </div>
        )}
      </div>
    </div>
  );
}