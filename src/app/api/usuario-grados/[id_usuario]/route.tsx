import { db } from "@/db";
import { usuarioGrados, grado } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET(
  _req: Request,
  { params }: { params: { id_usuario: string } }
) {
  const id = Number(params.id_usuario);

  try {
    const grados = await db
      .select({
        id_grado: grado.id_grado,
        nombre: grado.nombre,
      })
      .from(usuarioGrados)
      .innerJoin(grado, eq(usuarioGrados.id_grado, grado.id_grado))
      .where(eq(usuarioGrados.id_usuario, id));

    return NextResponse.json(grados);
  } catch {
    return NextResponse.json({ error: "Error al obtener los grados" }, { status: 500 });
  }
}
