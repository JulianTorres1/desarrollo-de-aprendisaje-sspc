'use client'

import React from "react";
import Image from 'next/image';
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";

declare module "next-auth" {
    interface Session {
      user: {
        name?: string | null;
        email?: string | null;
        image?: string | null;
        role?: string | null; // Add the role property here
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

      function getInitials(name?: string | null): string {
        if (!name) return "";
      
        const words = name.trim().split(" ");
        const initials = words.slice(0, 2).map(word => word[0].toUpperCase()).join("");
      
        return initials;
      }

      const userInitials = getInitials(session.user?.name);

    return (
        <nav className="flex flex-col h-full bg-red-900 text-white">
            <aside id="default-sidebar" className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0 shadow-lg" aria-label="Sidebar">
            <div className="h-full px-3 py-4 overflow-y-auto bg-red-50 dark:bg-red-900">

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
                <div className="flex flex-col items-center mb-1.5 justify-center mb-5">
                    <div className="relative inline-flex items-center justify-center w-20 h-20 overflow-hidden shadow-2xl bg-gray-100 rounded-full dark:bg-gray-600">
                        <span className="font-bold text-4xl text-gray-600 dark:text-gray-300">{userInitials}</span>
                    </div>
                    <h2 className="text-red-900 dark:text-white font-bold text-xl">Bienvenido</h2>
                    <h2 className="text-red-900 dark:text-white font-bold text-xl">{session.user?.name} </h2>
                    <p className="text-red-900 dark:text-white font-semibold text-lg">Rol: {session.user?.role || "No especificado"}</p>
                </div>

                <div className="flex justify-center mt-4">
                    <button onClick={handleSignOut} className="px-4 py-2 text-white bg-red-900 rounded-lg hover:bg-red-700">
                        Cerrar Sesión
                    </button>
                </div>
                <hr className="my-4 border-red-900 dark:border-white" />
                

                <ul className="space-y-2 font-medium">
                    <li>
                        <a href="#" className="flex items-center p-2 text-red-900 rounded-lg dark:text-white hover:bg-red-100 dark:hover:bg-red-800 group">
                        <svg className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 21">
                            <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z"/>
                            <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z"/>
                        </svg>
                        <span className="ms-3">Nuevo Registro</span>
                        </a>
                    </li>
                    <li>
                        <a href="#" className="flex items-center p-2 text-red-900 rounded-lg dark:text-white hover:bg-red-100 dark:hover:bg-red-800 group">
                        <svg className="shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 18">
                            <path d="M6.143 0H1.857A1.857 1.857 0 0 0 0 1.857v4.286C0 7.169.831 8 1.857 8h4.286A1.857 1.857 0 0 0 8 6.143V1.857A1.857 1.857 0 0 0 6.143 0Zm10 0h-4.286A1.857 1.857 0 0 0 10 1.857v4.286C10 7.169 10.831 8 11.857 8h4.286A1.857 1.857 0 0 0 18 6.143V1.857A1.857 1.857 0 0 0 16.143 0Zm-10 10H1.857A1.857 1.857 0 0 0 0 11.857v4.286C0 17.169.831 18 1.857 18h4.286A1.857 1.857 0 0 0 8 16.143v-4.286A1.857 1.857 0 0 0 6.143 10Zm10 0h-4.286A1.857 1.857 0 0 0 10 11.857v4.286c0 1.026.831 1.857 1.857 1.857h4.286A1.857 1.857 0 0 0 18 16.143v-4.286A1.857 1.857 0 0 0 16.143 10Z"/>
                        </svg>
                        <span className="flex-1 ms-3 whitespace-nowrap">Materias</span>
                        </a>
                    </li>
                    <li>
                        <a href="#" className="flex items-center p-2 text-red-900 rounded-lg dark:text-white hover:bg-red-100 dark:hover:bg-red-800 group">
                        <svg className="shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                            <path d="m17.418 3.623-.018-.008a6.713 6.713 0 0 0-2.4-.569V2h1a1 1 0 1 0 0-2h-2a1 1 0 0 0-1 1v2H9.89A6.977 6.977 0 0 1 12 8v5h-2V8A5 5 0 1 0 0 8v6a1 1 0 0 0 1 1h8v4a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-4h6a1 1 0 0 0 1-1V8a5 5 0 0 0-2.582-4.377ZM6 12H4a1 1 0 0 1 0-2h2a1 1 0 0 1 0 2Z"/>
                        </svg>
                        <span className="flex-1 ms-3 whitespace-nowrap">Primer Periodo</span>
                        </a>
                    </li>
                    <li>
                        <a href="#" className="flex items-center p-2 text-red-900 rounded-lg dark:text-white hover:bg-red-100 dark:hover:bg-red-800 group">
                        <svg className="shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                            <path d="M14 2a3.963 3.963 0 0 0-1.4.267 6.439 6.439 0 0 1-1.331 6.638A4 4 0 1 0 14 2Zm1 9h-1.264A6.957 6.957 0 0 1 15 15v2a2.97 2.97 0 0 1-.184 1H19a1 1 0 0 0 1-1v-1a5.006 5.006 0 0 0-5-5ZM6.5 9a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9ZM8 10H5a5.006 5.006 0 0 0-5 5v2a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-2a5.006 5.006 0 0 0-5-5Z"/>
                        </svg>
                        <span className="flex-1 ms-3 whitespace-nowrap">Segundo Periodo</span>
                        </a>
                    </li>
                    <li>
                        <a href="#" className="flex items-center p-2 text-red-900 rounded-lg dark:text-white hover:bg-red-100 dark:hover:bg-red-800 group">
                        <svg className="shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                            <path d="M14 2a3.963 3.963 0 0 0-1.4.267 6.439 6.439 0 0 1-1.331 6.638A4 4 0 1 0 14 2Zm1 9h-1.264A6.957 6.957 0 0 1 15 15v2a2.97 2.97 0 0 1-.184 1H19a1 1 0 0 0 1-1v-1a5.006 5.006 0 0 0-5-5ZM6.5 9a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9ZM8 10H5a5.006 5.006 0 0 0-5 5v2a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-2a5.006 5.006 0 0 0-5-5Z"/>
                        </svg>
                        <span className="flex-1 ms-3 whitespace-nowrap">Tercer Periodo</span>
                        </a>
                    </li>
                    <li>
                        <a href="#" className="flex items-center p-2 text-red-900 rounded-lg dark:text-white hover:bg-red-100 dark:hover:bg-red-800 group">
                        <svg className="shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                            <path d="M14 2a3.963 3.963 0 0 0-1.4.267 6.439 6.439 0 0 1-1.331 6.638A4 4 0 1 0 14 2Zm1 9h-1.264A6.957 6.957 0 0 1 15 15v2a2.97 2.97 0 0 1-.184 1H19a1 1 0 0 0 1-1v-1a5.006 5.006 0 0 0-5-5ZM6.5 9a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9ZM8 10H5a5.006 5.006 0 0 0-5 5v2a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-2a5.006 5.006 0 0 0-5-5Z"/>
                        </svg>
                        <span className="flex-1 ms-3 whitespace-nowrap">Cuarto Periodo</span>
                        </a>
                    </li>
                    
                </ul>
            </div>
            </aside>

        </nav>
    );
}