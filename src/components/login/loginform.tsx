"use client";

import React, { FormEvent, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

const LoginForm = () => {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const formData = new FormData(event.currentTarget);
      const correo = formData.get("correo") as string;
      const password = formData.get("password") as string;
      const result = await signIn("credentials", {
        correo,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError(result.error);
      } else {
        // Obtener el rol del usuario desde el servidor o sesión
        const response = await fetch("/api/auth/session");
        const session = await response.json();

        if (session?.user?.role === "docente") {
          router.push("/home_docentes"); // Redirigir a docentes
        } else if (session?.user?.role === "admin") {
          router.push("/home"); // Redirigir a admin
        } else {
          setError("Rol no reconocido.");
        }
      }
    } catch {
      setError("Error de conexión. Inténtelo de nuevo.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-0 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <span className="flex justify-center ">
          <Image
            className="w-[25%] h-[25%]"
            src={"/img/LogoSalesianos.png"}
            alt="Logo Salesianos Cartagena"
            width={200}
            height={200}
          />
        </span>
        <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
          Inicia sesión
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={handleSubmit}>
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
              {error}
            </div>
          )}
          <div>
            <label htmlFor="correo" className="block text-sm/6 font-medium text-gray-900">
              Correo electrónico
            </label>
            <div className="mt-2">
              <input
                type="email"
                name="correo"
                id="correo"
                autoComplete="email"
                required
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-red-600 sm:text-sm/6"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label htmlFor="password" className="block text-sm/6 font-medium text-gray-900">
                Contraseña
              </label>
              <div className="text-sm">
                <a href="#" className="font-semibold text-red-600 hover:text-red-500">
                  ¿Olvidaste tu contraseña?
                </a>
              </div>
            </div>
            <div className="mt-2">
              <input
                type="password"
                name="password"
                id="password"
                autoComplete="current-password"
                required
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-red-600 sm:text-sm/6"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className="flex w-full justify-center rounded-md bg-red-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-red-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600 disabled:bg-red-300"
            >
              {loading ? "Iniciando sesión..." : "Iniciar sesión"}
            </button>
          </div>
        </form>

        <div className="mt-10 text-center">
          <a href="/register" className="font-bold text-red-600 hover:text-red-800">
            ¿Profesor Nuevo?{" "}
            <span className="text-sm font-semibold text-gray-600 hover:text-gray-900">
              Rellena el formulario para aplicar para la inscripción a la plataforma!
            </span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
