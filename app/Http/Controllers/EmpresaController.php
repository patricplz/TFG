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
    public function index(){
        $empresaId = Auth::id();
        $ofertas = OfertaPractica::where('empresa_id', $empresaId)->latest()->get();

        return Inertia::render('Empresa/dashboard', [
            'ofertas' => $ofertas,
        ]);
    }

    public function verPerfilAlumno($id, Request $request){
        $alumno = Alumno::findOrFail($id);
        $oferta_id = $request->oferta_id;

        return Inertia::render('Empresa/VerPerfilAlumno', ['alumno' => $alumno, 'oferta_id' => $oferta_id]);
    }

    public function mostrarPerfil(){
        $empresa = Empresa::where('empresa_id', Auth::id())->first();
        return Inertia::render('Empresa/CompleteProfile', ['empresa' => $empresa]);
    }

    public function guardarPerfil(Request $request) {
        Validator::make($request->all(), [
            'nombre' => 'required|string|max:255',
            'cif_nif' => 'required|string|max:20|unique:empresas,cif_nif,' . optional(Empresa::where('user_id', Auth::id())->first())->id,
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

        $empresa = Empresa::firstOrNew(['empresa_id' => Auth::id()]);

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

        $empresa->save();
        return redirect()->route('empresa.dashboard')->with('success', 'Perfil de empresa actualizado con éxito.');
    }
}