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
        Schema::create('solicitudes_practica_alumno', function (Blueprint $table) {
            $table->id();
            $table->foreignId('practica_id')->constrained('ofertas_practicas')->onDelete('cascade');
            $table->foreignId('alumno_id')->constrained('alumnos', 'alumno_id')->onDelete('cascade');
            $table->timestamps();

            $table->unique(['practica_id', 'alumno_id']);
        });        
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('solicitudes_practica_alumno');
    }
};
