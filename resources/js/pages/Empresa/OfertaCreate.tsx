import { useForm } from '@inertiajs/react';
import React from 'react';

const OfertaCreate = () => {
  const { data, setData, post, processing, errors } = useForm({
    name: '',
    description: '',
    image: null as File | null,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    post(route('empresa.oferta.store'), {
      forceFormData: true, // importante para subir imágenes
    });
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Crear oferta de prácticas</h1>
      <form onSubmit={handleSubmit} encType="multipart/form-data" className="space-y-4">
        <div>
          <label htmlFor="name" className="block font-medium">Nombre</label>
          <input
            type="text"
            id="name"
            className="w-full border p-2"
            value={data.name}
            onChange={(e) => setData('name', e.target.value)}
          />
          {errors.name && <div className="text-red-500">{errors.name}</div>}
        </div>

        <div>
          <label htmlFor="description" className="block font-medium">Descripción</label>
          <textarea
            id="description"
            className="w-full border p-2"
            value={data.description}
            onChange={(e) => setData('description', e.target.value)}
          />
          {errors.description && <div className="text-red-500">{errors.description}</div>}
        </div>

        <div>
          <label htmlFor="image" className="block font-medium">Imagen</label>
          <input
            type="file"
            id="image"
            onChange={(e) => setData('image', e.target.files?.[0] ?? null)}
          />
          {errors.image && <div className="text-red-500">{errors.image}</div>}
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
          disabled={processing}
        >
          Crear
        </button>
      </form>
    </div>
  );
};

export default OfertaCreate;
