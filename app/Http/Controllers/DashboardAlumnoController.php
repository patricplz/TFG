<?php

namespace App\Http\Controllers;

use App\Models\OfertaPractica;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardAlumnoController extends Controller
{
    public function index(Request $request)
    {
        $query = OfertaPractica::query();

        // Filtrado por palabra clave en el nombre
        if ($request->has('palabra_clave') && $request->filled('palabra_clave')) {
            $palabraClave = $request->input('palabra_clave');
            $query->where('name', 'like', "%{$palabraClave}%");
        }

        // Filtrado por sector
        if ($request->has('sector') && $request->filled('sector')) {
            $sector = $request->input('sector');
            $query->where('sector_interes_requerido', $sector);
        }

        // Filtrado por modalidad
        if ($request->has('modalidad') && $request->filled('modalidad')) {
            $modalidad = $request->input('modalidad');
            $query->where('modalidad_practicas_requerida', $modalidad);
        }

        $ofertasFiltradas = $query->get(); // Obtiene las ofertas filtradas

        // Obtener los sectores únicos para FP (para el select)
        $modalidades = OfertaPractica::distinct('modalidad_practicas_requerida')
        ->whereNotNull('modalidad_practicas_requerida')
        ->pluck('modalidad_practicas_requerida')
        ->toArray();

    // Obtener los sectores únicos desde la base de datos
    $sectoresFP = OfertaPractica::distinct('sector_interes_requerido')
        ->whereNotNull('sector_interes_requerido')
        ->pluck('sector_interes_requerido')
        ->toArray();

        // Devuelve la vista del dashboard con las ofertas filtradas y los datos para los filtros
        return Inertia::render('Alumno/dashboard', [
            'ofertas' => $ofertasFiltradas,
            'sectoresFP' => $sectoresFP,
            'modalidades' => $modalidades,
            'filtros' => $request->only(['palabra_clave', 'sector', 'modalidad']), // Envía los filtros actuales para mantener el estado
        ]);
    }
}