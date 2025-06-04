<?php


namespace App\Http\Controllers;

use App\Models\OfertaPractica;
use App\Models\Alumno;
use App\Models\Empresa;
use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class EmpresaController extends Controller{
    //ofertas creadas por la misma empresa mostradas en el dashboard
    public function index(){
        $empresaId = Auth::id();
        $ofertas = OfertaPractica::where('empresa_id', $empresaId)->latest()->get();

        return Inertia::render('Empresa/dashboard', [
            'ofertas' => $ofertas,
        ]);
    }

    //función para ver el perfil de un alumno
    public function verPerfilAlumno($id, Request $request){
        $alumno = Alumno::findOrFail($id);
        $oferta_id = $request->oferta_id;

        return Inertia::render('Empresa/VerPerfilAlumno', ['alumno' => $alumno, 'oferta_id' => $oferta_id]);
    }

    //función para editar el perfil de empresa
    public function mostrarPerfil(){
        $empresa = Empresa::where('empresa_id', Auth::id())->first();
        return Inertia::render('Empresa/CompleteProfile', ['empresa' => $empresa]);
    }

    //función para guardar el perfil de empresa al editarlo
    public function guardarPerfil(Request $request) {

        Validator::make($request->all(), [
            'nombre' => 'required|string|max:255',
            'cif_nif' => 'string|max:20',
            'sector_actividad' => 'required|string|max:255',
            'descripcion' => 'nullable|string|max:1000',
            'ubicacion' => 'nullable|string|max:255',
            'sitio_web' => 'nullable|url|max:255',
            'num_empleados' => 'nullable|integer|min:1',
            'contacto_nombre' => 'nullable|string|max:255',
            'contacto_email' => 'nullable|email|max:255',
            'contacto_telefono' => 'nullable|string|max:20',
            'practicas_remuneradas' => 'nullable|boolean',
            'areas_practicas' => 'nullable|string|max:1000',
        ])->validate();

        $empresaID = Auth::id();
        $empresa = Empresa::where('empresa_id', $empresaID)->first();

        //si no existe la empresa, se crea, si existe, se edita
        if (!$empresa) {
            $empresa = new Empresa();
            $empresa->empresa_id = $empresaID;
        }
        $empresa->nombre = $request->input('nombre');
        $empresa->cif_nif = $request->input('cif_nif');
        $empresa->sector_actividad = $request->input('sector_actividad');
        $empresa->descripcion = $request->input('descripcion');
        $empresa->ubicacion = $request->input('ubicacion');
        $empresa->sitio_web = $request->input('sitio_web');
        $empresa->num_empleados = $request->input('num_empleados');
        $empresa->contacto_nombre = $request->input('contacto_nombre');
        $empresa->contacto_email = $request->input('contacto_email');
        $empresa->contacto_telefono = $request->input('contacto_telefono');
        $empresa->practicas_remuneradas = $request->input('practicas_remuneradas') ?? false;
        $empresa->areas_practicas = $request->input('areas_practicas');

        if ($empresa->save()){
            \Log::info("EMPRESA ACTUALIZADA:". $empresa );
            return redirect()->route('empresa.dashboard')->with('success', 'Perfil de empresa actualizado con éxito.');
        } else {
            \log::error('NO SE ACTUALIZÓ'. $empresa );
        }
    }
}