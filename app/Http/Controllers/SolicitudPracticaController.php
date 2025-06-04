<?php

namespace App\Http\Controllers;

use App\Models\SolicitudPracticaAlumno;
use App\Models\OfertaPractica;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use App\Models\Alumno;
use Illuminate\Validation\ValidationException;
class SolicitudPracticaController extends Controller
{
    //función del alumno para inscribirse a una oferta de prácticas
    public function store(Request $request, $practicaId)
    {
        
            $alumnoId = Auth::id();
            if (SolicitudPracticaAlumno::where('practica_id', $practicaId)->where('alumno_id', $alumnoId)->exists()) {
                throw ValidationException::withMessages([
                    'inscription' => 'Ya estás inscrito en esta práctica.', // 'inscription' es el campo de error
                ])->status(422);
            }
        
            
        try{
            // Crear la solicitud
            SolicitudPracticaAlumno::create([
                'practica_id' => $practicaId,
                'alumno_id' => $alumnoId,
            ]);
    
            // Redirigir al dashboard con un mensaje de éxito
            return redirect()->route('alumno.dashboard')->with('success', 'Solicitud enviada con éxito.');
        }catch(\Exception $e){
            throw ValidationException::withMessages([
                'auth' => 'Debes completar tu perfil antes de poder inscribirte.',
            ])->status(401);
        }
    }

    //lógica para retirar una solicitud de prácticas
    public function retirarSolicitud(SolicitudPracticaAlumno $solicitud)
    {
        if ($solicitud->alumno_id !== auth()->id()) {
            abort(403, 'No estás autorizado a retirar esta solicitud.');
        }

        $solicitud->delete();

        $alumnoId = Auth::id();

        //vuelve a cargar las demás solicitudes de prácticas a las que se ha inscrito
        $solicitudes = SolicitudPracticaAlumno::where('alumno_id', $alumnoId)
            ->with('ofertaPractica') 
            ->latest()
            ->get();

        return Inertia::render('Alumno/SolicitudesInscritas', [
            'solicitudes' => $solicitudes,
        ]);
    }

    public function actualizarEstado(Request $request, $oferta, $alumno)
    {
        $estado = $request->input('estado');

        try {
            $solicitud = SolicitudPracticaAlumno::where('practica_id', $oferta)
                ->where('alumno_id', $alumno)
                ->first();

            if ($solicitud && $solicitud->estado != $estado) {
                $solicitud->estado = $estado;
                $solicitud->save();

                
                if ($solicitud->estado == 'seleccionado'){
                    return response()->json(['message' => 'Estado de la solicitud actualizado correctamente a seleccionado'], 200);
                } else {
                    return response()->json(['message' => 'Estado de la solicitud actualizado correctamente a rechazado'], 200);
                }
            } else if ($solicitud && $solicitud->estado == 'seleccionado'){
                return response()->json(['message' => 'La solicitud ya está aprobada'], 200);
            } else if ($solicitud && $solicitud->estado == 'rechazado'){
                return response()->json(['message' => 'La solicitud ya está rechazada'], 200);
            } else {
                return response()->json(['message' => 'No se encontró la solicitud de práctica para este alumno y oferta'], 404);
            }

        } catch (\Exception $e) {
        
            return response()->json(['message' => 'Error al actualizar el estado de la solicitud', 'error' => $e->getMessage()], 500);
        }
    }
}
