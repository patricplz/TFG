<?php


namespace App\Http\Controllers;

use App\Models\OfertaPractica;
use Inertia\Inertia;

use Illuminate\Support\Facades\Auth;

class EmpresaController extends Controller
{
    public function index()
    {
        // Obtén el ID de la empresa autenticada
        $empresaId = Auth::id();

        // Obtén todas las ofertas que pertenecen a esta empresa
        $ofertas = OfertaPractica::where('empresa_id', $empresaId)
            ->latest() // Opcional: Ordenar por la más reciente
            ->get();

        // Devuelve la vista con las ofertas de la empresa
        return Inertia::render('Empresa/dashboard', [
            'ofertas' => $ofertas,
        ]);
    }
}