<?php
namespace App\Http\Controllers;
use App\Models\OfertaPractica;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardAlumnoController extends Controller{
    public function mostrarSectores(Request $request){
        $queryOfertas = OfertaPractica::query();
        if ($request->has('palabra_clave') && $request->filled('palabra_clave')) {
            $palabraClave = $request->input('palabra_clave');
            $queryOfertas->where('sector_interes_requerido', 'like', "%{$palabraClave}%");
        }

        if ($request->has('sector') && $request->filled('sector')) {
            $sector = $request->input('sector');
            $queryOfertas->where('sector_interes_requerido', $sector);
        }

        $sectoresFP = $queryOfertas->distinct('sector_interes_requerido')->whereNotNull('sector_interes_requerido')->pluck('sector_interes_requerido')->toArray(); //SECTORES FILTRADOS PARA MOSTRARLOS EN EL DASHBOARD
        $todosSectoresFP = OfertaPractica::distinct('sector_interes_requerido')->whereNotNull('sector_interes_requerido')->pluck('sector_interes_requerido')->toArray(); //TODOS LOS SECTORES PARA EL SELECT DEL FILTRO

        return Inertia::render('Alumno/dashboard', [
            'sectoresFP' => $sectoresFP,
            'filtros' => $request->only(['palabra_clave', 'sector']), //de la url mando solo la palabra_clave y el sector como filtros
            'sectoresFP_select' => $todosSectoresFP
        ]);
    }

    public function mostrarOfertasPorSector(Request $request, $sector){
        $query = OfertaPractica::query()->where('sector_interes_requerido', $sector);

        if ($request->has('palabra_clave') && $request->filled('palabra_clave')) {
            $palabraClave = $request->input('palabra_clave');
            $query->where('name', 'like', "%{$palabraClave}%");
        }
        if ($request->has('modalidad') && $request->filled('modalidad')) {
            $modalidad = $request->input('modalidad');
            $query->where('modalidad_practicas_requerida', $modalidad);
        }
        $ofertasFiltradas = $query->get();
        $modalidades = OfertaPractica::distinct('modalidad_practicas_requerida')
            ->whereNotNull('modalidad_practicas_requerida')
            ->pluck('modalidad_practicas_requerida')
            ->toArray();

        return Inertia::render('Alumno/SectorOfertas', [ 
            'ofertas' => $ofertasFiltradas,
            'sector' => $sector,
            'modalidades' => $modalidades,
            'filtros' => $request->only(['palabra_clave', 'sector', 'modalidad']),
        ]);
    }
}