import { db } from "@/db";
import { usuarios } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

export async function GET(_req: Request, { params }: { params: { id_usuario: string } }) {
  const id = Number(params.id_usuario);

  try {
    const Usuario = await db
      .select({
        usuarios: usuarios.id_usuario,
        nombre: usuarios.nombre,
        correo: usuarios.correo,
        password: usuarios.password,
        rol: usuarios.rol,
        fecha_registro: usuarios.fecha_registro,
        updated_at: usuarios.updated_at,
      })

      .from(usuarios)
      .where(eq(usuarios.id_usuario, id));

    if (Usuario.length === 0) {
      return NextResponse.json({ error: "Usuario no encontrado" }, { status: 404 });
    }

    return NextResponse.json(Usuario);
  } catch {
    return NextResponse.json({ error: "Error al obtener el Usuario" }, { status: 500 });
  }
}

export async function PUT(req: Request, context: { params: { id_usuario: string } }) {
  const { params } = context; // Extrae params desde context
  const id = Number(params.id_usuario);
  const body = await req.json();

  try {
    if (body.password) {
      body.password = await bcrypt.hash(body.password, 10);
    }

    await db
      .update(usuarios)
      .set({
        nombre: body.nombre,
        correo: body.correo,
        password: body.password,
        rol: body.rol,
      })
      .where(eq(usuarios.id_usuario, id))
      .execute();

    return NextResponse.json({ message: "Usuario Actualizado 👌 " });
  } catch (error) {
    return NextResponse.json(
      {
        error:
          "Error al actualizar el usuario: " +
          (error instanceof Error ? error.message : "Unknown error"),
      },
      { status: 500 }
    );
  }
}

// export async function DELETE(req: Request, { params }: { params: { id_usuario: string } }) {
//   const id = Number(params.id_usuario);
//   const body = await req.json();

//   try {
//     await db.delete(usuarioGrados).where(eq(usuarioGrados.id_grado, body.id_grado)).execute();

//     return NextResponse.json({ message: "Grado eliminado" });
//   } catch {
//     return NextResponse.json({ error: "Error al eliminar el grado" }, { status: 500 });
//   }
// }
