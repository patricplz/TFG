// filtrobusquedaOfertas.tsx

import React, { useEffect } from 'react';
import { useForm } from '@inertiajs/react';
import BuscadorPalabraClave from './BuscadorPalabraClave';
import SelectorModalidad from './SelectorModalidad';

//props que recibe el componente
interface Props {
    modalidades: string[];
    sector: string;
}

// Interface para definir los parámetros que acepta el método 'get' de Inertia

interface InertiaGetProps {
    preserveState?: boolean;
    replace?: boolean;
    [key: string]: string | number | boolean | null | undefined;
}

// Componente principal que muestra los filtros (palabra clave + modalidad)
export default function FiltroOfertas({ modalidades, sector }: Props) {

    //Hook de Inertia para acceder al formulario

    const { data, setData, get } = useForm({
        palabra_clave: '',
        modalidad: '',
        sector: sector || '',
    });


    //useEffect  para realizar la petición al backend cada que cambian los filtros

    useEffect(() => {
        get(route("alumno.dashboard.sector", { sector: data.sector }), { 
            palabra_clave: data.palabra_clave,
            modalidad: data.modalidad,
            preserveState: true,
            replace: true,
        } as InertiaGetProps);
    }, [data, get]);

    return (
        <div className="mb-4">
            <div className="flex flex-col space-y-2 sm:space-y-0 sm:flex-row sm:space-x-2 items-center">
                <BuscadorPalabraClave setData={setData} initialValue={data.palabra_clave} />
                <SelectorModalidad modalidades={modalidades} setData={setData} initialValue={data.modalidad} />
            </div>
        </div>
    );
}