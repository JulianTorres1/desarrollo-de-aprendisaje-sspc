// src/app/api/usuario-grados/route.ts
import { NextResponse } from "next/server";
import { db } from "@/db";
import { usuarioGrados } from "@/db/schema";

export async function POST(req: Request) {
  const { id_usuario, id_grado } = await req.json();

  try {
    await db.insert(usuarioGrados).values({
      id_usuario,
      id_grado,
    });

    return NextResponse.json({ message: "Grado asignado exitosamente" });
  } catch (error) {
    console.error("Error asignando grado:", error);
    return NextResponse.json({ error: "Error asignando grado" }, { status: 500 });
  }
}
