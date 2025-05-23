import React, { useEffect } from 'react';
import { useForm } from '@inertiajs/react';
import BuscadorPalabraClave from './BuscadorPalabraClave';
import SelectorSector from './selectorSector';

interface Props {
    sectores: string[],
    initialSector?: string;
}

interface InertiaGetProps {
    preserveState?: boolean;
    replace?: boolean;
    [key: string]: string | number | boolean | null | undefined; 
}

export default function FiltroSectores({ sectores }: Props) {
    const { data, setData, get } = useForm({
        palabra_clave: '',
        sector: '',
    });

    useEffect(() => {
        get(route("alumno.dashboard"), {
            ...data,
            preserveState: true,
            replace: true,
        } as InertiaGetProps);
    }, [data, get]);

    return (
        <div className="mb-4">
            <div className="flex flex-col space-y-2 sm:space-y-0 sm:flex-row sm:space-x-2 items-center">
                <BuscadorPalabraClave setData={setData} initialValue={data.palabra_clave} />
                <SelectorSector sectoresFP={sectores} setData={setData} initialValue={data.sector} />
            </div>
        </div>
    );
}

export { FiltroSectores };