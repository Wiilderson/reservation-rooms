<?php

namespace Database\Seeders;

use App\Models\Reservation;
use Carbon\Carbon;
use Illuminate\Database\Seeder;

class ReservationSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //
        $reservations = [
            [
                'room_id' => 1,
                'start_time' => Carbon::create('2024', '10', '20', '09', '00'),
                'end_time' => Carbon::create('2024', '10', '20', '10', '00'),
                'responsible_person' => 'João Silva',
            ],
            [
                'room_id' => 2,
                'start_time' => Carbon::create('2024', '10', '20', '11', '00'),
                'end_time' => Carbon::create('2024', '10', '20', '12', '00'),
                'responsible_person' => 'Maria Souza',
            ],
            [
                'room_id' => 3,
                'start_time' => Carbon::create('2024', '10', '21', '13', '00'),
                'end_time' => Carbon::create('2024', '10', '21', '14', '00'),
                'responsible_person' => 'Carlos Oliveira',
            ],
        ];

        foreach ($reservations as $reservation) {
            Reservation::create($reservation);
        }
    }
}
