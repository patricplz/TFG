<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\Empresa;
use App\Models\Alumno;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Inertia\Inertia;
use Inertia\Response;

class RegisteredUserController extends Controller
{
    /**
     * Show the registration page.
     */
    public function create(): Response
    {
        return Inertia::render('auth/register');
    }

    /**
     * Handle an incoming registration request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|lowercase|email|max:255|unique:'.User::class,
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
            'role' => 'required|in:alumno,empresa',
        ]);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'role' => $request->role,
        ]);

        event(new Registered($user));

        Auth::login($user);

        if ($user->role == 'alumno') {
            $alumnoExists = Alumno::where('user_id', $user->id)->exists();
            if (!$alumnoExists) {
                return redirect()->route('alumno.perfil.editar');
            } else {
                return redirect()->route('alumno.dashboard');
            }
        } elseif ($user->role == 'empresa') {
            $empresaExists = Empresa::where('user_id', $user->id)->exists();
            if (!$empresaExists) {
                return redirect()->route('empresa.perfil.editar');
            } else {
                return redirect()->route('empresa.dashboard');
            }
        }

        return to_route('dashboard');
    }
}
