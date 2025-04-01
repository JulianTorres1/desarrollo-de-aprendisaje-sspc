
import { getServerSession } from "next-auth";
import { authOptions } from "src/app/api/auth/[...nextauth]/route";
import React from 'react';

// componente de la página de inicio
import UsersTable from "@/components/home/usersTable";

export default async function Home() {

    const session = await getServerSession(authOptions);

    if (!session) {
        return <p>Acceso denegado</p>;
    }

    return (
        <div>
            <UsersTable />
        </div>
        );
    }