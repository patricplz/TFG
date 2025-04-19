export interface OfertaType {
    id: number;
    name: string;
    description: string;
    image_path: string | null; // Permitir null para la imagen
    habilidades_blandas_requeridas: string | null;
    habilidades_tecnicas_requeridas: string | null;
    formacion_requerida: string | null;
    experiencia_laboral_requerida: string | null;
    disponibilidad_requerida: string | null;
    modalidad_practicas_requerida: string | null;
    idiomas_requeridos: string | null;
    sector_interes_requerido: string | null;
  }