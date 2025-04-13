<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

use App\Http\Controllers\EmpresaOfertaController;
use App\Http\Controllers\DashboardAlumnoController;
use App\Http\Controllers\AlumnoController;
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

    Route::middleware(['auth', 'verified', 'role:alumno'])->group(function () {
    Route::get('/alumno/dashboard', [DashboardAlumnoController::class, 'index'])->name('alumno.dashboard');
    Route::get('/alumno/oferta/{id}', [AlumnoController::class, 'show'])->name('alumno.solicitud.show');
    Route::post('/alumno/solicitar/{practicaId}', [SolicitudPracticaController::class, 'store'])->name('alumno.solicitar');
    Route::post('/alumno/oferta/{practicaId}/inscribir', [SolicitudPracticaController::class, 'store'])->name('alumno.practica.inscribir');
    Route::get('/alumno/solicitudes', [AlumnoController::class, 'solicitudesInscritas'])->name('alumno.solicitudes');

    // Ruta para mostrar el formulario de completar perfil
    Route::get('/alumno/perfil', [AlumnoController::class, 'perfil'])->name('alumno.perfil');

    // Ruta para mostrar el formulario de edición del perfil (GET)
    Route::get('/alumno/perfil/editar', [AlumnoController::class, 'mostrarFormularioEditarPerfil'])->name('alumno.perfil.editar');

    // Ruta para guardar los datos del formulario de perfil (esta es la que necesitas)
    Route::post('/alumno/perfil/guardar', [AlumnoController::class, 'guardarPerfil'])->name('alumno.perfil.guardar');
});
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
