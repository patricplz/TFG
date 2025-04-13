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
        Schema::create('alumnos', function (Blueprint $table) {
            $table->foreignId('alumno_id') // Clave primaria y clave foránea a users
                  ->constrained('users')
                  ->onDelete('cascade'); // Si se elimina el usuario, se elimina el perfil del alumno
            $table->primary('alumno_id'); // Definimos alumno_id como clave primaria

            $table->string('cv_path')->nullable(); // Ruta al archivo CV
            $table->string('foto_perfil_path')->nullable(); // Ruta al archivo de foto de perfil
            $table->text('intereses')->nullable();
            $table->text('descripcion')->nullable();
            $table->text('formacion')->nullable();
            $table->text('experiencia_laboral')->nullable();
            $table->text('habilidades_tecnicas')->nullable();
            $table->text('habilidades_blandas')->nullable();
            $table->text('practicas_interes')->nullable();
            $table->text('sectores_interes')->nullable();
            $table->string('disponibilidad')->nullable();
            $table->string('modalidad_practicas')->nullable();
            $table->text('expectativas_aprendizaje')->nullable();
            $table->text('idiomas')->nullable();
            $table->string('portafolio')->nullable();
            $table->text('certificaciones')->nullable();
            $table->text('premios')->nullable();
            $table->text('referencias')->nullable();

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('alumnos');
    }
};