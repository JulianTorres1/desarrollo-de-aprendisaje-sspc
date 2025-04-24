import { db } from "@/db";
import { asignatura, asignaturaUsuarios } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET(_req: Request, { params }: { params: { id_usuario: string } }) {
  const id = Number(params.id_usuario); // Cambiado a id_usuario

  if (isNaN(id)) {
    return NextResponse.json({ error: "El id_usuario debe ser un número válido" }, { status: 400 });
  }

  try {
    const asignaturas = await db
      .select({
        id_asignatura: asignatura.id_asignatura,
        nombre: asignatura.nombre,
      })
      .from(asignaturaUsuarios)
      .innerJoin(asignatura, eq(asignaturaUsuarios.id_asignatura, asignatura.id_asignatura))
      .where(eq(asignaturaUsuarios.id_usuario, id)); // Cambiado a id_usuario

    return NextResponse.json(asignaturas);
  } catch (error) {
    console.error("Error al obtener las asignaturas:", error);
    return NextResponse.json({ error: "Error al obtener las asignaturas" }, { status: 500 });
  }
}
