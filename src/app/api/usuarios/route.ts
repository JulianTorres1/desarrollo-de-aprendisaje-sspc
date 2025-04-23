
// src/app/api/usuarios/route.ts
import { NextResponse } from "next/server";
import { db } from "@/db/index";
import { usuarios } from "src/db/schema";

export async function GET() {
  try {
    const data = await db.select().from(usuarios);
    return NextResponse.json(data);
  } catch {
    return NextResponse.json({ error: "Error al obtener usuarios" }, { status: 500 });
  }
}