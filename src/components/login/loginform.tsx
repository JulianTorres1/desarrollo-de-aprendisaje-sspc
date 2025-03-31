'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import LogoSalesianos from '../../../public/imgs/LogoSalesianos.png';

const LoginForm = () => {
    const router = useRouter();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        const formData = new FormData(e.currentTarget);
        const email = formData.get('email');
        const password = formData.get('password');

        try {
            const result = await signIn('credentials', {
                correo: email,
                password: password,
                redirect: false,
            });

            if (result?.error) {
                setError('Credenciales inválidas');
                return;
            }

            router.push('/dashboard'); // Redirige al dashboard después del login exitoso
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (error) {
            setError('Error al iniciar sesión');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex min-h-full flex-col justify-center px-6 py-0 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <span className="flex justify-center ">
                    <Image 
                        className="w-[25%] h-[25%]" 
                        src={LogoSalesianos} 
                        alt="Logo Salesianos Cartagena"
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
                        <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">
                            Correo electrónico
                        </label>
                        <div className="mt-2">
                            <input 
                                type="email" 
                                name="email" 
                                id="email" 
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

                <p className="mt-10 text-center font-bold text-red-600 hover:text-red-500">
                    ¿Profesor Nuevo?{' '}
                    <a href="#" className="text-sm/6 font-semibold text-gray-600 hover:text-gray-900">
                        Rellena el formulario para aplicar para la inscripción a la plataforma!
                    </a>
                </p>
            </div>
        </div>
    );
};

export default LoginForm;