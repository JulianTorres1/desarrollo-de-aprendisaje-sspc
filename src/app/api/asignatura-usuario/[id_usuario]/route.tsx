import { db } from "@/db";
import { asignatura, asignaturaUsuarios } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET(_req: Request, { params }: { params: { id_usuario: string } }) {
  const id = Number(params.id_usuario);

  try {
    const grados = await db
      .select({
        id_grado: asignatura.id_asignatura,
        nombre: asignatura.nombre,
      })
      .from(asignaturaUsuarios)
      .innerJoin(asignatura, eq(asignaturaUsuarios.id_asignatura, asignatura.id_asignatura))
      .where(eq(asignaturaUsuarios.id_usuario, id));

    return NextResponse.json(grados);
  } catch {
    return NextResponse.json({ error: "Error al obtener los grados" }, { status: 500 });
  }
}
