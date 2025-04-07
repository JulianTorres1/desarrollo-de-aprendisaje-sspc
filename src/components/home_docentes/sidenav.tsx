"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";
import { Settings, LogOut, Plus, Book, ClockFading } from "lucide-react";

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
  const [showMaterias, setShowMaterias] = useState(false); // Estado para controlar la visibilidad de las materias

  if (status === "loading") {
    return <p>Cargando...</p>;
  }

  if (!session) {
    return <p>No has iniciado sesión.</p>;
  }

  const handleSignOut = async () => {
    await signOut({ callbackUrl: "/" }); // Redirige al login después de cerrar sesión
  };

  return (
    <nav className="flex flex-col h-full text-white">
      <aside
        id="default-sidebar"
        className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0 rounded-xl shadow-2xl"
        aria-label="Sidebar"
      >
        <div className="h-full px-3 py-4 overflow-y-auto bg-red-50 dark:bg-red-900 rounded-xl">
          <div className="flex items-center pl-2.5 mb-[5%] m-1.5 rounded-lg p-2.5">
            <Image
              className="w-[25%] h-[25%]"
              src={"/img/LogoSalesianos.png"}
              width={200}
              height={200}
              alt="Logo Salesianos Cartagena"
            />
            <h1 className="text-red-950 dark:text-white font-extrabold m-4 text-lg">
              Desarrollo de aprendizaje
            </h1>
          </div>

          <hr className="my-4 border-red-900 dark:border-white" />

          <ul className="space-y-2 font-medium">
            <li>
              <a
                href="/home"
                className="flex items-center p-2 text-red-900 rounded-lg dark:text-white hover:bg-red-100 dark:hover:bg-red-800 group"
              >
                <Plus className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />{" "}
                {/* Ícono para "Nuevo Registro" */}
                <span className="ms-3">Nuevo Registro</span>
              </a>
            </li>
            <li>
              <div>
                <button
                  onClick={() => setShowMaterias(!showMaterias)} // Alternar visibilidad al hacer clic
                  className="flex items-center p-2 text-red-900 rounded-lg dark:text-white hover:bg-red-100 dark:hover:bg-red-800 group"
                >
                  <Book className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                  <span className="ms-3">Materias</span>
                </button>
                {showMaterias && ( // Mostrar materias solo si showMaterias es true
                  <ul className="mt-2 space-y-2 pl-6">
                    <li>
                      <a
                        href="/home/materia1"
                        className="flex items-center p-2 text-red-900 rounded-lg dark:text-white hover:bg-red-100 dark:hover:bg-red-800 group"
                      >
                        <span className="ms-3">Materia 1</span>
                      </a>
                    </li>
                    <li>
                      <a
                        href="/home/materia2"
                        className="flex items-center p-2 text-red-900 rounded-lg dark:text-white hover:bg-red-100 dark:hover:bg-red-800 group"
                      >
                        <span className="ms-3">Materia 2</span>
                      </a>
                    </li>
                    <li>
                      <a
                        href="/home/materia3"
                        className="flex items-center p-2 text-red-900 rounded-lg dark:text-white hover:bg-red-100 dark:hover:bg-red-800 group"
                      >
                        <span className="ms-3">Materia 3</span>
                      </a>
                    </li>
                  </ul>
                )}
              </div>
            </li>
            <li>
              <a
                href="/home/ModRegistros"
                className="flex items-center p-2 text-red-900 rounded-lg dark:text-white hover:bg-red-100 dark:hover:bg-red-800 group"
              >
                <ClockFading className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />{" "}
                {/* Ícono para "Primer Periodo" */}
                <span className="flex-1 ms-3 whitespace-nowrap">Primer Periodo</span>
              </a>
            </li>
            <li>
              <a
                href="/home/asignacionCursos"
                className="flex items-center p-2 text-red-900 rounded-lg dark:text-white hover:bg-red-100 dark:hover:bg-red-800 group"
              >
                <ClockFading className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />{" "}
                {/* Ícono para "Segundo Periodo" */}
                <span className="flex-1 ms-3 whitespace-nowrap">Segundo Periodo</span>
              </a>
            </li>
            <li>
              <a
                href="backup"
                className="flex items-center p-2 text-red-900 rounded-lg dark:text-white hover:bg-red-100 dark:hover:bg-red-800 group"
              >
                <ClockFading className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />{" "}
                {/* Ícono para "Tercer Periodo" */}
                <span className="flex-1 ms-3 whitespace-nowrap">Tercer Periodo</span>
              </a>
            </li>
            <li>
              <a
                href="/home/datosAnuales"
                className="flex items-center p-2 text-red-900 rounded-lg dark:text-white hover:bg-red-100 dark:hover:bg-red-800 group"
              >
                <ClockFading className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />{" "}
                {/* Ícono para "Cuarto Periodo" */}
                <span className="flex-1 ms-3 whitespace-nowrap">Cuarto Periodo</span>
              </a>
            </li>
            <li>
              <a
                href="/home/config"
                className="flex items-center p-2 text-red-900 rounded-lg dark:text-white hover:bg-red-100 dark:hover:bg-red-800 group"
              >
                <Settings className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />{" "}
                {/* Ícono para "Configuración" */}
                <span className="flex-1 ms-3 whitespace-nowrap">Configuracion</span>
              </a>
            </li>
          </ul>
          <div className="flex justify-center mt-4">
            <button
              onClick={handleSignOut}
              className="flex items-center px-4 py-2 text-white bg-red-900 rounded-lg hover:bg-red-700"
            >
              <LogOut className="w-5 h-5 text-white" /> {/* Ícono de cerrar sesión */}
              <span className="sr-only">Cerrar Sesión</span>{" "}
              {/* Texto accesible solo para lectores de pantalla */}
            </button>
          </div>
        </div>
      </aside>
    </nav>
  );
}
