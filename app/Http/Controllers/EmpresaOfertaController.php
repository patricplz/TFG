<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\OfertaPractica;
use App\Models\User;
use App\Models\SolicitudPracticaAlumno;
use App\Models\Alumno;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

class EmpresaOfertaController extends Controller{
    //eliminar una oferta creada por una empresa
    public function destroy(OfertaPractica $oferta){
        if ($oferta->empresa_id !== Auth::id()) {
            abort(403, 'No estás autorizado a eliminar esta oferta.');
        }
        if ($oferta->image_path) {
            Storage::delete('public/' . $oferta->image_path);
        }
        $oferta->delete();

        return redirect()->route('empresa.dashboard')->with('success', 'Oferta eliminada con éxito');
    }

    //mostrar una oferta de prácticas
    public function show(OfertaPractica $oferta){
        if ($oferta->empresa_id !== Auth::id()) {
            abort(403, 'No estás autorizado para poder ver los detalles de esta oferta');
        }

        return Inertia::render('Empresa/OfertaShow', [
            'oferta' => $oferta,
        ]);
    }

    //ir a la página para crear una oferta de prácticas
    public function create(){
        return Inertia::render('Empresa/OfertaCreate');
    }

    //ir a la página de editar una oferta de prácticas
    public function edit(OfertaPractica $oferta){
        return Inertia::render('Empresa/OfertaEdit', [
            'oferta' => $oferta,
        ]);
    }

    //guardar/crear una oferta de prácticas
    public function store(Request $request){
        $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'required|string',
            'image' => 'nullable|image|max:2048',
            'habilidades_blandas_requeridas' => 'nullable|string',
            'habilidades_tecnicas_requeridas' => 'nullable|string',
            'formacion_requerida' => 'nullable|string',
            'experiencia_laboral_requerida' => 'nullable|string',
            'disponibilidad_requerida' => 'nullable|string|max:255',
            'modalidad_practicas_requerida' => 'nullable|string|max:255',
            'idiomas_requeridos' => 'nullable|string|max:255',
            'sector_interes_requerido' => 'nullable|string|max:255',
        ]);

        $path = $request->file('image')?->store('Ofertas', 'public');

        OfertaPractica::create([
            'empresa_id' => auth()->id(),
            'name' => $request->name,
            'description' => $request->description,
            'image_path' => $path,
            'habilidades_blandas_requeridas' => $request->habilidades_blandas_requeridas,
            'habilidades_tecnicas_requeridas' => $request->habilidades_tecnicas_requeridas,
            'formacion_requerida' => $request->formacion_requerida,
            'experiencia_laboral_requerida' => $request->experiencia_laboral_requerida,
            'disponibilidad_requerida' => $request->disponibilidad_requerida,
            'modalidad_practicas_requerida' => $request->modalidad_practicas_requerida,
            'idiomas_requeridos' => $request->idiomas_requeridos,
            'sector_interes_requerido' => $request->sector_interes_requerido,
        ]);

        return redirect()->route('empresa.dashboard')->with('success', 'Oferta creada correctamente');
    }


    //updatear una oferta de prácticas
    public function update(Request $request, OfertaPractica $oferta){
        $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'required|string',
            'image' => 'nullable|image|max:2048', 
            'habilidades_blandas_requeridas' => 'nullable|string',
            'habilidades_tecnicas_requeridas' => 'nullable|string',
            'formacion_requerida' => 'nullable|string',
            'experiencia_laboral_requerida' => 'nullable|string',
            'disponibilidad_requerida' => 'nullable|string',
            'modalidad_practicas_requerida' => 'nullable|string',
            'idiomas_requeridos' => 'nullable|string',
            'sector_interes_requerido' => 'nullable|string',
            'ubicacion' => 'nullable|string',
        ]);

        $oferta->name = $request->input('name');
        $oferta->description = $request->input('description');
        $oferta->habilidades_blandas_requeridas = $request->input('habilidades_blandas_requeridas');
        $oferta->habilidades_tecnicas_requeridas = $request->input('habilidades_tecnicas_requeridas');
        $oferta->formacion_requerida = $request->input('formacion_requerida');
        $oferta->experiencia_laboral_requerida = $request->input('experiencia_laboral_requerida');
        $oferta->disponibilidad_requerida = $request->input('disponibilidad_requerida');
        $oferta->modalidad_practicas_requerida = $request->input('modalidad_practicas_requerida');
        $oferta->idiomas_requeridos = $request->input('idiomas_requeridos');
        $oferta->sector_interes_requerido = $request->input('sector_interes_requerido');
        $oferta->ubicacion = $request->input('ubicacion');

        if ($request->hasFile('image')) {
            if ($oferta->image_path) {
                Storage::delete($oferta->image_path);
            }
            $path = $request->file('image')->store('public/ofertas');
            $oferta->image_path = str_replace('public/', '', $path);
        }
        $oferta->save();

        return redirect()->route('empresa.dashboard')->with('success', 'Oferta actualizada con éxito.');
    }

    //ver los alumnos inscritos a una oferta de prácticas
    public function inscritos(OfertaPractica $oferta){
        if ($oferta->empresa_id !== Auth::id()) {
            abort(403, 'No estás autorizado a ver los alumnos inscritos en esta oferta.');
        }

        $solicitudes = SolicitudPracticaAlumno::where('practica_id', $oferta->id)->with('alumno') ->get();

        $alumnosInscritos = $solicitudes->map(function ($solicitud) {
            if ($solicitud->alumno) {
                return [
                    'alumno_id' => $solicitud->alumno->alumno_id, 
                    'nombre' => $solicitud->alumno->nombre ?? null, 
                    'apellidos' => $solicitud->alumno->apellidos ?? null, 
                    'foto_perfil' => $solicitud->alumno->foto_perfil_path ?? null,
                    'formacion' => $solicitud->alumno->formacion ?? null,
                ];
            } else {
                return null;
            }
        })->filter(fn ($alumno) => $alumno !== null);

        return Inertia::render('Empresa/OfertaInscritos', [
            'oferta' => $oferta,
            'alumnosInscritos' => $alumnosInscritos,
        ]);
    }
}