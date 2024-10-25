<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Room;

class RoomController extends Controller
{
    //

    public function index()
    {
        //carrega todas as salas cadastradas
        return Room::all();
    }

    public function show($id)
    {
        $room = Room::findOrFail($id);

        if (!$room) {
            return response()->json(['message' => 'Sala não encontrada'], 404);
        }

        return response()->json($room);
    }
}
