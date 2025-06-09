import { useState, useEffect, useRef } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export function ModalRegister({ onRegister, onClose }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const emailInputRef = useRef(null);

    useEffect(() => {
        emailInputRef.current?.focus();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!email || !password || !confirmPassword) {
            toast.error('Por favor, completa todos los campos.');
            return;
        }
        if (password !== confirmPassword) {
            toast.error('Las contraseñas no coinciden.');
            return;
        }

        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
            onRegister?.({ email, password });
        }, 1500);
    };

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4 sm:px-0"
            role="dialog"
            aria-modal="true"
        >
            <div className="absolute inset-0" onClick={onClose} />

            <form
                onSubmit={handleSubmit}
                className="relative z-10 w-full max-w-md rounded-2xl bg-white shadow-2xl p-8 sm:p-10 transition-all duration-300 scale-100 animate-fade-in"
            >
                <button
                    type="button"
                    onClick={onClose}
                    className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 text-2xl"
                    aria-label="Cerrar"
                >
                    &times;
                </button>

                <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 text-center mb-2">
                    Crear cuenta
                </h2>
                <p className="text-sm text-gray-500 text-center mb-6">
                    Únete y comienza a gestionar tu salud de forma segura.
                </p>

                <div className="space-y-4">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                            Correo electrónico
                        </label>
                        <input
                            ref={emailInputRef}
                            type="email"
                            id="email"
                            autoComplete="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                            Contraseña
                        </label>
                        <input
                            type="password"
                            id="password"
                            autoComplete="new-password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                        />
                    </div>
                    <div>
                        <label htmlFor="confirm" className="block text-sm font-medium text-gray-700 mb-1">
                            Confirmar contraseña
                        </label>
                        <input
                            type="password"
                            id="confirm"
                            autoComplete="new-password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                        />
                    </div>
                </div>

                <button
                    type="submit"
                    disabled={isLoading}
                    className={`mt-6 w-full py-3 rounded-lg text-white font-semibold bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 transition-all duration-200 ${isLoading ? 'opacity-50 cursor-not-allowed' : ''
                        }`}
                >
                    {isLoading ? 'Registrando...' : 'Registrarse'}
                </button>

                <p className="mt-5 text-center text-sm text-gray-500">
                    ¿Ya tienes una cuenta?{' '}
                    <button
                        type="button"
                        onClick={onClose}
                        className="text-blue-600 hover:underline font-medium"
                    >
                        Inicia sesión
                    </button>
                </p>
            </form>

            <ToastContainer position="top-right" />
        </div>
    );
}
