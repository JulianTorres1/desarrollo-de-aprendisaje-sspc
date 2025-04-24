import { NextResponse } from "next/server";
import { db } from "@/db"; // Asegúrate de que este sea el archivo donde configuras tu conexión a la base de datos
import { registrosDeDesarrolloDeAprendizaje } from "@/db/schema";

export async function GET() {
  try {
    // Consulta para obtener todos los registros
    const registros = await db.select().from(registrosDeDesarrolloDeAprendizaje);

    return NextResponse.json({ registros });
  } catch (error) {
    console.error("Error al obtener los registros:", error);
    return NextResponse.json({ error: "Error al obtener los registros" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // Validación básica de los datos recibidos
    const {
      id_docente,
      id_asignatura,
      id_grado,
      semana,
      tema_general,
      subtema,
      evidencia,
      fase_exploracion,
      fase_conceptualizacion,
      fase_ejecucion,
      fase_transferencia,
      valoracion,
      observaciones,
      fecha_semana_inicio,
      fecha_semana_fin,
      grupo1_hp,
      grupo1_he,
      grupo2_hp,
      grupo2_he,
      grupo3_hp,
      grupo3_he,
      grupo4_hp,
      grupo4_he,
      exposiciones,
      lectura,
      desarrollo_ejercicios,
      descripcion_lamina,
      actividad_ludica,
      explicaciones,
      uso_aula_digital,
      otros_metodos,
    } = body;

    if (
      !id_docente ||
      !id_asignatura ||
      !id_grado ||
      !semana ||
      !tema_general ||
      !subtema ||
      !fecha_semana_inicio ||
      !fecha_semana_fin
    ) {
      return NextResponse.json({ error: "Faltan campos obligatorios" }, { status: 400 });
    }

    // Inserción en la base de datos
    const newRegistro = await db.insert(registrosDeDesarrolloDeAprendizaje).values({
      id_docente,
      id_asignatura,
      id_grado,
      semana,
      tema_general,
      subtema,
      evidencia,
      fase_exploracion,
      fase_conceptualizacion,
      fase_ejecucion,
      fase_transferencia,
      valoracion,
      observaciones,
      fecha_semana_inicio: new Date(fecha_semana_inicio),
      fecha_semana_fin: new Date(fecha_semana_fin),
      grupo1_hp: grupo1_hp || 0,
      grupo1_he: grupo1_he || 0,
      grupo2_hp: grupo2_hp || 0,
      grupo2_he: grupo2_he || 0,
      grupo3_hp: grupo3_hp || 0,
      grupo3_he: grupo3_he || 0,
      grupo4_hp: grupo4_hp || 0,
      grupo4_he: grupo4_he || 0,
      exposiciones: exposiciones || 0,
      lectura: lectura || 0,
      desarrollo_ejercicios: desarrollo_ejercicios || 0,
      descripcion_lamina: descripcion_lamina || 0,
      actividad_ludica: actividad_ludica || 0,
      explicaciones: explicaciones || 0,
      uso_aula_digital: uso_aula_digital || 0,
      otros_metodos: otros_metodos || "",
    });

    return NextResponse.json({ message: "Registro creado con éxito", newRegistro });
  } catch (error) {
    console.error("Error al crear el registro:", error);
    return NextResponse.json({ error: "Error al procesar la solicitud" }, { status: 500 });
  }
}
