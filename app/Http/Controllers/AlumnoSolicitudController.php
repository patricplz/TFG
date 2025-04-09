<?php
namespace App\Http\Controllers;
//Mostrar la solicitud de practicas clickada por el alumno en su dashboard
use App\Models\OfertaPractica;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AlumnoSolicitudController extends Controller
{
    public function show($id)
    {
        $oferta = OfertaPractica::findOrFail($id);

        return Inertia::render('Alumno/OfertaShow', [
            'oferta' => $oferta
        ]);
    }
}
