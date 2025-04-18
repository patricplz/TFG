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
        Schema::create('empresas', function (Blueprint $table) {
            $table->foreignId('empresa_id')->primary()->unique()->constrained('users')->onDelete('cascade');
            $table->string('nombre');
            $table->string('cif_nif')->unique();
            $table->string('sector_actividad');
            $table->text('descripcion')->nullable();
            $table->string('ubicacion')->nullable();
            $table->string('sitio_web')->nullable();
            $table->unsignedInteger('num_empleados')->nullable();
            $table->string('contacto_nombre')->nullable();
            $table->string('contacto_email')->nullable();
            $table->string('contacto_telefono')->nullable();
            $table->boolean('practicas_remuneradas')->default(false);
            $table->text('areas_practicas')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('empresas');
    }
};
