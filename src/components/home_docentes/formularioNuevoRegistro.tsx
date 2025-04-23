"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";

export default function FormularioDesarrollo() {
  const { data: session } = useSession();

  const user = session?.user ? (session.user as typeof session.user & { id: string }) : null;

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

  const semanas = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26,
    27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40,
  ];

  const [grados, setGrados] = useState([]); // Estado para almacenar los grados asignados al usuario
  const [asignaturas, setAsignaturas] = useState([]); // Estado para almacenar las asignaturas asignadas al usuario

  useEffect(() => {
    if (user?.id) {
      setFormData((prev) => ({
        ...prev,
        id_docente: user.id,
      }));

      // Obtener los grados asignados a este usuario
      const fetchGradosAsignados = async () => {
        try {
          const response = await fetch(`http://localhost:3000/api/usuario-grados/${user.id}`);
          if (!response.ok) {
            throw new Error("Error al obtener los grados asignados");
          }
          const data = await response.json();
          setGrados(data); // Guardar los grados asignados en el estado
        } catch (error) {
          console.error("Error al obtener los grados asignados:", error);
        }
      };

      fetchGradosAsignados();

      // Obtener las asignaturas asignadas a este usuario
      const fetchAsignaturasAsignadas = async () => {
        try {
          const response = await fetch(`http://localhost:3000/api/asignatura-usuario/${user.id}`);
          if (!response.ok) {
            throw new Error("Error al obtener las asignaturas asignadas");
          }
          const data = await response.json();
          setAsignaturas(data); // Guardar las asignaturas asignadas en el estado
        } catch (error) {
          console.error("Error al obtener las asignaturas asignadas:", error);
        }
      };

      fetchAsignaturasAsignadas();
    }
  }, [session]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Formulario enviado:", formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-4xl mx-auto p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="mb-5">
          <label
            htmlFor="id_grado"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Grado
          </label>
          <select
            id="id_grado"
            name="id_grado"
            onChange={handleChange}
            required
            className="input-field"
          >
            <option value="">Selecciona un curso</option>
            {grados.map((grado: { id_grado: number; nombre: string }) => (
              <option key={grado.id_grado} value={grado.id_grado}>
                {grado.nombre}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-5">
          <label
            htmlFor="id_asignatura"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Asignatura
          </label>
          <select
            id="id_asignatura"
            name="id_asignatura"
            onChange={handleChange}
            required
            className="input-field"
          >
            <option value="">Selecciona una Asignatura</option>
            {asignaturas.map((asignaturas: { id_asignatura: number; nombre: string }) => (
              <option key={asignaturas.id_asignatura} value={asignaturas.id_asignatura}>
                {asignaturas.nombre}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-5">
          <label
            htmlFor="semana"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Semana
          </label>
          <select
            id="semana"
            name="semana"
            onChange={handleChange}
            required
            className="input-field"
          >
            <option value="">Selecciona una semana</option>
            {semanas.map((semana) => (
              <option key={semana} value={semana}>
                Semana {semana}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label
          htmlFor="tema_general"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Eje Tematico
        </label>
        <input
          type="text"
          id="tema_general"
          className="block w-full p-2.5 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
      </div>

      <div>
        <label
          htmlFor="subtema"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Subtema
        </label>
        <input
          type="text"
          id="subtema"
          className="block w-full p-2.5 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
      </div>

      <div>
        <label
          htmlFor="evidencia"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Evidencia De Aprendisaje
        </label>
        <textarea
          id="aprendizaje"
          rows={4}
          className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Detalle su evidencia de aprendizaje ... "
        ></textarea>
      </div>

      <div>
        <label
          htmlFor="fase_exploracion"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Exploracion
        </label>
        <textarea
          id="fase_exploracion"
          rows={4}
          className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Detalle la fase de exploracion ... "
        ></textarea>
      </div>

      <div>
        <label
          htmlFor="fase_conceptualizacion"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Conceptualizacion
        </label>
        <textarea
          id="fase_conceptualizacion"
          rows={4}
          className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Detalle la fase de conceptualizacion ... "
        ></textarea>
      </div>

      <div>
        <label
          htmlFor="fase_ejecucion"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Ejecucion
        </label>
        <textarea
          id="fase_ejecucion"
          rows={3}
          className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Detalle la fase de ejecucion ... "
        ></textarea>
      </div>

      <div>
        <label
          htmlFor="fase_transferencia"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Transferencia
        </label>
        <textarea
          id="fase_transferencia"
          rows={3}
          className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Detalle la fase de transferencia ... "
        ></textarea>
      </div>

      <div>
        <label
          htmlFor="valoracion"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Valoracion
        </label>
        <textarea
          id="valoracion"
          rows={3}
          className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Detalle la valoracion ... "
        ></textarea>
      </div>

      <div>
        <label
          htmlFor="observaciones"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Observaciones
        </label>
        <textarea
          id="observaciones"
          rows={3}
          className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Detalle las observaciones ... "
        ></textarea>
      </div>

      <div>
        <div className="text-center mb-1.5">
          <h4 className="text-lg font-bold dark:text-white">Fecha</h4>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label
              htmlFor="fecha_semana_inicio"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Inicio De la Semana
            </label>
            <input
              type="date"
              id="fecha_semana_inicio"
              name="fecha_semana_inicio"
              onChange={handleChange}
              required
              className="block w-full p-2.5 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>

          <div>
            <label
              htmlFor="fecha_semana_fin"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Fin De la Semana
            </label>
            <input
              type="date"
              id="fecha_semana_fin"
              name="fecha_semana_fin"
              onChange={handleChange}
              required
              className="block w-full p-2.5 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>
        </div>
      </div>

      <div className="border-t border-gray-300 my-6"></div>

      <h4 className="text-lg font-bold dark:text-white text-center mb-1.5">
        Planeacion y ejecucion de horas
      </h4>

      <div className="mb-4">
        <h4 className="text-lg font-bold dark:text-white mb-2 text-center">Horas Planeadas</h4>
        <div className="grid grid-cols-3 grid-rows-5 gap-4 text-center mb-2.5">
          <p className="text-sm font-bold">Grupo</p>

          <p className="text-sm font-bold">Horas Planeadas</p>

          <p className="text-sm font-bold">Horas Ejecutadas</p>

          <p className="text-sm font-bold">1</p>

          <div>
            <label
              htmlFor="grupo1_hp"
              className="block text-xs font-medium text-gray-900 dark:text-white"
            >
              Grupo 1 HP
            </label>
            <input
              type="number"
              id="grupo1_hp"
              name="grupo1_hp"
              onChange={handleChange}
              className="w-15 p-1 text-sm border border-gray-300 rounded bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
          </div>
          <div>
            <label
              htmlFor="grupo1_he"
              className="block text-xs font-medium text-gray-900 dark:text-white"
            >
              Grupo 1 HE
            </label>
            <input
              type="number"
              id="grupo1_he"
              name="grupo1_he"
              onChange={handleChange}
              className="w-15 p-1 text-sm border border-gray-300 rounded bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
          </div>

          <p className="text-sm font-bold">2</p>

          <div>
            <label
              htmlFor="grupo2_hp"
              className="block text-xs font-medium text-gray-900 dark:text-white"
            >
              Grupo 2 HP
            </label>
            <input
              type="number"
              id="grupo2_hp"
              name="grupo2_hp"
              onChange={handleChange}
              className="w-15 p-1 text-sm border border-gray-300 rounded bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
          </div>
          <div>
            <label
              htmlFor="grupo2_he"
              className="block text-xs font-medium text-gray-900 dark:text-white"
            >
              Grupo 2 HE
            </label>
            <input
              type="number"
              id="grupo2_he"
              name="grupo2_he"
              onChange={handleChange}
              className="w-15 p-1 text-sm border border-gray-300 rounded bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
          </div>

          <p className="text-sm font-bold">3</p>

          <div>
            <label
              htmlFor="grupo3_hp"
              className="block text-xs font-medium text-gray-900 dark:text-white"
            >
              Grupo 3 HP
            </label>
            <input
              type="number"
              id="grupo3_hp"
              name="grupo3_hp"
              onChange={handleChange}
              className="w-15 p-1 text-sm border border-gray-300 rounded bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
          </div>
          <div>
            <label
              htmlFor="grupo3_he"
              className="block text-xs font-medium text-gray-900 dark:text-white"
            >
              Grupo 3 HE
            </label>
            <input
              type="number"
              id="grupo3_he"
              name="grupo3_he"
              onChange={handleChange}
              className="w-15 p-1 text-sm border border-gray-300 rounded bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
          </div>

          <p className="text-sm font-bold">4</p>

          <div>
            <label
              htmlFor="grupo4_hp"
              className="block text-xs font-medium text-gray-900 dark:text-white"
            >
              Grupo 4 HP
            </label>
            <input
              type="number"
              id="grupo4_hp"
              name="grupo4_hp"
              onChange={handleChange}
              className="w-15 p-1 text-sm border border-gray-300 rounded bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
          </div>
          <div>
            <label
              htmlFor="grupo4_he"
              className="block text-xs font-medium text-gray-900 dark:text-white"
            >
              Grupo 4 HE
            </label>
            <input
              type="number"
              id="grupo4_he"
              name="grupo4_he"
              onChange={handleChange}
              className="w-15 p-1 text-sm border border-gray-300 rounded bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
          </div>
        </div>
      </div>

      <div className="bg-white p-4 rounded shadow w-64">
        <h3 className="text-center font-bold mb-2">METODOLOGÍA</h3>
        <div className="flex flex-col space-y-2 text-sm">
          <label className="flex items-center space-x-2">
            <input type="checkbox" name="metodologia[]" value="Exposiciones" />
            <span>EXPOSICIONES</span>
          </label>
          <label className="flex items-center space-x-2">
            <input type="checkbox" name="metodologia[]" value="Lectura comentada" />
            <span>LECTURA COMENTADA</span>
          </label>
          <label className="flex items-center space-x-2">
            <input type="checkbox" name="metodologia[]" value="Desarrollo de ejercicios" />
            <span>DESARROLLO DE EJERCICIOS</span>
          </label>
          <label className="flex items-center space-x-2">
            <input type="checkbox" name="metodologia[]" value="Descripción de lámina" />
            <span>DESCRIPCIÓN DE LÁMINA</span>
          </label>
          <label className="flex items-center space-x-2">
            <input type="checkbox" name="metodologia[]" value="Lúdica" />
            <span>LÚDICA</span>
          </label>
          <label className="flex items-center space-x-2">
            <input type="checkbox" name="metodologia[]" value="Explicaciones" />
            <span>EXPLICACIONES</span>
          </label>
          <label className="flex items-center space-x-2">
            <input type="checkbox" name="metodologia[]" value="Aula digital" />
            <span>AULA DIGITAL</span>
          </label>
          <input
            type="text"
            name="metodologia_otra"
            placeholder="OTRAS"
            className="border border-gray-400 text-sm px-2 py-1 rounded"
          />
        </div>
      </div>

      <button
        type="submit"
        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-lg shadow"
      >
        Guardar Registro
      </button>
    </form>
  );
}
