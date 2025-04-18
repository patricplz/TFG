<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Empresa extends Model
{
    use HasFactory;

    protected $table = 'empresas';

    protected $fillable = [
        'empresa_id',
        'nombre',
        'cif_nif',
        'sector_actividad',
        'descripcion',
        'ubicacion',
        'sitio_web',
        'num_empleados',
        'contacto_nombre',
        'contacto_email',
        'contacto_telefono',
        'practicas_remuneradas',
        'areas_practicas',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'empresa_id');
    }
}