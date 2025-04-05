<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SolicitudPractica extends Model
{
    protected $fillable = [
        'empresa_id',
        'name',
        'description',
        'image_path',
    ];
}
