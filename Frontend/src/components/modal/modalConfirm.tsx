import '../../App.css';

interface ConfirmationModalProps {
  onConfirm: () => void;
  onClose: () => void;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  onConfirm,
  onClose,
}) => {
  //   if (!show) return null;

  return (
    <div className="modal-overlay">
      <div className="relative rounded-lg shadow dark:bg-gray-700 w-72 h-32">
        <div className="grid gap-4 grid-cols-1 items-center pt-4 ps-9">
          <p className="col-span-2">Você deseja cancelar esta reserva?</p>
          <div className="flex items-center gap-4 pt-3">
            <button
              onClick={onConfirm}
              className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Confirmar
            </button>
            <button
              onClick={onClose}
              type="button"
              className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
            >
              Cancelar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
