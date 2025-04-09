<?php


namespace App\Http\Controllers;

use App\Models\OfertaPractica;
use Inertia\Inertia;

class DashboardAlumnoController extends Controller
{
    public function index()
    {
        // Obtén todas las solicitudes
        $ofertas = OfertaPractica::all();

        // Devuelve la vista con las solicitudes
        return Inertia::render('Alumno/dashboard', [
            'ofertas' => $ofertas,
        ]);
    }
}
