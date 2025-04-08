import './alertDialog.css'

export default function AlertDialog({ message, handleCancel, handleSubmit, isLoading }) {
    return (
      <div className="alert-overlay">
        <div className="alert-dialog">
          <p>{message}</p>
          <div className="alert-buttons">
            <button onClick={handleSubmit} disabled={isLoading} className='confirm-button'>
              {isLoading ? "Cargando..." : "Confirmar"}
            </button>
            <button onClick={handleCancel}  className="cancel-button">
              Cancelar
            </button>
          </div>
        </div>
      </div>
    );
  }
  