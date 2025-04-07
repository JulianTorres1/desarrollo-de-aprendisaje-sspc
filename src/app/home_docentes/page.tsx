import { getServerSession } from "next-auth";
import { authOptions } from "src/app/api/auth/[...nextauth]/route";
import React from "react";

// componente de la página de inicio

export default async function Home() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return <p>Acceso denegado</p>;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold">Bienvenido(a) {session.user.name}</h1>
      <p className="mt-4 text-gray-600">Aquí puedes ver información general sobre la aplicación.</p>
      <div className="mt-6">
        <p>Nombre: </p>
        <p>Email: {session.user.email}</p>
        <p>Rol: {session.user.role}</p>
      </div>
      <div>
        <h1 className="text-2xl font-bold mt-4">Anuncio Inicial</h1>
        <hr className="my-4 border-red-900 dark:border-white" />
        <h2 className="text-xl font-bold mt-4">OBSERVACIONES:</h2>
        <br />
        Con el objetivo de diligenciar el formato digital en referencia agradecemos seguir las
        siguientes orientaciones. <br /> <br />
        • Realizar una descripción del estudiante en los aspectos académicos y disciplinarios por
        periodo. <br /> <br />
        • Tener en cuenta los términos utilizados siempre en el marco del respeto, la inclusión, y
        la pedagogía. <br /> <br />
        • Recuerde que la información que contiene este formato es de uso confidencial y de manejo
        interno, en algunas ocasiones la información será usada para emitir informes externos
        solicitados por los padres de familia, pero nunca se dará fiel copia siempre salvaguardando
        la información de carácter confidencial que ustedes como directores de grupo emiten de cada
        uno de sus estudiantes. <br />
      </div>
    </div>
  );
}
