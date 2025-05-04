<?php

namespace App\Services;
use GeminiAPI\Client;
use GeminiAPI\Resources\ModelName;
use GeminiAPI\Resources\Parts\TextPart;

class GeminiAIService{
    protected $client;

    public function __construct(){
        $apiKey = env('GEMINI_API_KEY');
        if (!$apiKey) {
            throw new \Exception('Error en la apiKey');
        }
        $this->client = new Client($apiKey);
    }

    public function getCompatibilityScores(array $oferta, array $alumnos): array{
        $scores = [];
        $promptBase = $this->formatPromptBase($oferta);

        foreach (array_chunk($alumnos, 3) as $batch) {
            $prompt = $promptBase . "\n\n**Perfiles de Alumnos:**\n";
            foreach ($batch as $alumno) {
                $prompt .= "**Alumno (ID: " . $alumno['alumno_id'] . "):\n";
                foreach ($alumno as $clave => $valor) {
                    $prompt .= ucfirst(str_replace('_', ' ', $clave)) . ": " . ($valor ?? 'N/A') . ".\n";
                }
                $prompt .= "\n";
            }
            $prompt .= "\nDetermina el grado de compatibilidad (1-10) para cada alumno con respecto a la oferta dada anteriormente. Devuelve una respuesta QUE SEA ÚNICAMENTE un JSON con la siguiente estructura:\n\n[\n  {\"alumno_id\": ID_DEL_ALUMNO_1, \"calificacion\": CALIFICACION_1},\n  {\"alumno_id\": ID_DEL_ALUMNO_2, \"calificacion\": CALIFICACION_2},\n  {\"alumno_id\": ID_DEL_ALUMNO_3, \"calificacion\": CALIFICACION_3}\n]";

            try {
                $response = $this->client->generativeModel(ModelName::GEMINI_PRO)->generateContent(new TextPart($prompt));
                $responseText = $response->text();

                $decodedResponse = json_decode($responseText, true);
                if (is_array($decodedResponse)) {
                    foreach ($decodedResponse as $item) {
                        if (isset($item['alumno_id']) && isset($item['calificacion'])) {
                            $scores[$item['alumno_id']] = (float) $item['calificacion'];
                        }
                    }
                } else {
                    error_log("la respuesta de Gemini no ha sido en el formato JSON esperado: " . $responseText);
                    foreach ($batch as $alumno) {
                        $scores[$alumno['alumno_id']] = null;
                    }
                }
            } catch (\Exception $e) {
                error_log("Error al llamar a la API de Gemini: " . $e->getMessage());
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