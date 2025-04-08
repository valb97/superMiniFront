import { createContext, useContext, useState } from 'react';
import AlertDialog from './componentes/notification/alertDialog';
const AlertDialogContext = createContext();

export function AlertDialogProvider({ children }) {
  const [dialogData, setDialogData] = useState({
    message: '',
    onConfirm: null,
    onCancel: null,
    isOpen: false,
    isLoading: false,
  });

  const showAlert = ({ message, onConfirm, onCancel }) => {
    setDialogData({
      message,
      onConfirm,
      onCancel,
      isOpen: true,
      isLoading: false,
    });
  };

  const closeAlert = () => {
    setDialogData((prev) => ({ ...prev, isOpen: false }));
  };

  const handleSubmit = async () => {
    setDialogData((prev) => ({ ...prev, isLoading: true }));
    await dialogData.onConfirm?.();
    closeAlert();
  };

  const handleCancel = () => {
    dialogData.onCancel?.();
    closeAlert();
  };

  return (
    <AlertDialogContext.Provider value={{ showAlert }}>
      {children}
      {dialogData.isOpen && (
        <AlertDialog
          message={dialogData.message}
          hanldeSubmit={handleSubmit}
          handleCancel={handleCancel}
          isLoading={dialogData.isLoading}
        />
      )}
    </AlertDialogContext.Provider>
  );
}

export function useAlertDialog() {
  return useContext(AlertDialogContext);
}
