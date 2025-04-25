import { X } from "lucide-react";
import { useState } from "react";

interface ChangePasswordPopupProps {
  onClose: () => void;
  idUsuario: string; // ID del usuario que se actualizará
}

export default function ChangePasswordPopup({ onClose, idUsuario }: ChangePasswordPopupProps) {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleUpdatePassword = async () => {
    if (newPassword !== confirmPassword) {
      setError("Las contraseñas no coinciden");
      return;
    }

    try {
      const response = await fetch(`http://localhost:3000/api/usuarios/${idUsuario}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password: newPassword }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.error || "Error al actualizar la contraseña");
        return;
      }

      // Si la actualización es exitosa, muestra un alert y cierra el popup
      alert("Contraseña actualizada correctamente");
      onClose();
    } catch {
      setError("Error al conectar con el servidor");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-opacity-10">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96 relative flex flex-col">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
        >
          <X className="w-5 h-5" />
        </button>
        <h2 className="text-xl font-bold mb-4">Cambiar Contraseña</h2>
        {error && <p className="text-red-500 text-sm mb-3">{error}</p>}
        <input
          type="password"
          placeholder="Nueva contraseña"
          className="w-full p-2 border rounded mb-3"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <input
          type="password"
          placeholder="Confirmar contraseña"
          className="w-full p-2 border rounded mb-3"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <button
          onClick={handleUpdatePassword}
          className="w-full bg-red-500 text-white py-2 rounded hover:bg-red-800 transition"
        >
          Actualizar
        </button>
      </div>
    </div>
  );
}
