import React from "react";
import AsignaturaExpanded from "../../components/home/asignaturaExpanded";

interface AsignaturaCardProps {
  id_asignatura: number;
  nombre: string;
  descripcion: string;
  profesor: string;
}

export const AsignaturaCard: React.FC<AsignaturaCardProps> = ({
  id_asignatura,
  nombre,
  descripcion,
  profesor,
}) => {
  const [selectedAsignaturaId, setSelectedAsignaturaId] = React.useState<number | null>(null);

  const handleOpenPopup = (id: number) => {
    setSelectedAsignaturaId(id);
  };

  const handleClosePopup = () => {
    setSelectedAsignaturaId(null);
  };

  return (
    <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition duration-300">
      <h2 className="text-2xl font-bold text-blue-700 mb-2">{nombre}</h2>
      <p className="text-gray-600 mb-4">{descripcion}</p>
      <div className="text-sm text-gray-500">
        Profesor: <span className="font-semibold">{profesor}</span>
      </div>
      <button
        onClick={() => handleOpenPopup(id_asignatura)}
        type="button"
        className="mt-5 text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
      >
        Editar
      </button>
      {selectedAsignaturaId === id_asignatura && (
        <AsignaturaExpanded
          id_asignatura={id_asignatura.toString()}
          nombre={nombre}
          descripcion={descripcion}
          onClose={handleClosePopup}
        />
      )}
    </div>
  );
};
