import { useEffect, useState } from 'react';
import './alertDialog.css';

export default function AlertDialog({ message, handleCancel, handleSubmit, isLoading }) {
  const [isVisible, setIsVisible] = useState(false);
  const [icon, setIcon] = useState('info');

  // Determinar el tipo de mensaje para mostrar el icono apropiado
  useEffect(() => {
    if (message) {
      if (message.toLowerCase().includes('error') || 
          message.toLowerCase().includes('no hay') ||
          message.toLowerCase().includes('no se puede')) {
        setIcon('error');
      } else if (message.toLowerCase().includes('éxito') || 
                message.toLowerCase().includes('agreg') ||
                message.toLowerCase().includes('completad')) {
        setIcon('success');
      } else if (message.toLowerCase().includes('advertencia') || 
                message.toLowerCase().includes('atención') ||
                message.toLowerCase().includes('solo hay')) {
        setIcon('warning');
      } else {
        setIcon('info');
      }
      
      // Activar animación de entrada
      setIsVisible(true);
    }
  }, [message]);

  // Manejar cierre con animación
  const closeWithAnimation = (callback) => {
    setIsVisible(false);
    setTimeout(() => {
      if (callback) callback();
    }, 300); // Tiempo que coincide con la duración de la animación CSS
  };

  return (
    <div className={`alert-overlay ${isVisible ? 'visible' : ''}`}>
      <div className={`alert-dialog ${isVisible ? 'visible' : ''}`}>
        <div className={`alert-icon ${icon}`}>
          {icon === 'success' && (
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
            </svg>
          )}
          {icon === 'error' && (
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
              <path d="M15 9l-6 6M9 9l6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          )}
          {icon === 'warning' && (
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 8v4M12 16h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              <path d="M12 2L2 20h20L12 2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          )}
          {icon === 'info' && (
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
              <path d="M12 16v-4M12 8h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          )}
        </div>
        
        <p className="alert-message">{message}</p>
        
        <div className="alert-buttons">
          {handleSubmit && (
            <button 
              onClick={() => closeWithAnimation(handleSubmit)} 
              disabled={isLoading} 
              className='confirm-button'
            >
              {isLoading ? (
                <>
                  <span className="loading-spinner"></span> 
                  Cargando...
                </>
              ) : (
                "Confirmar"
              )}
            </button>
          )}
          
          {handleCancel && (
            <button 
              onClick={() => closeWithAnimation(handleCancel)} 
              className="cancel-button"
            >
              Cancelar
            </button>
          )}
        </div>
      </div>
    </div>
  );
}