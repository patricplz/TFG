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
    ];
}
