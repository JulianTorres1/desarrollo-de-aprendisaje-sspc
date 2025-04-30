import { X } from "lucide-react";
import { useEffect, useState } from "react";

interface AsignaturasExpandedProps {
  id_asignatura: string;
  nombre: string;
  descripcion: string;
  onClose: () => void;
}

export default function AsignaturaExpanded({
  id_asignatura,
  nombre,
  descripcion,
  onClose,
}: AsignaturasExpandedProps) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-opacity-10">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96 relative flex flex-col">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
        >
          <X className="w-5 h-5" />
        </button>
        <h1>{id_asignatura}</h1>
        <h2 className="text-xl font-bold mb-4">{nombre}</h2>
        <p className="text-gray-600">{descripcion}</p>
      </div>
    </div>
  );
}
