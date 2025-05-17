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

    //función que recibe mi petición HTTP de ofertaInscritos.php, obtiene la oferta, los alumnos inscritos a esa oferta y su información, se la pasa a GeminiAIService, formatea la respuesta, ordena los alumnos de mayor a menor calificación y devuelve el json ordenado
    public function obtenerPuntuacionesCompatibilidad(Request $request, $ofertaId): JsonResponse{
        $oferta = OfertaPractica::findOrFail($ofertaId);
        $alumnoIds = SolicitudPracticaAlumno::where('practica_id', $ofertaId)->pluck('alumno_id')->toArray();

        $ofertaSeleccionada = [
            'name' => $oferta->name,
            'description' => $oferta->description,
            'habilidades_blandas_requeridas' => $oferta->habilidades_blandas_requeridas,
            'habilidades_tecnicas_requeridas' => $oferta->habilidades_tecnicas_requeridas,
            'formacion_requerida' => $oferta->formacion_requerida,
            'idiomas_requeridos' => $oferta->idiomas_requeridos,
        ];

        if (empty($alumnoIds)) return response()->json(['message' => 'no hay solicitudes para esta oferta'], 200);

        $alumnos = Alumno::whereIn('alumno_id', $alumnoIds)
        ->select(['alumno_id','formacion', 'habilidades_tecnicas', 'habilidades_blandas', 'idiomas', 'intereses', 'certificaciones'])
        ->get()
        ->toArray();
        if (empty($alumnos)) return response()->json(['message' => 'no se encontró ningún perfil'], 200);

        \Log::info("Datos de la oferta:", $ofertaSeleccionada);
        \Log::info("Datos de los alumnos:", $alumnos);

        $scores = $this->geminiAIService->getCompatibilityScores($ofertaSeleccionada, $alumnos);
        
        \Log::info("Puntuaciones de Gemini:", $scores);
        
        $matches = [];
        foreach ($alumnos as $alumno) {
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
        usort($matches, function ($a, $b) {
            return ($b['puntuacion'] ?? -1) <=> ($a['puntuacion'] ?? -1); 
        });

        return response()->json($matches);
    }
}