import "dotenv/config";
import { drizzle } from "drizzle-orm/mysql2";
import { sql } from "drizzle-orm";
import { eq } from "drizzle-orm";
import { usuarios } from "src/db/schema";
import { registrosDeDesarrolloDeAprendizaje } from "src/db/schema";

const db = drizzle(process.env.DATABASE_URL!);

// Test Database Connection.
export async function testConnection() {
  try {
    await db.execute(sql`SELECT 1`);
    console.log("Conexión a la base de datos exitosa");
  } catch (error) {
    console.error("Error al conectar a la base de datos:", error);
  }
}

export async function createUser(userData: typeof usuarios.$inferInsert) {
  await db.insert(usuarios).values(userData);
  return { message: "Usuario creado exitosamente" };
}

export async function getAllUsers() {
  const users = await db.select().from(usuarios);
  return users;
}

export async function updateUserRole(email: string, newRole: "admin" | "docente") {
  await db.update(usuarios).set({ rol: newRole }).where(eq(usuarios.correo, email));
  return { message: "Rol de usuario actualizado exitosamente" };
}

export async function deleteUser(email: string) {
  await db.delete(usuarios).where(eq(usuarios.correo, email));
  return { message: "Usuario eliminado exitosamente" };
}

// Crud registrosDeDesarrolloDeAprendizaje

// Crear un nuevo registro
export async function createRegistro(registroData: typeof registrosDeDesarrolloDeAprendizaje.$inferInsert) {
  await db.insert(registrosDeDesarrolloDeAprendizaje).values(registroData);
  return { message: "Registro creado exitosamente" };
}

// Obtener todos los registros
export async function getAllRegistros() {
  const registros = await db.select().from(registrosDeDesarrolloDeAprendizaje);
  return registros;
}

// Obtener un registro por ID
export async function getRegistroById(id: number) {
  const registro = await db
    .select()
    .from(registrosDeDesarrolloDeAprendizaje)
    .where(eq(registrosDeDesarrolloDeAprendizaje.id_registro_desarrollo, id));
  return registro;
}

// Actualizar un registro por ID
export async function updateRegistro(id: number, updatedData: Partial<typeof registrosDeDesarrolloDeAprendizaje.$inferInsert>) {
  await db
    .update(registrosDeDesarrolloDeAprendizaje)
    .set(updatedData)
    .where(eq(registrosDeDesarrolloDeAprendizaje.id_registro_desarrollo, id));
  return { message: "Registro actualizado exitosamente" };
}

// Eliminar un registro por ID
export async function deleteRegistro(id: number) {
  await db
    .delete(registrosDeDesarrolloDeAprendizaje)
    .where(eq(registrosDeDesarrolloDeAprendizaje.id_registro_desarrollo, id));
  return { message: "Registro eliminado exitosamente" };
}

// Export the database instance if needed
export { db };
