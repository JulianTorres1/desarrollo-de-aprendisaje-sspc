// app/components/FormularioDesarrollo.tsx

"use client";

import { usuarios } from "@/db/schema";
import { useState } from "react";

export default function FormularioDesarrollo() {
  const [formData, setFormData] = useState({
    id_docente: "",
    id_asignatura: "",
    id_grado: "",
    semana: "",
    tema_general: "",
    subtema: "",
    evidencia: "",
    fase_exploracion: "",
    fase_conceptualizacion: "",
    fase_ejecucion: "",
    fase_transferencia: "",
    valoracion: "",
    observaciones: "",
    fecha_semana_inicio: "",
    fecha_semana_fin: "",
    grupo1_hp: 0,
    grupo1_he: 0,
    grupo2_hp: 0,
    grupo2_he: 0,
    grupo3_hp: 0,
    grupo3_he: 0,
    grupo4_hp: 0,
    grupo4_he: 0,
    exposiciones: 0,
    lectura: 0,
    desarrollo_ejercicios: 0,
    descripcion_lamina: 0,
    actividad_ludica: 0,
    explicaciones: 0,
    uso_aula_digital: 0,
    otros_metodos: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const registro = {
      ...formData,
      Id_docente: parseInt(usuarios.id.valueOf().toString()),
      Id_asignatura: parseInt(formData.id_asignatura)
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-4xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input type="number" name="id_docente" placeholder="ID Docente" onChange={handleChange} required />
        <input type="number" name="id_asignatura" placeholder="ID Asignatura" onChange={handleChange} required />
        <input type="number" name="id_grado" placeholder="ID Grado" onChange={handleChange} required />
        <input type="text" name="semana" placeholder="Semana" onChange={handleChange} required />
        <input type="text" name="tema_general" placeholder="Tema general" onChange={handleChange} required />
        <input type="text" name="subtema" placeholder="Subtema" onChange={handleChange} required />
        <input type="date" name="fecha_semana_inicio" onChange={handleChange} required />
        <input type="date" name="fecha_semana_fin" onChange={handleChange} required />
        <input type="text" name="otros_metodos" placeholder="Otros métodos" onChange={handleChange} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <textarea name="evidencia" placeholder="Evidencia" onChange={handleChange} required />
        <textarea name="fase_exploracion" placeholder="Fase Exploración" onChange={handleChange} required />
        <textarea name="fase_conceptualizacion" placeholder="Fase Conceptualización" onChange={handleChange} required />
        <textarea name="fase_ejecucion" placeholder="Fase Ejecución" onChange={handleChange} required />
        <textarea name="fase_transferencia" placeholder="Fase Transferencia" onChange={handleChange} required />
        <textarea name="valoracion" placeholder="Valoración" onChange={handleChange} required />
        <textarea name="observaciones" placeholder="Observaciones" onChange={handleChange} required />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
        {["grupo1", "grupo2", "grupo3", "grupo4"].flatMap((grupo) => [
          <input key={`${grupo}_hp`} type="number" name={`${grupo}_hp`} placeholder={`${grupo.toUpperCase()} HP`} onChange={handleChange} />,
          <input key={`${grupo}_he`} type="number" name={`${grupo}_he`} placeholder={`${grupo.toUpperCase()} HE`} onChange={handleChange} />,
        ])}
        <input type="number" name="exposiciones" placeholder="Exposiciones" onChange={handleChange} />
        <input type="number" name="lectura" placeholder="Lectura" onChange={handleChange} />
        <input type="number" name="desarrollo_ejercicios" placeholder="Desarrollo Ejercicios" onChange={handleChange} />
        <input type="number" name="descripcion_lamina" placeholder="Descripción Lámina" onChange={handleChange} />
        <input type="number" name="actividad_ludica" placeholder="Actividad Lúdica" onChange={handleChange} />
        <input type="number" name="explicaciones" placeholder="Explicaciones" onChange={handleChange} />
        <input type="number" name="uso_aula_digital" placeholder="Uso Aula Digital" onChange={handleChange} />
      </div>

      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Guardar Registro</button>
    </form>
  );
}
