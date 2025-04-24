import RegistrosTable from "@/components/home/registrosTable";

export default function ModRegistrosPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold">Registros Generales</h1>
      <p className="mt-4 text-gray-600">Registros generales de desarrollo de aprendisaje</p>
      <div className="mt-6">
        <RegistrosTable />
      </div>
    </div>
  );
}
