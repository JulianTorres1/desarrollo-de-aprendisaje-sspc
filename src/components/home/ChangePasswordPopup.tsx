import { X } from "lucide-react";

interface ChangePasswordPopupProps {
  onClose: () => void;
}

export default function ChangePasswordPopup({ onClose }: ChangePasswordPopupProps) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-10">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96 relative flex flex-col">
        <button onClick={onClose} className="absolute top-2 right-2 text-gray-500 hover:text-gray-700">
          <X className="w-5 h-5" />
        </button>
        <h2 className="text-xl font-bold mb-4">Cambiar Contraseña</h2>
        <input type="password" placeholder="Nueva contraseña" className="w-full p-2 border rounded mb-3" />
        <input type="password" placeholder="Confirmar contraseña" className="w-full p-2 border rounded mb-3" />
        <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition">Actualizar</button>
      </div>
    </div>
  );
}