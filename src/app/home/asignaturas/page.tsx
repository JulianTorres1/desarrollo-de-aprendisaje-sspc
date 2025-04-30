import { AsignaturaCard } from "../../../components/home/asignaturaCard";

interface Asignatura {
  id_asignatura: number;
  nombre: string;
  descripcion: string;
}

async function fetchAsignaturas(): Promise<Asignatura[]> {
  const response = await fetch("http://localhost:3000/api/asignaturas", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    throw new Error("Error al obtener las asignaturas");
  }
  const data = await response.json();
  return data.map((asignatura: Asignatura) => ({
    id_asignatura: asignatura.id_asignatura,
    nombre: asignatura.nombre,
    descripcion: asignatura.descripcion,
  }));
}

export default function Asignaturas() {
  return (
    <div className="flex flex-col items-center justify-start min-h-screen ">
      <h1 className="text-2xl font-bold">Asignaturas</h1>
      <p className="text-lg">Aquí puedes ver las asignaturas disponibles.</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4">
        {fetchAsignaturas().then((asignaturas) =>
          asignaturas.map((asignatura) => (
            <AsignaturaCard
              id_asignatura={asignatura.id_asignatura}
              key={asignatura.id_asignatura}
              nombre={asignatura.nombre}
              descripcion={asignatura.descripcion}
              profesor="Nombre del Profesor"
            />
          ))
        )}
      </div>
    </div>
  );
}
