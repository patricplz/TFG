<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Alumno extends Model
{
    use HasFactory;

    protected $table = 'alumnos';
    protected $primaryKey = 'alumno_id';
    public $incrementing = false;
    protected $fillable = [
        'alumno_id',
        'cv_path',
        'foto_perfil_path',
        'intereses',
        'descripcion',
        'formacion',
        'experiencia_laboral',
        'habilidades_tecnicas',
        'habilidades_blandas',
        'practicas_interes',
        'sectores_interes',
        'disponibilidad',
        'modalidad_practicas',
        'expectativas_aprendizaje',
        'idiomas',
        'portafolio',
        'certificaciones',
        'premios',
        'referencias',
        'nombre', 
        'apellidos', 
        'fecha_nacimiento', 
        'localidad', 
    ];

    /**
     * Get the user that owns the Alumno.
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'alumno_id');
    }
}