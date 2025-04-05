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
        Schema::create('practice_requests', function (Blueprint $table) {
            $table->id();
            $table->string('name');               // Nombre de la solicitud
            $table->text('description');          // Descripción de la solicitud
            $table->string('image')->nullable();  // Imagen de la solicitud (url o ruta)
            $table->unsignedBigInteger('company_id'); // ID de la empresa que crea la solicitud
            $table->timestamps();                 // Fechas de creación y modificación
            
            // Relación con la tabla de usuarios (empresa)
            $table->foreign('company_id')->references('id')->on('users')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('practices_requests');
    }
};
