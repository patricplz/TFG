<?php

namespace App\Services;
use GeminiAPI\Client;
use GeminiAPI\Resources\ModelName;
use GeminiAPI\Resources\Parts\TextPart;

class GeminiAIService{
    protected $client;

    public function __construct(){
        $apiKey = env('GEMINI_API_KEY3');
        if (!$apiKey) {
            throw new \Exception('Error en la apiKey');
        }
        $this->client = new Client($apiKey);
    }

    public function getCompatibilityScores(array $oferta, array $alumnos): array{
        $scores = [];
        $promptBase = $this->formatPromptBase($oferta);
        // $apiKey = env('GEMINI_API_KEY');
        // $client = new Client($apiKey);
        // $response = $client->listModels();
        // \Log::info('Lista de modelos Gemini:', ['models' => $response->models]);
        // dd($response->models);

        foreach (array_chunk($alumnos, 2) as $batch) {
            $prompt = $promptBase . "\n\nAhora vamos a ver estos perfiles de alumnos \n\n**Perfiles de Alumnos:**\n";
            foreach ($batch as $alumno) {
                $prompt .= "**Alumno (ID: " . $alumno['alumno_id'] . "):\n";
                foreach ($alumno as $clave => $valor) {
                    $prompt .= ucfirst(str_replace('_', ' ', $clave)) . ": " . ($valor ?? 'N/A') . ".\n";
                }
                $prompt .= "\n";
            }
            $prompt .= "\nEvalúa la compatibilidad de cada alumno con la oferta de práctica descrita anteriormente en una escala de 1 (poco compatible) a 10 (muy compatible). Evalúa la relación entre la info del alumno con los requisitos de la oferta. Devuelve una respuesta QUE SEA ÚNICAMENTE un JSON con la siguiente estructura:\n\n[\n  {\"alumno_id\": ID_DEL_ALUMNO_1, \"calificacion\": CALIFICACION_1},\n  {\"alumno_id\": ID_DEL_ALUMNO_2, \"calificacion\": CALIFICACION_2},]";

            \Log::info("Prompt enviado a Gemini:", ['prompt' => $prompt]);
            
            try {
                $response = $this->client->generativeModel('gemini-1.5-flash')->generateContent(new TextPart($prompt));
                $responseText = $response->text();

                \Log::info("Respuesta de Gemini:", ['response' => $responseText]);

                $start = strpos($responseText, '[');
                $end = strrpos($responseText, ']');

                if ($start !== false && $end !== false && $end > $start) {
                    $jsonString = substr($responseText, $start, ($end - $start) + 1);
                    
                    \Log::info("JSON extraído:", ['json' => $jsonString]);
                    $decodedResponse = json_decode($jsonString, true);
                } else {
                    \Log::warning("No se pudo extraer un JSON válido de la respuesta.");
                    $decodedResponse = null;
                }
                if (is_array($decodedResponse)) {
                    foreach ($decodedResponse as $item) {
                        if (isset($item['alumno_id']) && isset($item['calificacion'])) {
                            $scores[$item['alumno_id']] = (float) $item['calificacion'];
                        }
                    }
                } else {
                    \Log::info("la respuesta de Gemini no ha sido en el formato JSON esperado: " . $responseText);
                    foreach ($batch as $alumno) {
                        $scores[$alumno['alumno_id']] = null;
                    }
                }
            } catch (\Exception $e) {
                \Log::info("Error al llamar a la API de Gemini: " . $e->getMessage());
                foreach ($batch as $alumno) {
                    $scores[$alumno['alumno_id']] = null;
                }
            }
        }
        return $scores;
    }

    protected function formatPromptBase(array $oferta): string{
        $ofertaTexto = "**Información de la Oferta:**\n";
        foreach ($oferta as $clave => $valor) {
            $ofertaTexto .= ucfirst(str_replace('_', ' ', $clave)) . ": " . ($valor ?? 'N/A') . ".\n";
        }
        return "Analiza la siguiente información de una oferta de empleo:\n\n" . $ofertaTexto;
    }
}