import React from 'react';
import { type AlumnoType } from '@/types/alumno';

interface AlumnoCardProps {
  alumno: AlumnoType;
  onEstadoCambiado?: (alumnoId: number, nuevoEstado: 'seleccionado' | 'descartado') => void;
}

const AlumnoCard: React.FC<AlumnoCardProps> = ({ alumno, onEstadoCambiado }) => {
  const actualizarEstadoAlumno = (estado: 'seleccionado' | 'descartado') => {
    const url = `/alumnos/${alumno.alumno_id}/estado`;
    const data = { estado: estado };
    const csrfToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');

    if (!csrfToken) {
      console.error('Token CSRF no encontrado.');
      alert('Error: No se pudo actualizar el estado.');
      return;
    }

    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-TOKEN': csrfToken,
      },
      body: JSON.stringify(data),
    })
    .then(response => response.json())
    .then(data => {
      if (data.message) {
        alert(data.message);
        if (onEstadoCambiado) {
          onEstadoCambiado(alumno.alumno_id, estado);
        }
      } else if (data.error) {
        alert(`Error: ${data.error}`);
      }
    })
    .catch(error => {
      console.error('Error al actualizar el estado:', error);
      alert('Ocurrió un error al actualizar el estado.');
    });
  };

  const handleSeleccionar = () => {
    actualizarEstadoAlumno('seleccionado');
  };

  const handleRechazar = () => {
    actualizarEstadoAlumno('descartado');
  };

  return (
    <div className="bg-gradient-to-r from-gray-900 to-blue-900 text-white p-6 m-4 rounded-lg flex md:flex-row items-start justify-between">
      {/* ... el resto del código JSX del componente ... */}
      <div className="flex flex-col items-end gap-2 mt-4 md:mt-0">
        <button className="bg-green-500 cursor-pointer hover:bg-green-600 text-white font-bold py-2 px-4 rounded-md shadow-md transition duration-200 transform hover:scale-105">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 inline-block" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
          Contactar
        </button>
        <button onClick={handleSeleccionar} className="bg-blue-500 cursor-pointer hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md shadow-md transition duration-200 transform hover:scale-105">
          Seleccionar
        </button>
        <button onClick={handleRechazar} className="bg-red-500 cursor-pointer hover:bg-red-600 text-white font-bold py-2 px-4 rounded-md shadow-md transition duration-200 transform hover:scale-105">
          Rechazar
        </button>
      </div>
    </div>
  );
};

export default AlumnoCard;