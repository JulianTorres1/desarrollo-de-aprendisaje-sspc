import React from "react";
import SubjectCard from "@/components/home/SubjectCard";

export default function Materias() {
  return (
    <div>
      <h1>Materias</h1>
      <p>Esta es la página de materias.</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <SubjectCard
          name="Matemáticas"
          description="Estudia los números y sus relaciones."
          teachers={["Prof. Juan Pérez", "Prof. Ana Gómez"]}
        />
        <SubjectCard
          name="Historia"
          description="Explora los eventos del pasado."
          teachers={["Prof. Luis Martínez", "Prof. María López"]}
        />
        <SubjectCard
          name="Ciencias"
          description="Aprende sobre el mundo natural."
          teachers={["Prof. Carlos Sánchez", "Prof. Laura Fernández"]}
        />
        <SubjectCard
          name="Literatura"
          description="Sumérgete en el mundo de las palabras."
          teachers={["Prof. Elena Torres", "Prof. Javier Ramírez"]}
        />
      </div>
      <p></p>
    </div>
  );
}
