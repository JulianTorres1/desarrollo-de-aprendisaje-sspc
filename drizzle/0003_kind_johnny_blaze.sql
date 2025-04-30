CREATE TABLE `usuario_grados` (
	`id_usuario` bigint unsigned NOT NULL,
	`id_grado` bigint unsigned NOT NULL,
	`fecha_asignacion` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `idx_unique_usuario_grado` UNIQUE(`id_usuario`,`id_grado`)
);
--> statement-breakpoint
ALTER TABLE `asignatura_usuarios` DROP INDEX `idx_unique_asignatura_usuario`;--> statement-breakpoint
ALTER TABLE `asignatura_usuarios` DROP FOREIGN KEY `asignatura_usuarios_id_asignatura_asignatura_id_asignatura_fk`;
--> statement-breakpoint
ALTER TABLE `asignatura_usuarios` DROP FOREIGN KEY `asignatura_usuarios_id_usuario_usuarios_id_usuario_fk`;
--> statement-breakpoint
ALTER TABLE `registros_de_desarrollo_de_aprendizaje` DROP FOREIGN KEY `registros_de_desarrollo_de_aprendizaje_id_asignatura_asignatura_id_asignatura_fk`;
--> statement-breakpoint
ALTER TABLE `registros_de_desarrollo_de_aprendizaje` DROP FOREIGN KEY `registros_de_desarrollo_de_aprendizaje_id_docente_usuarios_id_usuario_fk`;
--> statement-breakpoint
ALTER TABLE `registros_de_desarrollo_de_aprendizaje` DROP FOREIGN KEY `registros_de_desarrollo_de_aprendizaje_id_grado_grado_id_grado_fk`;
--> statement-breakpoint
DROP INDEX `idx_id_docente` ON `registros_de_desarrollo_de_aprendizaje`;--> statement-breakpoint
DROP INDEX `idx_id_asignatura` ON `registros_de_desarrollo_de_aprendizaje`;--> statement-breakpoint
DROP INDEX `idx_id_grado` ON `registros_de_desarrollo_de_aprendizaje`;--> statement-breakpoint
ALTER TABLE `asignatura` MODIFY COLUMN `id_asignatura` bigint unsigned AUTO_INCREMENT NOT NULL;--> statement-breakpoint
ALTER TABLE `asignatura` MODIFY COLUMN `descripcion` text;--> statement-breakpoint
ALTER TABLE `asignatura_usuarios` MODIFY COLUMN `id_asignatura` bigint unsigned NOT NULL;--> statement-breakpoint
ALTER TABLE `asignatura_usuarios` MODIFY COLUMN `id_usuario` bigint unsigned NOT NULL;--> statement-breakpoint
ALTER TABLE `grado` MODIFY COLUMN `id_grado` bigint unsigned AUTO_INCREMENT NOT NULL;--> statement-breakpoint
ALTER TABLE `registros_de_desarrollo_de_aprendizaje` MODIFY COLUMN `id_registro_desarrollo` bigint unsigned AUTO_INCREMENT NOT NULL;--> statement-breakpoint
ALTER TABLE `registros_de_desarrollo_de_aprendizaje` MODIFY COLUMN `id_docente` bigint unsigned NOT NULL;--> statement-breakpoint
ALTER TABLE `registros_de_desarrollo_de_aprendizaje` MODIFY COLUMN `id_asignatura` bigint unsigned NOT NULL;--> statement-breakpoint
ALTER TABLE `registros_de_desarrollo_de_aprendizaje` MODIFY COLUMN `id_grado` bigint unsigned NOT NULL;--> statement-breakpoint
ALTER TABLE `registros_de_desarrollo_de_aprendizaje` MODIFY COLUMN `evidencia` text;--> statement-breakpoint
ALTER TABLE `registros_de_desarrollo_de_aprendizaje` MODIFY COLUMN `fase_exploracion` text;--> statement-breakpoint
ALTER TABLE `registros_de_desarrollo_de_aprendizaje` MODIFY COLUMN `fase_conceptualizacion` text;--> statement-breakpoint
ALTER TABLE `registros_de_desarrollo_de_aprendizaje` MODIFY COLUMN `fase_ejecucion` text;--> statement-breakpoint
ALTER TABLE `registros_de_desarrollo_de_aprendizaje` MODIFY COLUMN `fase_transferencia` text;--> statement-breakpoint
ALTER TABLE `registros_de_desarrollo_de_aprendizaje` MODIFY COLUMN `valoracion` text;--> statement-breakpoint
ALTER TABLE `registros_de_desarrollo_de_aprendizaje` MODIFY COLUMN `observaciones` text;--> statement-breakpoint
ALTER TABLE `registros_de_desarrollo_de_aprendizaje` MODIFY COLUMN `fecha_ingreso` timestamp NOT NULL DEFAULT (now());--> statement-breakpoint
ALTER TABLE `usuarios` MODIFY COLUMN `id_usuario` bigint unsigned AUTO_INCREMENT NOT NULL;--> statement-breakpoint
ALTER TABLE `usuarios` MODIFY COLUMN `fecha_registro` timestamp NOT NULL DEFAULT (now());--> statement-breakpoint
ALTER TABLE `asignatura_usuarios` ADD `fecha_asignacion` timestamp DEFAULT (now()) NOT NULL;--> statement-breakpoint
ALTER TABLE `registros_de_desarrollo_de_aprendizaje` ADD `fecha_modificacion` timestamp ON UPDATE CURRENT_TIMESTAMP;--> statement-breakpoint
ALTER TABLE `usuarios` ADD `updated_at` timestamp ON UPDATE CURRENT_TIMESTAMP;--> statement-breakpoint
ALTER TABLE `asignatura_usuarios` ADD CONSTRAINT `idx_unique_asig_usuario` UNIQUE(`id_asignatura`,`id_usuario`);--> statement-breakpoint
ALTER TABLE `usuario_grados` ADD CONSTRAINT `fk_usuario_grado_usuario` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios`(`id_usuario`) ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE `usuario_grados` ADD CONSTRAINT `fk_usuario_grado_grado` FOREIGN KEY (`id_grado`) REFERENCES `grado`(`id_grado`) ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE `asignatura_usuarios` ADD CONSTRAINT `fk_asignatura_usuario` FOREIGN KEY (`id_asignatura`) REFERENCES `asignatura`(`id_asignatura`) ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE `asignatura_usuarios` ADD CONSTRAINT `fk_usuario_asignatura` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios`(`id_usuario`) ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE `registros_de_desarrollo_de_aprendizaje` ADD CONSTRAINT `fk_registro_asignatura` FOREIGN KEY (`id_asignatura`) REFERENCES `asignatura`(`id_asignatura`) ON DELETE restrict ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE `registros_de_desarrollo_de_aprendizaje` ADD CONSTRAINT `fk_registro_docente` FOREIGN KEY (`id_docente`) REFERENCES `usuarios`(`id_usuario`) ON DELETE restrict ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE `registros_de_desarrollo_de_aprendizaje` ADD CONSTRAINT `fk_registro_grado` FOREIGN KEY (`id_grado`) REFERENCES `grado`(`id_grado`) ON DELETE restrict ON UPDATE cascade;--> statement-breakpoint
CREATE INDEX `idx_docente` ON `registros_de_desarrollo_de_aprendizaje` (`id_docente`);--> statement-breakpoint
CREATE INDEX `idx_asignatura` ON `registros_de_desarrollo_de_aprendizaje` (`id_asignatura`);--> statement-breakpoint
CREATE INDEX `idx_grado` ON `registros_de_desarrollo_de_aprendizaje` (`id_grado`);