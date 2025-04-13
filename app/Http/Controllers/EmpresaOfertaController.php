<?php
// app/Http/Controllers/EmpresaOfertaController.php 
//Creacion de oferta por parte de la empresa en la url /empresa/oferta/crear
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\OfertaPractica;

class EmpresaOfertaController extends Controller
{
    public function create()
    {
        return Inertia::render('Empresa/OfertaCreate');
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'required|string',
            'image' => 'nullable|image|max:2048',
        ]);

        $path = $request->file('image')?->store('Ofertas', 'public');

        OfertaPractica::create([
            'name' => $request->name,
            'description' => $request->description,
            'image_path' => $path,
            'empresa_id' => auth()->id(),
        ]);

        return redirect()->route('empresa.dashboard')->with('success', 'Oferta creada correctamente');
    }
}
