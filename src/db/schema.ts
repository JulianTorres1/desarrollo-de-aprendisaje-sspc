import {
  mysqlTable,
  serial,
  varchar,
  timestamp,
  mysqlEnum,
  int,
  text,
  date,
  index,
  foreignKey,
} from "drizzle-orm/mysql-core";

// Tabla de usuarios
export const usuarios = mysqlTable("usuarios", {
  id: serial().primaryKey(),
  nombre: varchar("nombre", { length: 100 }).notNull(),
  correo: varchar("correo", { length: 100 }).notNull().unique(),
  password: varchar("password", { length: 255 }).notNull(),
  rol: mysqlEnum("rol", ["admin", "docente"]).default("docente").notNull(),
  fechaRegistro: timestamp("fecha_registro").defaultNow(),
});

// Tabla de asignatura
export const asignatura = mysqlTable("asignatura", {
  id_asignatura: serial("id_asignatura").primaryKey(),
  nombre: varchar("nombre", { length: 100 }).notNull(),
  descripcion: text("descripcion").notNull(),
});

// Tabla intermedia para la relación muchos a muchos entre asignatura y usuarios
export const asignaturaUsuarios = mysqlTable("asignatura_usuarios", {
  id_asignatura: int("id_asignatura").notNull(),
  id_usuario: int("id_usuario").notNull(),
}, (table) => ({
  fk_asignatura: foreignKey({
    columns: [table.id_asignatura],
    foreignColumns: [asignatura.id_asignatura],
  }),
  fk_usuario: foreignKey({
    columns: [table.id_usuario],
    foreignColumns: [usuarios.id],
  }),
  unique_asignatura_usuario: index("unique_asignatura_usuario").on(
    table.id_asignatura,
    table.id_usuario
  ).unique(),
}));

// Tabla de registros de desarrollo de aprendizaje
export const registrosDeDesarrolloDeAprendizaje = mysqlTable(
  "registros_de_desarrollo_de_aprendizaje",
  {
    id_registro_desarrollo: serial("id_registro_desarrollo").primaryKey(),
    id_docente: int("id_docente").notNull(),
    id_asignatura: int("id_asignatura").notNull(),
    id_grado: int("id_grado").notNull(),
    semana: varchar("semana", { length: 20 }).notNull(),
    tema_general: varchar("tema_general", { length: 200 }).notNull(),
    subtema: varchar("subtema", { length: 200 }).notNull(),
    evidencia: text("evidencia").notNull(),
    fase_exploracion: text("fase_exploracion").notNull(),
    fase_conceptualizacion: text("fase_conceptualizacion").notNull(),
    fase_ejecucion: text("fase_ejecucion").notNull(),
    fase_transferencia: text("fase_transferencia").notNull(),
    valoracion: text("valoracion").notNull(),
    observaciones: text("observaciones").notNull(),
    fecha_semana_inicio: date("fecha_semana_inicio").notNull(),
    fecha_semana_fin: date("fecha_semana_fin").notNull(),
    grupo1_hp: int("grupo1_hp").default(0),
    grupo1_he: int("grupo1_he").default(0),
    grupo2_hp: int("grupo2_hp").default(0),
    grupo2_he: int("grupo2_he").default(0),
    grupo3_hp: int("grupo3_hp").default(0),
    grupo3_he: int("grupo3_he").default(0),
    grupo4_hp: int("grupo4_hp").default(0),
    grupo4_he: int("grupo4_he").default(0),
    exposiciones: int("exposiciones").default(0),
    lectura: int("lectura").default(0),
    desarrollo_ejercicios: int("desarrollo_ejercicios").default(0),
    descripcion_lamina: int("descripcion_lamina").default(0),
    actividad_ludica: int("actividad_ludica").default(0),
    explicaciones: int("explicaciones").default(0),
    uso_aula_digital: int("uso_aula_digital").default(0),
    otros_metodos: varchar("otros_metodos", { length: 100 }).default(''),
    fecha_ingreso: timestamp("fecha_ingreso").notNull().defaultNow().onUpdateNow(),
  },
  (table) => ({
    idx_docente: index("idx_id_docente").on(table.id_docente),
    idx_asignatura: index("idx_id_asignatura").on(table.id_asignatura),
    idx_grado: index("idx_id_grado").on(table.id_grado),
    fk_asignatura: foreignKey({
      columns: [table.id_asignatura],
      foreignColumns: [asignatura.id_asignatura],
    }),
    fk_docente: foreignKey({
      columns: [table.id_docente],
      foreignColumns: [usuarios.id],
    }),
  })
);
