<?php
namespace App\Http\Controllers;
use Illuminate\Support\Facades\Auth;
//Mostrar la solicitud de practicas clickada por el alumno en su dashboard
use App\Models\OfertaPractica;
use App\Models\SolicitudPracticaAlumno;
use App\Models\Alumno;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Validator;

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

    public function guardarPerfil(Request $request){
        Validator::make($request->all(), [
            'cv' => 'nullable|mimes:pdf|max:2048',
            'foto_perfil' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'intereses' => 'nullable|string|max:255',
            'descripcion' => 'nullable|string|max:500',
            'formacion' => 'nullable|string|max:1000',
            'experiencia_laboral' => 'nullable|string|max:1000',
            'habilidades_tecnicas' => 'nullable|string|max:255',
            'habilidades_blandas' => 'nullable|string|max:255',
            'practicas_interes' => 'nullable|string|max:255',
            'sectores_interes' => 'nullable|string|max:255',
            'disponibilidad' => 'nullable|string|max:255',
            'modalidad_practicas' => 'nullable|string|max:20',
            'expectativas_aprendizaje' => 'nullable|string|max:500',
            'idiomas' => 'nullable|string|max:255',
            'portafolio' => 'nullable|url|max:255',
            'certificaciones' => 'nullable|string|max:1000',
            'premios' => 'nullable|string|max:1000',
            'referencias' => 'nullable|string|max:1000',
            'nombre' => 'required|string|max:255', 
            'apellidos' => 'required|string|max:255',
            'fecha_nacimiento' => 'nullable|date',
            'localidad' => 'nullable|string|max:255',
        ])->validate();

        $alumnoId = Auth::id();
        $alumno = Alumno::where('alumno_id', $alumnoId)->firstOrNew(['alumno_id' => $alumnoId]);

        if ($request->hasFile('cv')) {
            if ($alumno->cv_path) {
                Storage::delete($alumno->cv_path); // Eliminar el CV anterior si existe
            }
            $path = $request->file('cv')->store('cvs', 'public');
            $alumno->cv_path = $path;
        }

        if ($request->hasFile('foto_perfil')) {
            if ($alumno->foto_perfil_path) {
                Storage::delete($alumno->foto_perfil_path); // Eliminar la foto anterior si existe
            }
            $path = $request->file('foto_perfil')->store('fotos_perfil', 'public');
            $alumno->foto_perfil_path = $path;
        }

        $alumno->intereses = $request->input('intereses');
        $alumno->descripcion = $request->input('descripcion');
        $alumno->formacion = $request->input('formacion');
        $alumno->experiencia_laboral = $request->input('experiencia_laboral');
        $alumno->habilidades_tecnicas = $request->input('habilidades_tecnicas');
        $alumno->habilidades_blandas = $request->input('habilidades_blandas');
        $alumno->practicas_interes = $request->input('practicas_interes');
        $alumno->sectores_interes = $request->input('sectores_interes');
        $alumno->disponibilidad = $request->input('disponibilidad');
        $alumno->modalidad_practicas = $request->input('modalidad_practicas');
        $alumno->expectativas_aprendizaje = $request->input('expectativas_aprendizaje');
        $alumno->idiomas = $request->input('idiomas');
        $alumno->portafolio = $request->input('portafolio');
        $alumno->certificaciones = $request->input('certificaciones');
        $alumno->premios = $request->input('premios');
        $alumno->referencias = $request->input('referencias');
        $alumno->nombre = $request->input('nombre');
        $alumno->apellidos = $request->input('apellidos');
        $alumno->fecha_nacimiento = $request->input('fecha_nacimiento');
        $alumno->localidad = $request->input('localidad');
        $alumno->save();

        return redirect()->route('alumno.dashboard')->with('success', 'Perfil actualizado con éxito.');
    }

    public function perfil() {
        $alumno = Alumno::where('alumno_id', Auth::id())->first();
        return Inertia::render('Alumno/perfil', [
            'alumno' => $alumno, // Pasar los datos existentes al formulario
        ]);
    }

    public function mostrarFormularioEditarPerfil()
    {
        $alumno = Alumno::where('alumno_id', Auth::id())->first();
        return Inertia::render('Alumno/CompleteProfile', [ 
            'alumno' => $alumno,
        ]);
    }

}
