<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class OfertaPractica extends Model
{
    protected $table = 'ofertas_practicas'; 
    protected $fillable = [
        'empresa_id',
        'name',
        'description',
        'image_path',
        'habilidades_blandas_requeridas',
        'habilidades_tecnicas_requeridas',
        'formacion_requerida',
        'experiencia_laboral_requerida',
        'disponibilidad_requerida',
        'modalidad_practicas_requerida',
        'idiomas_requeridos',
        'sector_interes_requerido',
    ];

     public function empresa()
    {
        return $this->belongsTo(Empresa::class, 'empresa_id', 'empresa_id');
    }
}
