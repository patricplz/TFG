<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

use App\Http\Controllers\EmpresaSolicitudController;


Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

// Rutas generales para usuarios autenticados
Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});

#Ruta para alumnos
Route::middleware(['auth', 'role:alumno'])->get('/alumno/dashboard', function () {
    return Inertia::render('Alumno/dashboard');
})->name('alumno.dashboard');

#Ruta para empresas
Route::middleware(['auth', 'role:empresa'])->get('/empresa/dashboard', function () {
    return Inertia::render('Empresa/dashboard');
})->name('empresa.dashboard');

 #todo: Juntarlos el de arriba y el de abajo
Route::middleware(['auth', 'role:empresa'])->group(function () {
    Route::get('/empresa/solicitud/crear', [EmpresaSolicitudController::class, 'create'])->name('empresa.solicitud.create');
    Route::post('/empresa/solicitud', [EmpresaSolicitudController::class, 'store'])->name('empresa.solicitud.store');
});



require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
