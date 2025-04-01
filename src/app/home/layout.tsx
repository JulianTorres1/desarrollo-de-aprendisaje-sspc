'use client';

import { SessionProvider } from "next-auth/react";
import SideNav from '../../components/home/sidenav';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <div className="flex min-h-screen flex-col md:flex-row md:overflow-hidden">
        <aside className="w-full flex-none md:w-64 md:min-h-screen">
          <SideNav />
        </aside>
        <main className="flex-grow p-6 md:overflow-y-auto md:p-12 bg-gray-50">
          {children}
        </main>
      </div>
    </SessionProvider>
  );
}
