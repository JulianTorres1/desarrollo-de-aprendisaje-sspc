// app/not-found.tsx
export default function NotFound() {
  return (
    <div className="h-screen flex flex-col justify-center items-center">
      <h1 className="text-4xl font-bold">404 - Página no encontrada</h1>
      <p className="text-gray-500 mt-2">La página que buscas no existe.</p>
    </div>
  );
}
