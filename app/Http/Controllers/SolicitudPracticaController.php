<?php

namespace App\Http\Controllers;

use App\Models\SolicitudPracticaAlumno;
use App\Models\OfertaPractica;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use App\Models\Alumno;

class SolicitudPracticaController extends Controller
{
    public function store(Request $request, $practicaId)
    {
        $alumnoId = Auth::id();
 
        // Comprobar si ya existe una solicitud para esta práctica
        if (SolicitudPracticaAlumno::where('practica_id', $practicaId)->where('alumno_id', $alumnoId)->exists()) {
            return back()->with('error', 'Ya estás inscrito en esta práctica.');
        }
 
        // Crear la solicitud
        SolicitudPracticaAlumno::create([
            'practica_id' => $practicaId,
            'alumno_id' => $alumnoId,
        ]);
 
        // Redirigir al dashboard con un mensaje de éxito
        return redirect()->route('alumno.dashboard')->with('success', 'Solicitud enviada con éxito.');
    }

    public function retirarSolicitud(SolicitudPracticaAlumno $solicitud)
    {
        if ($solicitud->alumno_id !== auth()->id()) {
            abort(403, 'No estás autorizado a retirar esta solicitud.');
        }

        $solicitud->delete();

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
