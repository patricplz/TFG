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
        Schema::table('alumnos', function (Blueprint $table) {
            $table->string('nombre')->nullable();
            $table->string('apellidos')->nullable();
            $table->date('fecha_nacimiento')->nullable();
            $table->string('localidad')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('alumnos', function (Blueprint $table) {
            $table->dropColumn(['nombre', 'apellidos', 'fecha_nacimiento', 'localidad']);
        });
    }
};