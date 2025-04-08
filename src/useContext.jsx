import { createContext, useContext, useState } from 'react';
import axios from 'axios';
const UserContext = createContext();

export function UserProvider({ children }) {
  const storedToken = localStorage.getItem('token');
  const userId = localStorage.getItem('userId');
  const [isAdmin,setIsAdmind] = useState(false);
  const [user, setUser] = useState(userId);
  const [token, setToken] = useState(storedToken); 
  const [loading, setLoading] = useState(false); 
  const [error, setError] = useState(null); 


  const isLoggedIn = () => {
    if(token){
      return true;
    } else {
      return false;
    }
  }

  const isAdminLogged = () => {
    if(token && isAdmin){
      return true
    } else {
      return false
    }
  }

  const login = async (username, password) => {
    setLoading(true); // Activar carga
    setError(null); // Limpiar errores previos

    try {
      const response = await axios.post('http://localhost:3000/api/login', {
        username,
        password,
      });
      if (response.status === 200) {
        // Suponiendo que la API devuelve un token
        setUser( response.data.user.id );
        setIsAdmind(response.data.isAdmin);
        console.log(response.data);
        localStorage.setItem('userId', response.data.user.id);user
        console.log(response.data.user.id);
        setToken(response.data.token); // Guardar el token en el estado
        localStorage.setItem('token', response.data.token); // Guardar el token en localStorage para persistencia
      }
    } catch (err) {
      setError('Credenciales inválidas o error en la conexión');
      console.error('Error de login:', err);
    } finally {
      setLoading(false); // Detener carga
    }
  };

  const logOut = async () => {
    try {
      const token = localStorage.getItem('token');
      const userId = localStorage.getItem('userId');
      // Si existe un token, lo revocamos en el backend
      if (token) {
        const response = await axios.post('http://localhost:3000/api/logout', {}, {
          headers: {
            'Authorization': `Bearer ${token}`, // Enviamos el token para invalidarlo en el servidor
          },
        });
  
        if (response.status === 200) {
          // En el frontend, eliminamos el token y el estado del usuario
          setUser(null);
          setToken(null);
          localStorage.removeItem('token');
        }
      }
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };
  


  return (
    <UserContext.Provider value={{ user, setUser,isLoggedIn,login,logOut }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext);
}
