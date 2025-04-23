// src/app/api/usuario-grados/route.ts
import { NextResponse } from "next/server";
import { db } from "@/db";
import { asignaturaUsuarios } from "@/db/schema";

export async function POST(req: Request) {
  const { id_usuario, id_asignatura } = await req.json();

  try {
    await db.insert(asignaturaUsuarios).values({
      id_asignatura,
      id_usuario,
    });

    return NextResponse.json({ message: "Asignatura asignada exitosamente" });
  } catch (error) {
    console.error("Error asignando asignatura:", error);
    return NextResponse.json({ error: "Error asignando asignatura" }, { status: 500 });
  }
}
