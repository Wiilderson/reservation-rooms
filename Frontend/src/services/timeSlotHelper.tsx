export const generateTimeSlots = (
  start: string,
  end: string,
  interval: number
) => {
  const times: string[] = [];
  const currentTime = new Date(`2024-01-01T${start}:00`);
  const endTime = new Date(`2024-01-01T${end}:00`);

  while (currentTime <= endTime) {
    const time = currentTime.toTimeString().slice(0, 5); // Exemplo: "08:00"
    times.push(time);
    currentTime.setMinutes(currentTime.getMinutes() + interval);
  }

  return times;
};

export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleString('pt-BR', {
    dateStyle: 'short', // Exibe a data como dd/mm/yyyy
    timeStyle: 'short', // Exibe o tempo como hh:mm
  });
};

export const formatDateTime = (date: Date, time: string): string => {
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Meses são base 0 em JavaScript
  const year = date.getFullYear();
  const [hours, minutes] = time.split(':');
  const seconds = '00'; // Ajustar para segundos
  return `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;
};
