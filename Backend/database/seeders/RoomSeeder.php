<?php

namespace Database\Seeders;

use App\Models\Room;
use Illuminate\Database\Seeder;

class RoomSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //
        $rooms = [
            ['name' => 'Sala de Reunião A'],
            ['name' => 'Sala de Reunião B'],
            ['name' => 'Sala de Reunião C'],

        ];
        foreach ($rooms as $room) {
            Room::create($room);
        }
    }
}
