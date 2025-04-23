import {
  mysqlTable,
  bigint,
  varchar,
  timestamp,
  mysqlEnum,
  int,
  text,
  date,
  index,
  foreignKey,
  uniqueIndex,
} from "drizzle-orm/mysql-core";

// Tabla de usuarios
export const usuarios = mysqlTable("usuarios", {
  id_usuario: bigint("id_usuario", { mode: "number", unsigned: true }).primaryKey().autoincrement(),
  nombre: varchar("nombre", { length: 100 }).notNull(),
  correo: varchar("correo", { length: 100 }).notNull().unique(),
  password: varchar("password", { length: 255 }).notNull(),
  rol: mysqlEnum("rol", ["admin", "docente"]).default("docente").notNull(),
  fecha_registro: timestamp("fecha_registro").defaultNow().notNull(),
  updated_at: timestamp("updated_at").onUpdateNow(),
});

// Tabla de asignatura
export const asignatura = mysqlTable("asignatura", {
  id_asignatura: bigint("id_asignatura", { mode: "number", unsigned: true })
    .primaryKey()
    .autoincrement(),
  nombre: varchar("nombre", { length: 100 }).notNull(),
  descripcion: text("descripcion"),
});

// Tabla de grados
export const grado = mysqlTable("grado", {
  id_grado: bigint("id_grado", { mode: "number", unsigned: true }).primaryKey().autoincrement(),
  nombre: varchar("nombre", { length: 100 }).notNull(),
});

// Tabla intermedia para relación muchos a muchos entre asignatura y usuarios (docentes)
export const asignaturaUsuarios = mysqlTable(
  "asignatura_usuarios",
  {
    id_asignatura: bigint("id_asignatura", { mode: "number", unsigned: true }).notNull(),
    id_usuario: bigint("id_usuario", { mode: "number", unsigned: true }).notNull(),
    fecha_asignacion: timestamp("fecha_asignacion").defaultNow().notNull(),
  },
  (table) => {
    return {
      // Claves foráneas con nombres personalizados cortos
      fk1: foreignKey({
        name: "fk_asignatura_usuario",
        columns: [table.id_asignatura],
        foreignColumns: [asignatura.id_asignatura],
      })
        .onDelete("cascade")
        .onUpdate("cascade"),
      fk2: foreignKey({
        name: "fk_usuario_asignatura",
        columns: [table.id_usuario],
        foreignColumns: [usuarios.id_usuario],
      })
        .onDelete("cascade")
        .onUpdate("cascade"),
      // Índice único para evitar duplicados
      idx_unique: uniqueIndex("idx_unique_asig_usuario").on(table.id_asignatura, table.id_usuario),
    };
  }
);

export const usuarioGrados = mysqlTable(
  "usuario_grados",
  {
    id_usuario: bigint("id_usuario", { mode: "number", unsigned: true }).notNull(),
    id_grado: bigint("id_grado", { mode: "number", unsigned: true }).notNull(),
    fecha_asignacion: timestamp("fecha_asignacion").defaultNow().notNull(),
  },
  (table) => {
    return {
      fk_usuario: foreignKey({
        name: "fk_usuario_grado_usuario",
        columns: [table.id_usuario],
        foreignColumns: [usuarios.id_usuario],
      })
        .onDelete("cascade")
        .onUpdate("cascade"),
      fk_grado: foreignKey({
        name: "fk_usuario_grado_grado",
        columns: [table.id_grado],
        foreignColumns: [grado.id_grado],
      })
        .onDelete("cascade")
        .onUpdate("cascade"),
      unique_idx: uniqueIndex("idx_unique_usuario_grado").on(table.id_usuario, table.id_grado),
    };
  }
);


// Tabla de registros de desarrollo de aprendizaje
export const registrosDeDesarrolloDeAprendizaje = mysqlTable(
  "registros_de_desarrollo_de_aprendizaje",
  {
    id_registro_desarrollo: bigint("id_registro_desarrollo", { mode: "number", unsigned: true })
      .primaryKey()
      .autoincrement(),
    id_docente: bigint("id_docente", { mode: "number", unsigned: true }).notNull(),
    id_asignatura: bigint("id_asignatura", { mode: "number", unsigned: true }).notNull(),
    id_grado: bigint("id_grado", { mode: "number", unsigned: true }).notNull(),
    semana: varchar("semana", { length: 20 }).notNull(),
    tema_general: varchar("tema_general", { length: 200 }).notNull(),
    subtema: varchar("subtema", { length: 200 }).notNull(),
    evidencia: text("evidencia"),
    fase_exploracion: text("fase_exploracion"),
    fase_conceptualizacion: text("fase_conceptualizacion"),
    fase_ejecucion: text("fase_ejecucion"),
    fase_transferencia: text("fase_transferencia"),
    valoracion: text("valoracion"),
    observaciones: text("observaciones"),
    fecha_semana_inicio: date("fecha_semana_inicio").notNull(),
    fecha_semana_fin: date("fecha_semana_fin").notNull(),
    // Horas planeadas y ejecutadas
    grupo1_hp: int("grupo1_hp").default(0),
    grupo1_he: int("grupo1_he").default(0),
    grupo2_hp: int("grupo2_hp").default(0),
    grupo2_he: int("grupo2_he").default(0),
    grupo3_hp: int("grupo3_hp").default(0),
    grupo3_he: int("grupo3_he").default(0),
    grupo4_hp: int("grupo4_hp").default(0),
    grupo4_he: int("grupo4_he").default(0),
    // Contadores de métodos/actividades
    exposiciones: int("exposiciones").default(0),
    lectura: int("lectura").default(0),
    desarrollo_ejercicios: int("desarrollo_ejercicios").default(0),
    descripcion_lamina: int("descripcion_lamina").default(0),
    actividad_ludica: int("actividad_ludica").default(0),
    explicaciones: int("explicaciones").default(0),
    uso_aula_digital: int("uso_aula_digital").default(0),
    otros_metodos: varchar("otros_metodos", { length: 100 }).default(""),
    // Timestamps
    fecha_ingreso: timestamp("fecha_ingreso").notNull().defaultNow(),
    fecha_modificacion: timestamp("fecha_modificacion").onUpdateNow(),
  },
  (table) => {
    return {
      // Índices para mejorar rendimiento
      idx_docente: index("idx_docente").on(table.id_docente),
      idx_asignatura: index("idx_asignatura").on(table.id_asignatura),
      idx_grado: index("idx_grado").on(table.id_grado),
      // Claves Foráneas con nombres personalizados cortos
      fk_asig: foreignKey({
        name: "fk_registro_asignatura",
        columns: [table.id_asignatura],
        foreignColumns: [asignatura.id_asignatura],
      })
        .onDelete("restrict")
        .onUpdate("cascade"),
      fk_doc: foreignKey({
        name: "fk_registro_docente",
        columns: [table.id_docente],
        foreignColumns: [usuarios.id_usuario],
      })
        .onDelete("restrict")
        .onUpdate("cascade"),
      fk_grad: foreignKey({
        name: "fk_registro_grado",
        columns: [table.id_grado],
        foreignColumns: [grado.id_grado],
      })
        .onDelete("restrict")
        .onUpdate("cascade"),
    };
  }
);
