import { NextResponse } from "next/server";
import { db } from "@/db/index";
import { asignatura } from "src/db/schema";

export async function GET() {
  try {
    const data = await db.select().from(asignatura);
    return NextResponse.json(data);
  } catch {
    return NextResponse.json({ error: "Error al obtener las asignaturas" }, { status: 500 });
  }
}
