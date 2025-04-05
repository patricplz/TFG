<?php

namespace App\Http\Controllers;

use App\Models\SolicitudPractica;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
        {
            $solicitudes = SolicitudPractica::all();

            return Inertia::render('Alumno/dashboard', [
                'solicitudes' => $solicitudes,
            ]);
        }
    }
