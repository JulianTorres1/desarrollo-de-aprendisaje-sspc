'use client'

import React from "react";
import Image from 'next/image';
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";
import { Users, Edit, BookOpen, Home, Shield, BarChart, Settings, LogOut } from "lucide-react";

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

    // Se obtiene la sesión del usuario
    // Se utiliza el hook useSession de next-auth para obtener la sesión actual
    // El hook devuelve un objeto con la información de la sesión y el estado de carga
    // El estado puede ser "loading", "authenticated" o "unauthenticated"
    // El estado de carga se utiliza para mostrar un mensaje de carga mientras se obtiene la sesión
    // Si la sesión no está disponible, se muestra un mensaje de error
    // Si la sesión está disponible, se muestra el contenido del componente
    const { data: session, status } = useSession();

    if (status === "loading") {
      return <p>Cargando...</p>;
    }
  
    if (!session) {
      return <p>No has iniciado sesión.</p>;
    }

    const handleSignOut = async () => {
        await signOut({ callbackUrl: "/" });  // Redirige al login después de cerrar sesión
      };

    return (
        <nav className="flex flex-col h-full text-white">
            <aside id="default-sidebar" className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0 rounded-xl shadow-2xl" aria-label="Sidebar">
            <div className="h-full px-3 py-4 overflow-y-auto bg-red-50 dark:bg-red-900 rounded-xl">

                <div className="flex items-center pl-2.5 mb-[5%] m-1.5 rounded-lg p-2.5">
                    <Image 
                        className="w-[25%] h-[25%]" 
                        src={"/img/LogoSalesianos.png"} 
                        width={200}
                        height={200}
                        alt="Logo Salesianos Cartagena"
                    />
                    <h1 className="text-red-950 dark:text-white font-extrabold m-4 text-2xl">Acumulativa</h1>
                </div>

                <div className="flex justify-center mt-4">
                    <button onClick={handleSignOut} className="flex items-center px-4 py-2 text-white bg-red-900 rounded-lg hover:bg-red-700">
                        <LogOut className="w-5 h-5 text-white" /> {/* Ícono de cerrar sesión */}
                        <span className="sr-only">Cerrar Sesión</span> {/* Texto accesible solo para lectores de pantalla */}
                    </button>
                </div>
                <hr className="my-4 border-red-900 dark:border-white" />
                

                <ul className="space-y-2 font-medium">
                <li>
                        <a href="/home" className="flex items-center p-2 text-red-900 rounded-lg dark:text-white hover:bg-red-100 dark:hover:bg-red-800 group">
                            <Home className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                            <span className="ms-3">Dashboard</span>
                        </a>
                    </li>
                    <li>
                        <a href="/home/usuarios" className="flex items-center p-2 text-red-900 rounded-lg dark:text-white hover:bg-red-100 dark:hover:bg-red-800 group">
                            <Users className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                            <span className="ms-3">Usuarios</span>
                        </a>
                    </li>
                    <li>
                        <a href="/home/ModRegistros" className="flex items-center p-2 text-red-900 rounded-lg dark:text-white hover:bg-red-100 dark:hover:bg-red-800 group">
                            <Edit className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                            <span className="flex-1 ms-3 whitespace-nowrap">Modificar Registros</span>
                        </a>
                    </li>
                    <li>
                        <a href="/home/asignacionCursos" className="flex items-center p-2 text-red-900 rounded-lg dark:text-white hover:bg-red-100 dark:hover:bg-red-800 group">
                            <BookOpen className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                            <span className="flex-1 ms-3 whitespace-nowrap">Asignasiones De Cursos</span>
                        </a>
                    </li>
                    <li>
                        <a href="backup" className="flex items-center p-2 text-red-900 rounded-lg dark:text-white hover:bg-red-100 dark:hover:bg-red-800 group">
                            <Shield className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                            <span className="flex-1 ms-3 whitespace-nowrap">Copias De seguridad</span>
                        </a>
                    </li>
                    <li>
                        <a href="/home/datosAnuales" className="flex items-center p-2 text-red-900 rounded-lg dark:text-white hover:bg-red-100 dark:hover:bg-red-800 group">
                            <BarChart className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                            <span className="flex-1 ms-3 whitespace-nowrap">Datos Anuales</span>
                        </a>
                    </li>
                    <li>
                        <a href="/home/config" className="flex items-center p-2 text-red-900 rounded-lg dark:text-white hover:bg-red-100 dark:hover:bg-red-800 group">
                            <Settings className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                            <span className="flex-1 ms-3 whitespace-nowrap">Configuracion</span>
                        </a>
                    </li>
                </ul>
            </div>
            </aside>
        </nav>

    );
}