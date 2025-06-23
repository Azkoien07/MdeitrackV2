import { useState, useRef } from 'react';
import { toast } from 'react-toastify';
import { ADD_USER } from '@service/userService';
import { ADD_PATIENT } from '@service/patientService';

export function ModalRegister({ roles = [], onRegister, onClose }) {
    const [email, setEmail] = useState('');
    const [rol, setRol] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const emailInputRef = useRef(null);

    // Datos de paciente
    const [name, setName] = useState('');
    const [lastname, setLastname] = useState('');
    const [identification, setIdentification] = useState('');
    const [phone, setPhone] = useState('');
    const [age, setAge] = useState('');
    const [birthdate, setBirthdate] = useState('');
    const [eps, setEps] = useState('');
    const [genres, setGenres] = useState('');
    const [typeIdentification, setTypeIdentification] = useState('');

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

        try {
            const userDto = { email, password, role: { id: Number(rol) } };
            console.log("Datos enviados al backend:", userDto)
            const res = await ADD_USER(userDto);
            console.log("Respuesta de ADD_USER:", res);
            if (res?.code === "200" || res?.code === 200) {
                const userId = res.id;


                if (rol === "3") {
                    const patientDto = {
                        name,
                        lastname,
                        identification,
                        phone,
                        age: parseInt(age),
                        birthdate,
                        eps,
                        genres,
                        typeIdentification,
                        user: { id: userId }
                    };


                    console.log("🧾 Payload a /patient/add:", patientDto);
                    const patientRes = await ADD_PATIENT(patientDto);

                    if (patientRes?.code === "200") {
                        toast.success("Paciente registrado correctamente");
                    } else {
                        toast.error("Error al registrar al paciente");
                    }
                }

                toast.success('Usuario creado correctamente');
                onRegister?.();
            } else {
                toast.error(res?.message || 'Error al crear el usuario');
            }
        } catch (error) {
            console.error('Error al registrar:', error)
            toast.error('Ocurrió un error al registrar el usuario');
        } finally {
            setTimeout(() => {
                setIsLoading(false);
            }, 5000);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-2 overflow-y-auto">
            <div className="absolute inset-0" onClick={onClose} />
            <form
                onSubmit={handleSubmit}
                className="relative z-10 w-full max-w-3xl rounded-2xl bg-white shadow-2xl p-6 sm:p-10 transition-all duration-300 scale-100 animate-fade-in"
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

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    <div className="sm:col-span-2 md:col-span-3">
                        <label className="block text-base font-semibold text-gray-700 mb-2">Rol</label>
                        <select
                            value={rol}
                            onChange={(e) => setRol(e.target.value)}
                            className="w-full px-4 py-2.5 bg-white/95 border border-slate-200 rounded-3xl focus:outline-none focus:ring-2 focus:ring-gray-300 text-gray-700 text-base sm:text-lg shadow-sm"
                        >
                            <option value="" disabled>Selecciona tu rol</option>
                            {roles.map((role) => (
                                <option key={role.id} value={role.id}>{role.rol}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Correo electrónico</label>
                        <input
                            ref={emailInputRef}
                            type="email"
                            id="email"
                            autoComplete="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Contraseña</label>
                        <input
                            type="password"
                            id="password"
                            autoComplete="new-password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <label htmlFor="confirm" className="block text-sm font-medium text-gray-700 mb-1">Confirmar contraseña</label>
                        <input
                            type="password"
                            id="confirm"
                            autoComplete="new-password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    {rol === "3" && (
                        <>
                            <div><label className="block text-sm text-gray-700">Nombre</label><input type="text" value={name} onChange={(e) => setName(e.target.value)} className="w-full p-2 border rounded" /></div>
                            <div><label className="block text-sm text-gray-700">Apellido</label><input type="text" value={lastname} onChange={(e) => setLastname(e.target.value)} className="w-full p-2 border rounded" /></div>
                            <div><label className="block text-sm text-gray-700">Identificación</label><input type="text" value={identification} onChange={(e) => setIdentification(e.target.value)} className="w-full p-2 border rounded" /></div>
                            <div><label className="block text-sm text-gray-700">Teléfono</label><input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} className="w-full p-2 border rounded" /></div>
                            <div><label className="block text-sm text-gray-700">Edad</label><input type="number" value={age} onChange={(e) => setAge(e.target.value)} className="w-full p-2 border rounded" /></div>
                            <div><label className="block text-sm text-gray-700">Fecha de nacimiento</label><input type="date" value={birthdate} onChange={(e) => setBirthdate(e.target.value)} className="w-full p-2 border rounded" /></div>
                            <div><label className="block text-sm text-gray-700">EPS</label><input type="text" value={eps} onChange={(e) => setEps(e.target.value)} className="w-full p-2 border rounded" /></div>
                            <div>
                                <label className="block text-sm text-gray-700">Género</label>
                                <select value={genres} onChange={(e) => setGenres(e.target.value)} className="w-full p-2 border rounded">
                                    <option value="">Selecciona</option>
                                    <option value="Masculino">Masculino</option>
                                    <option value="Femenino">Femenino</option>
                                    <option value="Otro">Otro</option>
                                </select>

                            </div>
                            <div>
                                <label className="block text-sm text-gray-700">Tipo de identificación
                                    <select value={typeIdentification} onChange={(e) => setTypeIdentification(e.target.value)} className="w-full p-2 border rounded">
                                        <option value="">Selecciona</option>
                                        <option value="CC">CC</option>
                                        <option value="TI">TI</option>
                                        <option value="CE">CE</option>
                                        <option value="PASAPORTE">PASAPORTE</option>
                                    </select>
                                </label>
                            </div>
                        </>
                    )}
                </div>

                <button
                    type="submit"
                    disabled={isLoading}
                    className={`mt-6 w-full py-3 rounded-lg text-white font-semibold bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 transition-all duration-200 ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
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
        </div>
    );
}
