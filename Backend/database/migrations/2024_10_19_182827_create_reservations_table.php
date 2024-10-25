<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('reservations', function (Blueprint $table) {
            $table->id();
            $table->foreignId('room_id')->constrained('rooms')->onDelete('cascade'); // Chave estrangeira para a sala
            $table->dateTime('start_time'); // Data e hora de início da reserva
            $table->dateTime('end_time');   // Data e hora de término da reserva
            $table->string('responsible_person'); // Nome do responsável pela reserva
            $table->enum('status', ['active', 'cancelled'])->default('active'); //criacao status para sala ativa ou cancelada
            $table->timestamps();           // created_at e updated_at

            // Validação para evitar reservas em horários sobrepostos
            $table->unique(['room_id', 'start_time', 'end_time']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('reservations');
    }
};
