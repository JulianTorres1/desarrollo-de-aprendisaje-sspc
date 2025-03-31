import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";
import { usuarios } from "../../../db/schema";

const pool = mysql.createPool(process.env.DATABASE_URL!);
const db = drizzle(pool);

// Exportamos el método POST como función separada
export async function POST(req: Request) {
  try {
    const { nombre, correo, password, rol = "docente" } = await req.json();

    if (!nombre || !correo || !password) {
      return NextResponse.json({ message: "Faltan campos requeridos" }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await db.insert(usuarios).values({
      nombre,
      correo,
      password: hashedPassword,
      rol,
    });

    return NextResponse.json({ message: "Usuario creado exitosamente" }, { status: 201 });
  } catch {
    return NextResponse.json({ message: "Error al crear el usuario" }, { status: 500 });
  }
}
