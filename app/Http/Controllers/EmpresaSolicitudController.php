<?php
// app/Http/Controllers/EmpresaSolicitudController.php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\SolicitudPractica;

class EmpresaSolicitudController extends Controller
{
    public function create()
    {
        return Inertia::render('Empresa/SolicitudCreate');
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'required|string',
            'image' => 'nullable|image|max:2048',
        ]);

        $path = $request->file('image')?->store('solicitudes', 'public');

        SolicitudPractica::create([
            'name' => $request->name,
            'description' => $request->description,
            'image_path' => $path,
            'empresa_id' => auth()->id(),
        ]);

        return redirect()->route('empresa.dashboard')->with('success', 'Solicitud creada correctamente');
    }
}
