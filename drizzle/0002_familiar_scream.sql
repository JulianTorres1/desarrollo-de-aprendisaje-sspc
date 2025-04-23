CREATE TABLE `asignatura` (
	`id_asignatura` serial AUTO_INCREMENT NOT NULL,
	`nombre` varchar(100) NOT NULL,
	`descripcion` text NOT NULL,
	CONSTRAINT `asignatura_id_asignatura` PRIMARY KEY(`id_asignatura`)
);
--> statement-breakpoint
CREATE TABLE `asignatura_usuarios` (
	`id_asignatura` int NOT NULL,
	`id_usuario` int NOT NULL,
	CONSTRAINT `idx_unique_asignatura_usuario` UNIQUE(`id_asignatura`,`id_usuario`)
);
--> statement-breakpoint
CREATE TABLE `grado` (
	`id_grado` serial AUTO_INCREMENT NOT NULL,
	`nombre` varchar(100) NOT NULL,
	CONSTRAINT `grado_id_grado` PRIMARY KEY(`id_grado`)
);
--> statement-breakpoint
ALTER TABLE `usuarios` DROP PRIMARY KEY;--> statement-breakpoint
ALTER TABLE `usuarios` ADD PRIMARY KEY(`id_usuario`);--> statement-breakpoint
ALTER TABLE `usuarios` ADD `id_usuario` serial AUTO_INCREMENT NOT NULL;--> statement-breakpoint
ALTER TABLE `asignatura_usuarios` ADD CONSTRAINT `asignatura_usuarios_id_asignatura_asignatura_id_asignatura_fk` FOREIGN KEY (`id_asignatura`) REFERENCES `asignatura`(`id_asignatura`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `asignatura_usuarios` ADD CONSTRAINT `asignatura_usuarios_id_usuario_usuarios_id_usuario_fk` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios`(`id_usuario`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `registros_de_desarrollo_de_aprendizaje` ADD CONSTRAINT `registros_de_desarrollo_de_aprendizaje_id_asignatura_asignatura_id_asignatura_fk` FOREIGN KEY (`id_asignatura`) REFERENCES `asignatura`(`id_asignatura`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `registros_de_desarrollo_de_aprendizaje` ADD CONSTRAINT `registros_de_desarrollo_de_aprendizaje_id_docente_usuarios_id_usuario_fk` FOREIGN KEY (`id_docente`) REFERENCES `usuarios`(`id_usuario`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `registros_de_desarrollo_de_aprendizaje` ADD CONSTRAINT `registros_de_desarrollo_de_aprendizaje_id_grado_grado_id_grado_fk` FOREIGN KEY (`id_grado`) REFERENCES `grado`(`id_grado`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `usuarios` DROP COLUMN `id`;