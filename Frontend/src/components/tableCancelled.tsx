import { useCallback, useEffect, useState } from 'react';
import { Reservation } from '../dto/reservations.dto';
import API from '../services/API';
import { formatDate } from '../services/timeSlotHelper';
import eventEmitter from '../services/eventEmitter';

export default function TableCancelled() {
  const [reservationsCancelled, setReservationsCancelled] = useState<
    Reservation[]
  >([]);

  const getReservationsCancelledByAPI = useCallback(async () => {
    try {
      const response = await API.get('/reservations/cancelled');
      setReservationsCancelled(response.data);
    } catch (error) {
      console.error('Erro ao carregar dados da API:', error);
    }
  }, []);

  useEffect(() => {
    getReservationsCancelledByAPI();
    eventEmitter.on('updateTable', getReservationsCancelledByAPI);
    return () => {
      eventEmitter.off('updateTable', getReservationsCancelledByAPI);
    };
  }, [getReservationsCancelledByAPI]);

  return (
    <>
      <div className="pt-40 font-semibold">Reservas Canceladas</div>

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
                {/* <th scope="col" className="px-6 py-3">
                  Opções
                </th> */}
              </tr>
            </thead>
            <tbody>
              {reservationsCancelled.map((item, index) => (
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
                  {/* <td
                    className="px-6 py-4 whitespace-nowrap text-white hover:text-red-500 cursor-pointer"
                    onClick={() => cancelReservation(item.id)}
                  >
                    Cancelar
                  </td> */}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
