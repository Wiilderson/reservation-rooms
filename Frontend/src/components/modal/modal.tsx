import { useEffect, useState } from 'react';
import '../../App.css';
import 'react-datepicker/dist/react-datepicker.css';
import DatePicker from 'react-datepicker';
import { Reservation, Room } from '../../dto/reservations.dto';
import API from '../../services/API';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import eventEmitter from '../../services/eventEmitter';
import {
  formatDateTime,
  generateTimeSlots,
} from '../../services/timeSlotHelper';

interface ModalProps {
  onClose: () => void;
  rooms: Room[];
  reservas: Reservation[];
}

export default function Modal({ onClose, rooms, reservas }: ModalProps) {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  const [salaReserva, setSalaReserva] = useState('');
  const [pessoaResponsavel, setPessoaResponsavel] = useState('');

  const [timeStart, setTimeStart] = useState('');
  const [timeEnd, setTimeEnd] = useState('');

  const [timeReservationAvailable, setTimeReservationAvailable] = useState<
    string[]
  >([]);

  const availableTimes = generateTimeSlots('08:00', '18:00', 60);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (
      !startDate ||
      !endDate ||
      !salaReserva ||
      !pessoaResponsavel ||
      !timeStart ||
      !timeEnd
    ) {
      alert('Preencha todos os campos');
      return;
    }

    // Formatando datas e horários
    const formattedStartTime = formatDateTime(new Date(startDate), timeStart);
    const formattedEndTime = formatDateTime(new Date(endDate), timeEnd);

    console.log({
      room_id: salaReserva,
      start_time: formattedStartTime,
      end_time: formattedEndTime,
      responsible_person: pessoaResponsavel,
    });

    try {
      const response = await API.post('/reservations', {
        room_id: salaReserva,
        start_time: formattedStartTime,
        end_time: formattedEndTime,
        responsible_person: pessoaResponsavel,
      });
      toast.success('Reserva criada com sucesso!');
      eventEmitter.emit('updateTable');
      onClose();
      console.log('Reserva criada com sucesso:', response.data);
    } catch (error) {
      toast.error('Erro ao criar reserva.');
      console.error('Erro ao criar reserva:', error);
    }
  };

  useEffect(() => {
    if (startDate) {
      const reservedTimes = reservas
        .filter((reservation) => {
          const reservationDate = new Date(reservation.start_time);
          return (
            reservationDate.toDateString() ===
            new Date(startDate).toDateString()
          );
        })
        .map((reservation) => {
          const startTime = new Date(reservation.start_time);
          return startTime.toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          });
        });

      const filteredTimes = availableTimes.filter(
        (time) => !reservedTimes.includes(time)
      );
      setTimeReservationAvailable(filteredTimes);
    } else {
      setTimeReservationAvailable(availableTimes); // Reset para todos os horários se não houver data selecionada
    }
  }, [reservas, startDate]);
  // Adicione selectedDate como dependência

  return (
    <>
      <div className="modal-overlay">
        <div className="relative rounded-lg shadow dark:bg-gray-700">
          <form className="p-4 md:p-5" onSubmit={handleSubmit}>
            <div className="grid gap-4 mb-4 grid-cols-2">
              <div className="col-span-2">
                <label
                  htmlFor="category"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Salas
                </label>
                <select
                  value={salaReserva}
                  onChange={(e) => setSalaReserva(e.target.value)}
                  id="room_id"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                >
                  <option value="">Selecione a Sala</option>
                  {rooms.map((salas) => (
                    <option key={salas.id} value={salas.id}>
                      {salas.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-span-2 sm:col-span-1 relative">
                <label
                  htmlFor="name"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Data Início
                </label>
                <DatePicker
                  selected={startDate}
                  onChange={(date: Date | null) => setStartDate(date)}
                  dateFormat="dd/MM/yyyy"
                  isClearable
                  placeholderText=" Selecione a Data"
                  className="h-11 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                />
              </div>
              <div className="sm:col-span-1">
                <label
                  htmlFor="name"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Horário Início
                </label>
                <select
                  value={timeStart}
                  onChange={(e) => setTimeStart(e.target.value)}
                  name="start_time"
                  id="start_time"
                  className="h-11 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                >
                  <option value="">Selecione o Horário</option>
                  {timeReservationAvailable.map((times, index) => (
                    <option key={index} value={times}>
                      {times}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-span-2 sm:col-span-1 relative">
                <label
                  htmlFor="name"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Data Fim
                </label>
                <DatePicker
                  selected={endDate}
                  onChange={(date: Date | null) => setEndDate(date)}
                  dateFormat="dd/MM/yyyy"
                  isClearable
                  placeholderText=" Selecione a Data"
                  className="h-11 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                />
              </div>
              <div className="col-span-2 sm:col-span-1">
                <label
                  htmlFor="name"
                  className="block mb-2 mt-0 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Horario Fim
                </label>
                <select
                  value={timeEnd}
                  onChange={(e) => setTimeEnd(e.target.value)}
                  name="end_time"
                  id="end_time"
                  className="h-11 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                >
                  <option value="">Selecione o Horário</option>
                  {availableTimes.map((times, index) => (
                    <option key={index} value={times}>
                      {times}
                    </option>
                  ))}{' '}
                </select>
              </div>
              <div className="col-span-2">
                <label
                  htmlFor="name"
                  className="block mb-2 mt-0 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Participante
                </label>
                <input
                  type="text"
                  value={pessoaResponsavel}
                  onChange={(e) => setPessoaResponsavel(e.target.value)}
                  name="destino"
                  id="destino"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Nome completo"
                  required={true}
                />
              </div>
            </div>

            <div className="flex items-center gap-4 pt-3">
              <button
                type="submit"
                className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                <svg
                  className="me-1 -ms-1 w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                Reservar
              </button>
              <button
                onClick={onClose}
                type="button"
                className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
