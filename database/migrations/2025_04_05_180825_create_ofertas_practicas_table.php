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
        Schema::create('ofertas_practicas', function (Blueprint $table) {
            $table->id();
            $table->foreignId('empresa_id')->constrained('users'); // o 'empresas' si es otro modelo
            $table->string('name');
            $table->text('description');
            $table->string('image_path');
            $table->timestamps(); // esto incluye created_at y updated_at
            $table->text('habilidades_blandas_requeridas')->nullable();
            $table->text('habilidades_tecnicas_requeridas')->nullable();
            $table->text('formacion_requerida')->nullable();
            $table->text('experiencia_laboral_requerida')->nullable();
            $table->string('disponibilidad_requerida')->nullable();
            $table->string('modalidad_practicas_requerida')->nullable();
            $table->string('idiomas_requeridos')->nullable();
            $table->string('sector_interes_requerido')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('ofertas_practicas');
    }
};
