export interface AlumnoType {
    alumno_id: number;
    cv_path: File | null;
    foto_perfil_path: File | null;
    intereses: string;
    descripcion: string;
    formacion: string;
    experiencia_laboral: string;
    habilidades_tecnicas: string;
    habilidades_blandas: string;
    practicas_interes: string;
    sectores_interes: string;
    disponibilidad: string;
    modalidad_practicas: string;
    expectativas_aprendizaje: string;
    idiomas: string;
    portafolio: string;
    certificaciones: string;
    premios: string;
    referencias: string;
    nombre: string;
    apellidos: string;
    fecha_nacimiento: string;
    localidad: string;
    telefono: string;
    email: string;
}