<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Validation\ValidationException;

class Reservation extends Model
{
    //
    protected $fillable = ['room_id', 'start_time', 'end_time', 'responsible_person', 'status'];

    public static function validateReservation($data)
    {
        $overlappingReservations = self::where('room_id', $data['room_id'])
            ->where(function ($query) use ($data) {
                $query->whereBetween('start_time', [$data['start_time'], $data['end_time']])
                    ->orWhereBetween('end_time', [$data['start_time'], $data['end_time']]);
            })->exists();

        if ($overlappingReservations) {
            throw ValidationException::withMessages([
                'error' => 'A sala já está reservada nesse horário.'
            ]);
        }

        if (strtotime($data['start_time']) < now()->timestamp) {
            throw ValidationException::withMessages([
                'error' => 'Reservas para o passado não são permitidas.'
            ]);
        }
    }

    public function room()
    {
        return $this->belongsTo(Room::class);
    }
}
