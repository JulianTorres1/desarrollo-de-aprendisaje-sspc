"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";

interface FormData {
  nombre: string;
  correo: string;
  password: string;
  rol: "docente" | "admin";
}

export default function Register() {
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    nombre: "",
    correo: "",
    password: "",
    rol: "docente",
  });
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const registerUser = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Error al registrar usuario");
      }

      // Registro exitoso, redirigir al login
      alert(data.message);

      router.push("/");
    } catch (error) {
      setError(error instanceof Error ? error.message : "Error al registrar usuario");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">Registro de Usuario</h2>
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
      <form onSubmit={registerUser} className="space-y-4">
        <div>
          <label htmlFor="nombre" className="block mb-1">
            Nombre
          </label>
          <input
            id="nombre"
            name="nombre"
            type="text"
            required
            value={formData.nombre}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            placeholder="Nombre completo"
          />
        </div>
        <div>
          <label htmlFor="correo" className="block mb-1">
            Correo
          </label>
          <input
            id="correo"
            name="correo"
            type="email"
            required
            value={formData.correo}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            placeholder="correo@ejemplo.com"
          />
        </div>
        <div>
          <label htmlFor="password" className="block mb-1">
            Contraseña
          </label>
          <input
            id="password"
            name="password"
            type="password"
            required
            value={formData.password}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            placeholder="Contraseña"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-red-600 text-white p-2 rounded hover:bg-red-500 disabled:bg-red-300"
        >
          {loading ? "Registrando..." : "Registrar"}
        </button>
      </form>
    </div>
  );
}
