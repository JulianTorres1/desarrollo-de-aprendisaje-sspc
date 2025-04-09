import "dotenv/config";
import { drizzle } from "drizzle-orm/mysql2";
import { sql } from "drizzle-orm";
import { eq } from "drizzle-orm";
import { usuarios } from "src/db/schema";

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

// Export the database instance if needed
export { db };
