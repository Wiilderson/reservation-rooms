<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Reservation;
use Illuminate\Http\Request;

class ReservationController extends Controller
{
    //
    public function index()
    {
        $reservation = Reservation::with('room')->where('status', 'active')->get();
        // $reservation = Reservation::with('room')->where('status', 'cancelled')->get();
        return $reservation;
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'room_id' => 'required|integer|exists:rooms,id',
            'start_time' => 'required|date_format:d-m-Y H:i:s',
            'end_time' => 'required|date_format:d-m-Y H:i:s|after:start_time',
            'responsible_person' => 'required|string',
        ]);

        $data['status'] = 'active';
        Reservation::validateReservation($data);

        return Reservation::create($data);
    }

    public function show($id)
    {

        $reservation = Reservation::with('room')->findOrFail($id);
        return response()->json($reservation);
    }

    public function update(Request $request, $id)
    {
        $data = $request->validate([
            'room_id' => 'required|integer|exists:rooms,id',
            'start_time' => 'required|date_format:d-m-Y H:i:s',
            'end_time' => 'required|date_format:d-m-Y H:i:s|after:start_time',
            'responsible_person' => 'required|string',
        ]);

        Reservation::validateReservation($data);

        $reservation = Reservation::findOrFail($id);
        $reservation->update($data);

        return $reservation;
    }

    public function cancel($id)
    {
        $reservation = Reservation::findOrFail($id);
        $reservation->update(['status' => 'cancelled']);
        // $reservation->delete();

        return response()->noContent();
    }

    public function showCancelled()
    {
        $cancelled = Reservation::with('room')
            ->where('status', 'cancelled')
            ->get();

        // Retorna a lista de reservas canceladas
        return response()->json($cancelled);
    }
}
