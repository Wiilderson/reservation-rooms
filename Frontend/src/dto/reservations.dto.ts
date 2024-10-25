export interface Room {
    id: number;
    name: string;
    created_at: string;
    updated_at: string;
}

// Interface para os dados da reserva
export interface Reservation {
    id: number;
    responsible_person: string;
    room: Room; // Associação com a interface Room
    room_id: number;
    start_time: string;
    end_time: string;
    created_at: string;
    updated_at: string;
}