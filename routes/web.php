<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

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




require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
