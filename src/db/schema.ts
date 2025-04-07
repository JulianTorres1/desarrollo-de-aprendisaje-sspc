import { mysqlTable, serial, varchar, timestamp, mysqlEnum } from "drizzle-orm/mysql-core";

export const usuarios = mysqlTable("usuarios", {
  id: serial().primaryKey(),
  nombre: varchar("nombre", { length: 100 }).notNull(),
  correo: varchar("correo", { length: 100 }).notNull().unique(),
  password: varchar("password", { length: 255 }).notNull(),
  rol: mysqlEnum("rol", ["admin", "docente"]).default("docente").notNull(),
  fechaRegistro: timestamp("fecha_registro").defaultNow(),
});
