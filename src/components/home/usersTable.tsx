"use client";

import { Lock } from "lucide-react";
import { useEffect, useState } from "react";
import ChangePasswordPopup from "./ChangePasswordPopup";

// Define la estructura de un usuario
interface Usuario {
  id_usuario: number;
  nombre: string;
  correo: string;
  rol: string;
  fechaRegistro: string;
}

export default function UsersTable() {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]); // Especifica el tipo del estado

  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handleOpenPopup = () => {
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  useEffect(() => {
    async function fetchUsuarios() {
      try {
        const res = await fetch("/api/usuarios");
        if (!res.ok) throw new Error("Error al obtener usuarios");
        const data: Usuario[] = await res.json(); // Asegúrate de que los datos coincidan con el tipo
        setUsuarios(data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchUsuarios();
  }, []);

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200 bg-white shadow-md rounded-lg">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              ID
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Nombre
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Correo
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Rol
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Fecha Registro
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Acciones
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {usuarios.map((usuario) => (
            <tr key={usuario.id_usuario} className="hover:bg-gray-100">
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {usuario.id_usuario}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {usuario.nombre}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {usuario.correo}
              </td>
              <td
                className={`px-6 py-4 whitespace-nowrap text-sm font-semibold capitalize ${
                  usuario.rol === "admin" ? "text-red-500" : "text-blue-500"
                }`}
              >
                {usuario.rol}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {new Date(usuario.fechaRegistro).toLocaleDateString()}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                <button
                  onClick={handleOpenPopup}
                  className="flex items-center text-gray-500 rounded-lg hover:bg-gray-100 hover:text-gray-900"
                >
                  <Lock className="w-5 h-5" />
                </button>
                {isPopupOpen && <ChangePasswordPopup onClose={handleClosePopup} />}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
