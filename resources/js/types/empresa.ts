export interface EmpresaType {
    empresa_id?: number;
    nombre: string;
    cif_nif: string;
    sector_actividad: string;
    descripcion?: string | null;
    ubicacion?: string | null;
    sitio_web?: string | null;
    num_empleados?: number | null;
    contacto_nombre?: string | null;
    contacto_email?: string | null;
    contacto_telefono?: string | null;
    practicas_remuneradas?: boolean;
    areas_practicas?: string | null;
    created_at?: string;
    updated_at?: string;
    foto_perfil_path?: string;
}