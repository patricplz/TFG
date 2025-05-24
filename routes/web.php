<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

use App\Http\Controllers\EmpresaOfertaController;
use App\Http\Controllers\DashboardAlumnoController;
use App\Http\Controllers\AlumnoController;
use App\Http\Controllers\SolicitudPracticaController;
use App\Http\Controllers\EmpresaController;
use App\Http\Controllers\AIPredictionController;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

// Rutas generales para usuarios autenticados
Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        $user = auth()->user(); 
        
        if ($user->role == 'alumno') {
            return redirect()->route('alumno.dashboard');
        } elseif ($user->role == 'empresa') {
            return redirect()->route('empresa.dashboard');
        }
        
        return redirect()->route('home');
    })->name('dashboard');
});



#Ruta para alumnos

Route::middleware(['auth', 'verified', 'role:alumno'])->group(function () {
    // Route::get('/alumno/dashboard', [DashboardAlumnoController::class, 'index'])->name('alumno.dashboard');
    Route::get('/alumno/dashboard', [DashboardAlumnoController::class, 'mostrarSectores'])->name('alumno.dashboard');
    Route::get('/alumno/dashboard/sector/{sector}', [DashboardAlumnoController::class, 'mostrarOfertasPorSector'])->name('alumno.dashboard.sector');
    Route::get('/alumno/oferta/{id}', [AlumnoController::class, 'show'])->name('alumno.solicitud.show');
    Route::post('/alumno/solicitar/{practicaId}', [SolicitudPracticaController::class, 'store'])->name('alumno.solicitar');
    Route::post('/alumno/oferta/{practicaId}/inscribir', [SolicitudPracticaController::class, 'store'])->name('alumno.practica.inscribir');
    Route::get('/alumno/solicitudes', [AlumnoController::class, 'solicitudesInscritas'])->name('alumno.solicitudes');
    Route::delete('/alumno/solicitudes/{solicitud}', [SolicitudPracticaController::class, 'retirarSolicitud'])->name('alumno.solicitudes.retirar');
    Route::get('/alumno/perfil', [AlumnoController::class, 'perfil'])->name('alumno.perfil');
    Route::get('/alumno/perfil/editar', [AlumnoController::class, 'mostrarFormularioEditarPerfil'])->name('alumno.perfil.editar');
    Route::post('/alumno/perfil/guardar', [AlumnoController::class, 'guardarPerfil'])->name('alumno.perfil.guardar');
    Route::get('/alumno/empresa/{empresa_id}', [AlumnoController::class, 'verPerfilEmpresa'])->name('alumno.empresa.ver');
});
#Ruta para empresas
Route::middleware(['auth', 'role:empresa'])->get('/empresa/dashboard',[EmpresaController::class, 'index'])->name('empresa.dashboard');

 #todo: Juntarlos el de arriba y el de abajo
Route::middleware(['auth', 'role:empresa'])->group(function () {
    Route::get('/empresa/oferta/crear', [EmpresaOfertaController::class, 'create'])->name('empresa.oferta.create');
    Route::post('/empresa/Oferta', [EmpresaOfertaController::class, 'store'])->name('empresa.oferta.store');
    Route::get('/empresa/oferta/{oferta}/editar', [EmpresaOfertaController::class, 'edit'])->name('empresa.oferta.edit');
    Route::get('/empresa/oferta/{oferta}', [EmpresaOfertaController::class, 'show'])->name('empresa.oferta.show');
    Route::put('/empresa/oferta/{oferta}', [EmpresaOfertaController::class, 'update'])->name('empresa.oferta.update');
    Route::delete('/empresa/oferta/{oferta}', [EmpresaOfertaController::class, 'destroy'])->name('empresa.oferta.destroy');
    Route::get('/empresa/oferta/{oferta}/alumnos', [EmpresaOfertaController::class, 'inscritos'])->name('empresa.oferta.inscritos');
    Route::get('/empresa/perfilAlumno/{id}', [EmpresaController::class, 'verPerfilAlumno'])->name('empresa.perfilAlumno.ver');
    Route::get('/empresa/perfil', [EmpresaController::class, 'mostrarPerfil'])->name('empresa.perfil.editar');
    Route::post('/empresa/perfil', [EmpresaController::class, 'guardarPerfil'])->name('empresa.perfil.guardar');
    Route::get('/api/ofertas/{ofertaId}/compatibilidad-ia', [AIPredictionController::class, 'obtenerPuntuacionesCompatibilidad'])->name('api.ofertas.compatibilidad-ia');
    Route::post('/empresa/alumno/{oferta}/{alumno}/actualizarEstado', [SolicitudPracticaController::class, 'actualizarEstado'])->name('empresa.alumno.actualizarEstado');
});



require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
