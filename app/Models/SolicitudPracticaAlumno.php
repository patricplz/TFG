<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SolicitudPracticaAlumno extends Model
{
    use HasFactory;

    protected $table = 'solicitudes_practica_alumno'; // Asegúrate de que la tabla esté correctamente definida

    // Definir los campos que pueden ser asignados masivamente
    protected $fillable = [
        'practica_id',
        'alumno_id',
    ];

    // Relación con el modelo OfertaPractica
    public function ofertaPractica()
    {
        return $this->belongsTo(OfertaPractica::class, 'practica_id'); // Ajustado para usar OfertaPractica
    }

    // Relación con el modelo User (para obtener el alumno)
    public function alumno()
    {
        return $this->belongsTo(Alumno::class, 'alumno_id', 'alumno_id'); // Especifica la clave foránea local y la clave relacionada
    }
}
