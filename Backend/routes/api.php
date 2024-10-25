<?php

use App\Http\Controllers\ReservationController;
use App\Http\Controllers\RoomController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');


Route::get('/reservations', [ReservationController::class, 'index']);
Route::post('/reservations', [ReservationController::class, 'store']);
Route::get('/reservations/{id}', [ReservationController::class, 'show'])->where('id', '[0-9]+');
Route::put('/reservations/{id}', [ReservationController::class, 'update'])->where('id', '[0-9]+');
Route::delete('/reservations/cancel/{id}', [ReservationController::class, 'cancel'])->where('id', '[0-9]+');

Route::get('/reservations/cancelled', [ReservationController::class, 'showCancelled']);


Route::get('/rooms', [RoomController::class, 'index']);
Route::get('/rooms/{id}', [RoomController::class, 'show']);
