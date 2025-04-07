// src/app/unauthorized/page.tsx
export default function Unauthorized() {
    return (
      <div className="h-screen flex flex-col justify-center items-center text-center p-4">
        <h1 className="text-4xl font-bold text-yellow-600">403 - No autorizado</h1>
        <p className="text-gray-700 mt-2">No tienes permisos para acceder a esta sección.</p>
        <a href="/" className="mt-4 text-blue-500 hover:underline">
          Volver al inicio
        </a>
      </div>
    );
  }
  