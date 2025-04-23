// src/app/api/usuarios/route.ts
import { NextResponse, NextRequest } from "next/server";
import { db } from "@/db/index";
import { grado } from "src/db/schema";

export async function GET() {
  try {
    const data = await db.select().from(grado);
    return NextResponse.json(data);
  } catch {
    return NextResponse.json({ error: "Error al obtener los grados" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const { nombre } = await req.json();
    if (!nombre) {
      return NextResponse.json({ error: "El campo 'nombre' es requerido" }, { status: 400 });
    }

    await db.insert(grado).values({ nombre });

    return NextResponse.json({ message: "Grado creado con éxito" });
  } catch {
    return NextResponse.json({ error: "Error al crear el grado" }, { status: 500 });
  }
}
