import React from 'react';
import { type AlumnoType } from '@/types/alumno';
import { XMarkIcon, EnvelopeIcon, PhoneIcon } from '@heroicons/react/24/outline';

interface Props {
    alumno: AlumnoType;
    onClose: () => void;
}

const ContactoModal: React.FC<Props> = ({ alumno, onClose }) => {
    return (
        <div className="fixed inset-0 bg-gray-700/70 overflow-y-auto h-full w-full z-50">
            <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md  bg-gray-200">
                <div className="flex justify-end">
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                        <XMarkIcon className="h-6 w-6" />
                    </button>
                </div>
                <div className="mt-4 text-center">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">Información de Contacto</h3>
                    <div className="mt-2">
                        {alumno.email && (
                            <p className="flex items-center justify-center gap-2 text-gray-700"> {/* Añadido text-gray-700 */}
                                <EnvelopeIcon className="h-5 w-5 text-gray-500" />
                                {alumno.email}
                            </p>
                        )}
                        {!alumno.email && (
                            <p className="text-gray-500 italic">Email no disponible</p>
                        )}
                        {alumno.telefono && (
                            <p className="flex items-center justify-center gap-2 mt-2 text-gray-700"> {/* Añadido text-gray-700 */}
                                <PhoneIcon className="h-5 w-5 text-gray-500" />
                                {alumno.telefono}
                            </p>
                        )}
                        {!alumno.telefono && (
                            <p className="text-gray-500 italic mt-2">Teléfono no disponible</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactoModal;