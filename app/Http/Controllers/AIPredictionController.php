<?php
namespace App\Http\Controllers;
use App\Models\OfertaPractica;
use App\Models\SolicitudPracticaAlumno;
use App\Models\Alumno;
use App\Services\GeminiAIService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class AIPredictionController extends Controller{
    protected $geminiAIService;

    public function __construct(GeminiAIService $geminiAIService){
        $this->geminiAIService =$geminiAIService;
    }

    //función que recoge información de la oferta y los alumnos inscritos a ella, y devuelve los alumnos ordenados a la página
    public function obtenerPuntuacionesCompatibilidad(Request $request, $ofertaId): JsonResponse{
        $oferta = OfertaPractica::findOrFail($ofertaId);
        $alumnoIds = SolicitudPracticaAlumno::where('practica_id', $ofertaId)->pluck('alumno_id')->toArray();

        //recoge información relevante de la empresa
        $ofertaSeleccionada = [
            'name' => $oferta->name,
            'description' => $oferta->description,
            'habilidades_blandas_requeridas' => $oferta->habilidades_blandas_requeridas,
            'habilidades_tecnicas_requeridas' => $oferta->habilidades_tecnicas_requeridas,
            'formacion_requerida' => $oferta->formacion_requerida,
            'idiomas_requeridos' => $oferta->idiomas_requeridos,
        ];

        if (empty($alumnoIds)) return response()->json(['message' => 'no hay solicitudes para esta oferta'], 200);

        //recoge información relevante de los alumnos
        $alumnos = Alumno::whereIn('alumno_id', $alumnoIds)
        ->select(['alumno_id','formacion', 'habilidades_tecnicas', 'habilidades_blandas', 'idiomas', 'intereses', 'certificaciones'])
        ->get()
        ->toArray();
        if (empty($alumnos)) return response()->json(['message' => 'no se encontró ningún perfil'], 200);

        \Log::info("Datos de la oferta:", $ofertaSeleccionada);
        \Log::info("Datos de los alumnos:", $alumnos);

        //los manda a analizar la compatibilidad al servicio de gemini
        $scores = $this->geminiAIService->getCompatibilityScores($ofertaSeleccionada, $alumnos);
        
        \Log::info("Puntuaciones de Gemini:", $scores);
        
        $matches = []; 
        foreach ($alumnos as $alumno) { //coge el alumno y su puntuación
            if (isset($scores[$alumno['alumno_id']])){
                $matches[] = [
                    'alumno_id' => $alumno['alumno_id'],
                    'puntuacion' => $scores[$alumno['alumno_id']],
                ];
            } else{
                $matches[] = [
                    'alumno_id' =>$alumno['alumno_id'],
                    'puntuacion' => null,
                ];
            }
        }
        usort($matches, function ($a, $b) { //ordena la puntuación de mayor a menor
            return ($b['puntuacion'] ?? -1) <=> ($a['puntuacion'] ?? -1); 
        });

        return response()->json($matches);
    }
}