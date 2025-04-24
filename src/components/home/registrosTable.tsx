"use client";

import { useState, useEffect } from "react";

interface Registro {
  id_registro_desarrollo: number;
  id_docente: number;
  id_asignatura: number;
  id_grado: number;
  semana: string;
  tema_general: string;
  subtema: string;
  evidencia: string;
  fase_exploracion: string;
  fase_conceptualizacion: string;
  fase_ejecucion: string;
  fase_transferencia: string;
  valoracion: string;
  observaciones: string;
  fecha_semana_inicio: string;
  fecha_semana_fin: string;
  grupo1_hp: number;
  grupo1_he: number;
  grupo2_hp: number;
  grupo2_he: number;
  grupo3_hp: number;
  grupo3_he: number;
  grupo4_hp: number;
  grupo4_he: number;
  exposiciones: number;
  lectura: number;
  desarrollo_ejercicios: number;
  descripcion_lamina: number;
  actividad_ludica: number;
  explicaciones: number;
  uso_aula_digital: number;
  otros_metodos: string;
}

interface Usuario {
  id_usuario: number;
  nombre: string;
}

interface Asisnatura {
  id_asignatura: number;
  nombre: string;
}

export default function RegistrosTable() {
  const [registros, setRegistros] = useState<Registro[]>([]);
  const [usuarios, setUsuarios] = useState<Map<number, string>>(new Map());
  const [asignaturas, setAsignaturas] = useState<Map<number, string>>(new Map());

  useEffect(() => {
    async function fetchRegistros() {
      try {
        const res = await fetch("http://localhost:3000/api/nuevo-registro");
        if (!res.ok) throw new Error("Error al obtener registros");
        const data = await res.json();

        if (Array.isArray(data.registros)) {
          setRegistros(data.registros);
        } else {
          console.error("La respuesta de la API no contiene un arreglo de registros:", data);
        }
      } catch (error) {
        console.error("Error al obtener los registros:", error);
      }
    }

    async function fetchUsuarios() {
      try {
        const res = await fetch("http://localhost:3000/api/usuarios");
        if (!res.ok) throw new Error("Error al obtener usuarios");
        const data: Usuario[] = await res.json();

        // Crea un mapa de id_usuario a nombre
        const usuariosMap = new Map(data.map((usuario) => [usuario.id_usuario, usuario.nombre]));
        setUsuarios(usuariosMap);
      } catch (error) {
        console.error("Error al obtener los usuarios:", error);
      }
    }

    async function fetchAsignaturas() {
      try {
        const res = await fetch("http://localhost:3000/api/asignaturas");
        if (!res.ok) throw new Error("Error al obtener asignaturas");
        const data: Asisnatura[] = await res.json();

        // Crea un mapa de id_asignatura a nombre
        const asignaturasMap = new Map(
          data.map((asignatura) => [asignatura.id_asignatura, asignatura.nombre])
        );
        setAsignaturas(asignaturasMap);
      } catch (error) {
        console.error("Error al obtener las asignaturas:", error);
      }
    }

    fetchRegistros();
    fetchUsuarios();
    fetchAsignaturas();
  }, []);

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200 bg-white shadow-md rounded-lg">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              ID
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Docente
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Asignatura
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Grado
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Semana
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Tema General
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Subtema
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Evidencia
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Fase Exploración
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Fase Conceptualización
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Fase Ejecución
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Fase Transferencia
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Valoración
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Observaciones
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Fecha Semana Inicio
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Fecha Semana Fin
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Grupo 1 HP
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Grupo 1 HE
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Grupo 2 HP
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Grupo 2 HE
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Grupo 3 HP
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Grupo 3 HE
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Grupo 4 HP
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Grupo 4 HE
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Exposiciones
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Lectura
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Desarrollo Ejercicios
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Descripción Lámina
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actividad Lúdica
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Explicaciones
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Uso Aula Digital
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Otros Métodos
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Acciones
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {registros.map((registro) => (
            <tr key={registro.id_registro_desarrollo}>
              <td className="px-6 py-4 whitespace-nowrap">{registro.id_registro_desarrollo}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                {usuarios.get(registro.id_docente) || "Desconocido"}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {asignaturas.get(registro.id_asignatura) || "Desconocido"}
              </td>

              <td className="px-6 py-4 whitespace-nowrap">{registro.id_grado}</td>
              <td className="px-6 py-4 whitespace-nowrap">{registro.semana}</td>
              <td className="px-6 py-4 whitespace-nowrap">{registro.tema_general}</td>
              <td className="px-6 py-4 whitespace-nowrap">{registro.subtema}</td>
              <td className="px-6 py-4 whitespace-nowrap">{registro.evidencia}</td>
              <td className="px-6 py-4 whitespace-nowrap">{registro.fase_exploracion}</td>
              <td className="px-6 py-4 whitespace-nowrap">{registro.fase_conceptualizacion}</td>
              <td className="px-6 py-4 whitespace-nowrap">{registro.fase_ejecucion}</td>
              <td className="px-6 py-4 whitespace-nowrap">{registro.fase_transferencia}</td>
              <td className="px-6 py-4 whitespace-nowrap">{registro.valoracion}</td>
              <td className="px-6 py-4 whitespace-nowrap">{registro.observaciones}</td>
              <td className="px-6 py-4 whitespace-nowrap">{registro.fecha_semana_inicio}</td>
              <td className="px-6 py-4 whitespace-nowrap">{registro.fecha_semana_fin}</td>
              <td className="px-6 py-4 whitespace-nowrap">{registro.grupo1_hp}</td>
              <td className="px-6 py-4 whitespace-nowrap">{registro.grupo1_he}</td>
              <td className="px-6 py-4 whitespace-nowrap">{registro.grupo2_hp}</td>
              <td className="px-6 py-4 whitespace-nowrap">{registro.grupo2_he}</td>
              <td className="px-6 py-4 whitespace-nowrap">{registro.grupo3_hp}</td>
              <td className="px-6 py-4 whitespace-nowrap">{registro.grupo3_he}</td>
              <td className="px-6 py-4 whitespace-nowrap">{registro.grupo4_hp}</td>
              <td className="px-6 py-4 whitespace-nowrap">{registro.grupo4_he}</td>
              <td className="px-6 py-4 whitespace-nowrap">{registro.exposiciones}</td>
              <td className="px-6 py-4 whitespace-nowrap">{registro.lectura}</td>
              <td className="px-6 py-4 whitespace-nowrap">{registro.desarrollo_ejercicios}</td>
              <td className="px-6 py-4 whitespace-nowrap">{registro.descripcion_lamina}</td>
              <td className="px-6 py-4 whitespace-nowrap">{registro.actividad_ludica}</td>
              <td className="px-6 py-4 whitespace-nowrap">{registro.explicaciones}</td>
              <td className="px-6 py-4 whitespace-nowrap">{registro.uso_aula_digital}</td>
              <td className="px-6 py-4 whitespace-nowrap">{registro.otros_metodos}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <button className="text-blue-500 hover:underline">Editar</button>
                <button className="text-red-500 hover:underline ml-4">Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
