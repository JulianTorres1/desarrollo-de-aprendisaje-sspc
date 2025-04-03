'use client';

import { SessionProvider } from "next-auth/react";
import SideNav from '../../components/home/sidenav';
import Navbar from '../../components/home/navbar';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <div className="flex min-h-screen bg-gray-100">
        {/* Sidebar fijo a la izquierda */}
        <aside className="w-64 flex-none bg-white shadow-md z-20 h-screen fixed">
          <SideNav />
        </aside>

        {/* Contenedor principal (Navbar + Contenido) */}
        <div className="flex flex-col flex-grow ml-64">
          {/* Navbar sticky */}
          <header className="w-full z-10 bg-white shadow-md" style={{ position: 'sticky', top: 0 }}>
            <Navbar />
          </header>

          {/* Contenido principal */}
          <main className="flex-grow p-6 overflow-y-auto">
            <div className="bg-white rounded-lg shadow-md p-6 h-full">
              {children}
            </div>
          </main>
        </div>
      </div>
    </SessionProvider>
  );
}