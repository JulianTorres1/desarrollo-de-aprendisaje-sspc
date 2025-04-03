import UsersTable from "@/components/home/usersTable";

export default function UsuariosPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold">Usuarios</h1>
      <p className="mt-4 text-gray-600">Aquí puedes gestionar los usuarios de la plataforma.</p>
      <div className="mt-6">
        <UsersTable />
      </div>
    </div>
  );
}