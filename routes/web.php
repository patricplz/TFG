<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

use App\Http\Controllers\EmpresaOfertaController;
use App\Http\Controllers\DashboardAlumnoController;
use App\Http\Controllers\AlumnoSolicitudController;
use App\Http\Controllers\SolicitudPracticaController;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

// Rutas generales para usuarios autenticados
Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        $user = auth()->user(); // Obtiene el usuario autenticado
        
        // Comprobar el rol del usuario y redirigir en consecuencia
        if ($user->role == 'alumno') {
            return redirect()->route('alumno.dashboard');
        } elseif ($user->role == 'empresa') {
            return redirect()->route('empresa.dashboard');
        }
        
        // Si no tiene rol o no coincide, puedes devolver una respuesta predeterminada o un error
        return redirect()->route('home');
    })->name('dashboard');
});



#Ruta para alumnos
// Rutas para alumnos
Route::middleware(['auth', 'role:alumno'])->get('/alumno/dashboard', [DashboardAlumnoController::class, 'index'])->name('alumno.dashboard');
Route::middleware(['auth', 'role:alumno'])->get('/alumno/oferta/{id}', [AlumnoSolicitudController::class, 'show'])->name('alumno.solicitud.show');
Route::middleware(['auth', 'role:alumno'])->post('/alumno/solicitar/{practicaId}', [SolicitudPracticaController::class, 'store'])->name('alumno.solicitar');
Route::post('/alumno/oferta/{practicaId}/inscribir', [SolicitudPracticaController::class, 'store'])->name('alumno.practica.inscribir');

#Ruta para empresas
Route::middleware(['auth', 'role:empresa'])->get('/empresa/dashboard', function () {
    return Inertia::render('Empresa/dashboard');
})->name('empresa.dashboard');

 #todo: Juntarlos el de arriba y el de abajo
Route::middleware(['auth', 'role:empresa'])->group(function () {
    Route::get('/empresa/oferta/crear', [EmpresaOfertaController::class, 'create'])->name('empresa.oferta.create');
    Route::post('/empresa/Oferta', [EmpresaOfertaController::class, 'store'])->name('empresa.oferta.store');
});



require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
