import { useCallback, useEffect, useState } from 'react';
import './App.css';
import API from './services/API';
import { Reservation, Room } from './dto/reservations.dto';
import Modal from './components/modal/modal';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import eventEmitter from './services/eventEmitter';
import { AxiosError } from 'axios';
import TableCancelled from './components/tableCancelled';
import ConfirmationModal from './components/modal/modalConfirm';

function App() {
  const [reservas, setReservas] = useState<Reservation[]>([]);
  const [salas, setSalas] = useState<Room[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalConfirmationOpen, SetIsModalConfirmationOpen] = useState(false);
  const [getIdReservation, SetGetIdReservation] = useState(Number);

  const getReservasByAPI = useCallback(async () => {
    try {
      const response = await API.get('/reservations');
      setReservas(response.data);
      console.log(response.data);
    } catch (error) {
      console.error('Erro ao carregar dados da API:', error);
    }
  }, []);

  const getRoomsByAPI = useCallback(async () => {
    try {
      const response = await API.get('/rooms');
      setSalas(response.data);
      console.log(response.data);
    } catch (error) {
      console.error('Erro ao carregar dados da API:', error);
    }
  }, []);

  const cancelReservation = useCallback(async (id: number) => {
    try {
      const response = await API.delete(`/reservations/cancel/${id}`);
      toast.success('Reserva cancelada com sucesso!');
      await getReservasByAPI();
      eventEmitter.emit('updateTable');
      console.log('Reserva cancelada com sucesso:', response.data);
    } catch (error) {
      if (error instanceof AxiosError) {
        console.error('Erro ao cancelar reserva:', error.response?.data);
      } else {
        console.error('Erro desconhecido:', error);
      }
    }
  }, []);

  useEffect(() => {
    getReservasByAPI();
    getRoomsByAPI();
    eventEmitter.on('updateTable', getReservasByAPI);
    return () => {
      eventEmitter.off('updateTable', getReservasByAPI);
    };
  }, [getReservasByAPI, getRoomsByAPI]);

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleString('pt-BR', {
      dateStyle: 'short', // Exibe a data como dd/mm/yyyy
      timeStyle: 'short', // Exibe o tempo como hh:mm
    });
  };

  const handleDelete = (id: number) => {
    // Mostra a modal antes de confirmar a exclusão
    SetGetIdReservation(id);
    SetIsModalConfirmationOpen(true);
  };

  const handleConfirm = () => {
    // Mostra a modal antes de confirmar a exclusão
    cancelReservation(getIdReservation);
    setTimeout(() => {
      SetIsModalConfirmationOpen(false);
    }, 1000);
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    // setTimeout(() => {
    // }, 1000);
    SetIsModalConfirmationOpen(false);
  };

  return (
    <>
      <ToastContainer />
      <div className="w-full">
        <button
          onClick={handleOpenModal}
          type="button"
          className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
        >
          Reservar Sala
        </button>
        {isModalOpen && (
          <Modal onClose={handleCloseModal} rooms={salas} reservas={reservas} />
        )}
      </div>
      <div className="flex justify-center">
        <div className="w-9/12 overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-white uppercase bg-gray-500 ">
              <tr>
                <th scope="col" className="px-6 py-3 text-center">
                  Sala
                </th>
                <th scope="col" className="px-6 py-3 text-center">
                  Responsável
                </th>
                <th scope="col" className="px-6 py-3 text-center">
                  Início
                </th>
                <th scope="col" className="px-6 py-3 text-center">
                  Fim
                </th>
                <th scope="col" className="px-6 py-3">
                  Opções
                </th>
              </tr>
            </thead>
            <tbody>
              {reservas.map((item, index) => (
                <tr
                  key={index}
                  className={
                    index % 2 === 0
                      ? 'bg-gray-50 dark:bg-gray-800'
                      : 'bg-white dark:bg-gray-900'
                  }
                >
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    {item.room.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    {item.responsible_person}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    {formatDate(item.start_time)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    {formatDate(item.end_time)}
                  </td>
                  <td
                    className="px-6 py-4 whitespace-nowrap text-white hover:text-red-500 cursor-pointer"
                    onClick={() => handleDelete(item.id)}
                  >
                    Cancelar
                  </td>
                </tr>
              ))}
              {isModalConfirmationOpen && (
                <ConfirmationModal
                  onClose={handleCloseModal}
                  onConfirm={handleConfirm}
                />
              )}
            </tbody>
          </table>
        </div>
      </div>
      <div>
        <TableCancelled />
      </div>
    </>
  );
}

export default App;
