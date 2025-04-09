import Image from "next/image";

export default function nuevoRegistro() {
    return (
        <div className="flex flex-col items-center justify-start min-h-screen ">
            <div className="w-full">
                <Image
                    src="/img/desarrollo.png"
                    alt="Banner"
                    width={0}
                    height={0}
                    sizes="100vw"
                    className="w-full h-auto object-cover"
                />
            </div>

            <form className="w-full max-w-5xl p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Datos generales */}
                <FormInput name="docente" label="Docente" />
                <FormInput name="asignatura" label="Asignatura" />
                <FormInput name="grado" label="Grado" />
                <FormInput name="semana" label="Semana" />

                {/* Temas */}
                <FormInput name="tematico" label="Tema Central" />
                <FormInput name="subtema" label="Subtema" />

                {/* Desarrollo */}
                <FormTextarea name="evidencia" label="Evidencia" />
                <FormTextarea name="exploracion" label="Exploración" />
                <FormTextarea name="conceptualizacion" label="Conceptualización" />
                <FormTextarea name="ejecucion" label="Ejecución" />
                <FormTextarea name="transferencia" label="Transferencia" />
                <FormTextarea name="valoracion" label="Valoración" />
                <FormTextarea name="observaciones" label="Observaciones" />

                {/* Fechas */}
                <FormInput name="fecha_sem_start" label="Inicio Semana" type="date" />
                <FormInput name="fecha_sem_end" label="Fin Semana" type="date" />

                {/* Grupos */}
                <FormInput name="grupo1hp" label="Grupo 1 HP" type="number" />
                <FormInput name="grupo1he" label="Grupo 1 HE" type="number" />
                <FormInput name="grupo2hp" label="Grupo 2 HP" type="number" />
                <FormInput name="grupo2he" label="Grupo 2 HE" type="number" />
                <FormInput name="grupo3hp" label="Grupo 3 HP" type="number" />
                <FormInput name="grupo3he" label="Grupo 3 HE" type="number" />
                <FormInput name="grupo4hp" label="Grupo 4 HP" type="number" />
                <FormInput name="grupo4he" label="Grupo 4 HE" type="number" />

                {/* Metodología (checkboxes) */}
                <CheckboxGroup />

                {/* Evaluación */}
                <FormInput name="descripcion" label="Descripción" type="number" />
                <FormInput name="ludica" label="Lúdica" type="number" />
                <FormInput name="explicaciones" label="Explicaciones" type="number" />
                <FormInput name="aula" label="Aula" type="number" />
                <FormInput name="otros" label="Otros" />

                <button
                    type="submit"
                    className="col-span-1 md:col-span-2 bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
                >
                    Guardar Registro
                </button>
            </form>
        </div>
    );
}

// Input component
function FormInput({ name, label, type = "text" }: { name: string, label: string, type?: string }) {
    return (
        <div className="flex flex-col">
            <label htmlFor={name} className="mb-1 font-medium">{label}</label>
            <input
                type={type}
                name={name}
                id={name}
                className="bg-white border border-gray-300 rounded p-2"
                required
            />
        </div>
    );
}

// Textarea component
function FormTextarea({ name, label }: { name: string, label: string }) {
    return (
        <div className="flex flex-col md:col-span-2">
            <label htmlFor={name} className="mb-1 font-medium">{label}</label>
            <textarea
                name={name}
                id={name}
                rows={3}
                className="bg-white border border-gray-300 rounded p-2"
                required
            />
        </div>
    );
}

// Checkbox group component
function CheckboxGroup() {
    const items = ["exposiciones", "lectura", "desarrollo"];
    return (
        <div className="flex flex-col gap-2 md:col-span-2">
            <label className="font-medium">Metodología</label>
            <div className="flex gap-4">
                {items.map(item => (
                    <label key={item} className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            name={item}
                            className="accent-blue-600"
                        />
                        {item.charAt(0).toUpperCase() + item.slice(1)}
                    </label>
                ))}
            </div>
        </div>
    );
}
