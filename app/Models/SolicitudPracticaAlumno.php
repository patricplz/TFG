<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SolicitudPracticaAlumno extends Model
{
    use HasFactory;

    protected $table = 'solicitudes_practica_alumno';

    protected $fillable = [
        'practica_id',
        'alumno_id',
    ];


    public function ofertaPractica()
    {
        return $this->belongsTo(OfertaPractica::class, 'practica_id'); 
    }

    public function alumno()
    {
        return $this->belongsTo(Alumno::class, 'alumno_id', 'alumno_id'); // Especifica la clave foránea local y la clave relacionada
    }
}
