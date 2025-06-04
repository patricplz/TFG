<?php

namespace App\Http\Middleware;

use App\Models\Alumno;
use App\Models\Empresa;
use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;

class CheckProfileCompleted
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure(\Illuminate\Http\Request): (\Illuminate\Http\Response|\Illuminate\Http\RedirectResponse)  $next
     * @return \Illuminate\Http\Response|\Illuminate\Http\RedirectResponse
     */


     // función para asegurarse de que los usuarios (alumnos y empresas) tienen su perfil completado antes de permitirles acceder a la mayoría de las páginas de la aplicación
    public function handle(Request $request, Closure $next)
    {
        $user = Auth::user();

        if ($user) {
            if ($user->role === 'alumno') {
                $alumnoExists = Alumno::where('user_id', $user->id)->exists();
                if (!$alumnoExists && $request->route()->getName() !== 'alumno.perfil.editar' && $request->route()->getName() !== null) {
                    return Redirect::route('alumno.perfil.editar');
                }
            } elseif ($user->role === 'empresa') {
                $empresaExists = Empresa::where('user_id', $user->id)->exists();
                if (!$empresaExists && $request->route()->getName() !== 'empresa.perfil.editar' && $request->route()->getName() !== null) {
                    return Redirect::route('empresa.perfil.editar');
                }
            }
        }

        return $next($request);
    }
}