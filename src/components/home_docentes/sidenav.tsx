"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useSession, signOut } from "next-auth/react";
import { Settings, House, LogOut, Plus, Book, ClockFading } from "lucide-react";

declare module "next-auth" {
  interface Session {
    user: {
      name?: string | null;
      email?: string | null;
      image?: string | null;
      role?: string | null;
    };
  }
}

export default function SideNav() {
  const { data: session, status } = useSession();
  const [showMaterias, setShowMaterias] = useState(false);

  if (status === "loading") return <p>Cargando...</p>;
  if (!session) return <p>No has iniciado sesión.</p>;

  const handleSignOut = async () => {
    await signOut({ callbackUrl: "/" });
  };

  return (
    <nav className="flex flex-col h-full text-white">
      <aside
        id="default-sidebar"
        className="fixed top-0 left-0 z-40 w-64 h-screen bg-red-500 transition-transform -translate-x-full sm:translate-x-0 rounded-xl shadow-2xl"
        aria-label="Sidebar"
      >
        <div className="h-full px-3 py-4 overflow-y-auto rounded-xl">
          {/* LOGO y Título */}
          <div className="flex items-center gap-3 mb-6 px-3 py-2">
            <div className="w-12 h-12 bg-white rounded-full p-1 flex items-center justify-center">
              <Image
                src="/img/LogoSalesianos.png"
                width={40}
                height={40}
                alt="Logo Salesianos Cartagena"
                className="object-contain bg-[#fdf6e3] rounded-full shadow-lg"
              />
            </div>
            <h1 className="text-white text-lg text-center font-bold mt-1 ml-2 leading-tight">
              Desarrollo de <br /> aprendizaje
            </h1>
          </div>

          <hr className="my-4 border-red-900" />

          {/* Menú de navegación */}
          <ul className="space-y-2 font-medium">
          <li>
              <a
                href="/home_docentes/"
                className="flex items-center p-2 text-white rounded-lg hover:bg-red-100 hover:text-red-900 group"
              >
                <House className="w-5 h-5 text-yellow-50 group-hover:text-gray-900" />
                <span className="ml-3">Inicio</span>
              </a>
            </li>

            <li>
              <a
                href="/home_docentes/nuevoRegistro"
                className="flex items-center p-2 text-white rounded-lg hover:bg-red-100 hover:text-red-900 group"
              >
                <Plus className="w-5 h-5 text-yellow-50 group-hover:text-gray-900" />
                <span className="ml-3">Nuevo Registro</span>
              </a>
            </li>

            <li>
              <button
                onClick={() => setShowMaterias(!showMaterias)}
                className="flex items-center w-full p-2 text-white rounded-lg hover:bg-red-100 hover:text-red-900 group"
              >
                <Book className="w-5 h-5 text-yellow-50 group-hover:text-gray-900" />
                <span className="ml-3">Materias</span>
              </button>
              {showMaterias && (
                <ul className="mt-2 space-y-2 pl-6">
                  {["Materia 1", "Materia 2", "Materia 3"].map((m, i) => (
                    <li key={i}>
                      <a
                        href={`/home/materia${i + 1}`}
                        className="flex items-center p-2 text-white rounded-lg hover:bg-red-100 hover:text-red-900"
                      >
                        <Book />
                        <span className="ml-3">{m}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </li>

            {["Primer", "Segundo", "Tercer", "Cuarto"].map((periodo, i) => (
              <li key={i}>
                <a
                  href={`/home_docentes/${periodo}Periodo`}
                  className={`flex items-center p-2 rounded-lg text-white hover:bg-red-100 hover:text-red-900 group`}
                >
                  <ClockFading className="w-5 h-5 text-yellow-50 group-hover:text-gray-900" />
                  <span className="ml-3">{`${periodo} Periodo`}</span>
                </a>
              </li>
            ))}

            <li>
              <a
                href="/home_docentes/configuracion"
                className="flex items-center p-2 text-white rounded-lg hover:bg-red-100 hover:text-red-900 group"
              >
                <Settings className="w-5 h-5 text-yellow-50 group-hover:text-gray-900" />
                <span className="ml-3">Configuración</span>
              </a>
            </li>
          </ul>

          {/* Botón de cerrar sesión */}
          <div className="flex justify-center mt-10">
            <button
              onClick={handleSignOut}
              className="flex items-center px-4 py-2 text-white bg-red-900 rounded-lg hover:bg-red-700"
            >
              <LogOut className="w-5 h-5 text-white" />
              <span className="ml-2 p-0.5 font-bold">Cerrar Sesión</span>
            </button>
          </div>
        </div>
      </aside>
    </nav>
  );
}
