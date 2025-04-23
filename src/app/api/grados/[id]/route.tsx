import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { grado } from "@/db/schema";
import { eq } from "drizzle-orm";

// Obtener un solo grado por id
export async function GET(_: NextRequest, { params }: { params: { id: string } }) {
  try {
    const data = await db.select().from(grado).where(eq(grado.id_grado, Number(params.id)));
    if (data.length === 0) {
      return NextResponse.json({ error: "Grado no encontrado" }, { status: 404 });
    }
    return NextResponse.json(data[0]);
  } catch {
    return NextResponse.json({ error: "Error al obtener el grado" }, { status: 500 });
  }
}

// Actualizar un grado por id
export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { nombre } = await req.json();
    if (!nombre) {
      return NextResponse.json({ error: "El campo 'nombre' es requerido" }, { status: 400 });
    }

    const result = await db
      .update(grado)
      .set({ nombre })
      .where(eq(grado.id_grado, Number(params.id)))
      .execute();

    return result.length
      ? NextResponse.json(result[0])
      : NextResponse.json({ error: "Grado no encontrado" }, { status: 404 });
  } catch {
    return NextResponse.json({ error: "Error al actualizar el grado" }, { status: 500 });
  }
}

// Eliminar un grado por id
export async function DELETE(_: NextRequest, { params }: { params: { id: string } }) {
  try {
    const result = await db
      .delete(grado)
      .where(eq(grado.id_grado, Number(params.id)))
      .execute();

    return result.length
      ? NextResponse.json({ message: "Grado eliminado", grado: result[0] })
      : NextResponse.json({ error: "Grado no encontrado" }, { status: 404 });
  } catch {
    return NextResponse.json({ error: "Error al eliminar el grado" }, { status: 500 });
  }
}
