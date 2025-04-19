import React, { useEffect } from 'react';
import { useForm } from '@inertiajs/react';
import BuscadorPalabraClave from './BuscadorPalabraClave';
import SelectorSector from './selectorSector';
import SelectorModalidad from './SelectorModalidad';

interface Props {
    sectoresFP: string[];
    modalidades: string[];
}

export default function FiltroOfertas({ sectoresFP, modalidades }: Props) {
    const { data, get } = useForm({
        palabra_clave: '',
        sector: '',
        modalidad: '',
    });

    useEffect(() => {
        get(route('alumno.dashboard'), {
            ...data,
            preserveState: true,
            replace: true,
        });
    }, [data, get]);

    return (
        <div className="mb-4">
            <div className="flex flex-col space-y-2 sm:space-y-0 sm:flex-row sm:space-x-2 items-center">
                <BuscadorPalabraClave />
                <SelectorSector sectoresFP={sectoresFP} />
                <SelectorModalidad modalidades={modalidades} />
            </div>
        </div>
    );
}