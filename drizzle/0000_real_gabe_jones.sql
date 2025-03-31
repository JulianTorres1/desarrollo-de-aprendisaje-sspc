CREATE TABLE `usuarios` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`nombre` varchar(100) NOT NULL,
	`correo` varchar(100) NOT NULL,
	`password` varchar(255) NOT NULL,
	`rol` enum('admin','docente') NOT NULL DEFAULT 'docente',
	`fecha_registro` timestamp DEFAULT (now()),
	CONSTRAINT `usuarios_id` PRIMARY KEY(`id`),
	CONSTRAINT `usuarios_correo_unique` UNIQUE(`correo`)
);
