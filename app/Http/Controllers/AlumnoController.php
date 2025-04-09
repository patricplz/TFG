<?php
namespace App\Http\Controllers;
use Illuminate\Support\Facades\Auth;
//Mostrar la solicitud de practicas clickada por el alumno en su dashboard
use App\Models\OfertaPractica;
use App\Models\SolicitudPracticaAlumno;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AlumnoController extends Controller
{
    public function show($id)
    {
        $oferta = OfertaPractica::findOrFail($id);

        return Inertia::render('Alumno/OfertaShow', [
            'oferta' => $oferta
        ]);
    }
    public function solicitudesInscritas()
    {
        $alumnoId = Auth::id();

        $solicitudes = SolicitudPracticaAlumno::where('alumno_id', $alumnoId)
            ->with('ofertaPractica') // Carga la información de la práctica relacionada
            ->latest()
            ->get();

        return Inertia::render('Alumno/SolicitudesInscritas', [
            'solicitudes' => $solicitudes,
        ]);
    }
}
