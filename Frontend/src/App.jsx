import { useState, useEffect } from 'react';
import { ModalRegister } from '@components/Modals/modalRegister';
import { toast } from 'react-toastify';
import { GET_ALL_ROLES } from '@service/roleService'
import { login } from '@service/loginService';

export default function Login({ onLogin }) {
  const [rol, setRol] = useState('');
  const [roles, setRoles] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showRegister, setShowRegister] = useState(false);


  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const data = await GET_ALL_ROLES(0, 10);
        setRoles(Array.isArray(data?.data) ? data.data : []);
      } catch (error) {
        console.error("error al cargar roles:", error.message);
      }
    };
    fetchRoles();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    //  Validations
    if (!email.trim() || !password.trim()) {
      toast.error('Por favor, completa todos los campos.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error('El correo electrónico no es válido.');
      return;
    }

    if (password.length < 6) {
      toast.error('La contraseña debe tener al menos 6 caracteres.');
      return;
    }

    const commonPasswords = ['123456', 'password', '12345678'];
    if (commonPasswords.includes(password)) {
      toast.error('La contraseña es demasiado común. Usa una más segura.');
      return;
    }

    try {
      setIsLoading(true);
      const data = await login(email, password);

      localStorage.setItem("token", data.token);
      localStorage.setItem("rol", data.rol);

      toast.success("Inicio de sesión exitoso");

      // Redireccionar según el rol
      if (data.rol === "Doctor") {
        window.location.href = "/doctores";
      } else if (data.rol === "Paciente") {
        window.location.href = "/pacientes";
      } else if (data.rol === "Admin") {
        window.location.href = "/admin";
      }

    } catch (error) {
      console.error(error);
      toast.error("Credenciales inválidas o error del servidor.");
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-zinc-50 via-slate-100 to-gray-200 overflow-hidden relative">
      {/* Fondo de partículas */}
      <svg className="absolute inset-0 w-full h-full z-0" style={{ pointerEvents: 'none' }}>
        {/* Partículas principales */}
        <circle cx="12%" cy="18%" r="18" fill="#38bdf8" fillOpacity="0.22">
          <animate attributeName="cy" values="18%;38%;12%;28%;18%" dur="8s" repeatCount="indefinite" />
        </circle>
        <circle cx="80%" cy="30%" r="14" fill="#22d3ee" fillOpacity="0.20">
          <animate attributeName="cy" values="30%;50%;25%;40%;30%" dur="9s" repeatCount="indefinite" />
        </circle>
        <circle cx="60%" cy="75%" r="20" fill="#4ade80" fillOpacity="0.18">
          <animate attributeName="cy" values="75%;55%;85%;65%;75%" dur="10s" repeatCount="indefinite" />
        </circle>
        <circle cx="30%" cy="65%" r="12" fill="#0ea5e9" fillOpacity="0.19">
          <animate attributeName="cy" values="65%;55%;75%;65%" dur="7s" repeatCount="indefinite" />
        </circle>
        <circle cx="92%" cy="82%" r="16" fill="#5eead4" fillOpacity="0.17">
          <animate attributeName="cy" values="82%;92%;77%;82%" dur="11s" repeatCount="indefinite" />
        </circle>
        <circle cx="55%" cy="12%" r="10" fill="#38bdf8" fillOpacity="0.15">
          <animate attributeName="cy" values="12%;22%;7%;17%;12%" dur="6s" repeatCount="indefinite" />
        </circle>
        <circle cx="70%" cy="50%" r="15" fill="#22d3ee" fillOpacity="0.16">
          <animate attributeName="cy" values="50%;60%;40%;55%;50%" dur="8s" repeatCount="indefinite" />
        </circle>
        {/* Partículas pequeñas flotando */}
        {Array.from({ length: 30 }).map((_, i) => {
          // Distribución aleatoria de posición, tamaño y color
          const cx = `${Math.random() * 100}%`;
          const cy = `${Math.random() * 100}%`;
          const r = 3 + Math.random() * 3;
          const colors = ['#38bdf8', '#22d3ee', '#4ade80', '#0ea5e9', '#5eead4'];
          const fill = colors[Math.floor(Math.random() * colors.length)];
          const opacity = 0.10 + Math.random() * 0.10;
          const dur = 5 + Math.random() * 7;
          const cyValues = `${parseInt(cy)}%;${parseInt(cy) + 10}%;${parseInt(cy)}%`;
          return (
            <circle key={i} cx={cx} cy={cy} r={r} fill={fill} fillOpacity={opacity}>
              <animate attributeName="cy" values={cyValues} dur={`${dur}s`} repeatCount="indefinite" />
            </circle>
          );
        })}
      </svg>
      <div className="flex w-full max-w-4xl xl:max-w-6xl shadow-2xl rounded-3xl overflow-hidden border border-white/30 bg-white/90 backdrop-blur-xl relative z-10 transition-all duration-300">
        {/* Formulario login */}
        <main className="w-full xl:w-2/5 p-6 sm:p-10 md:p-12 xl:p-16 relative z-10 flex flex-col justify-center min-h-[60vh] sm:min-h-[55vh] md:min-h-[50vh] lg:min-h-[45vh] xl:min-h-[40vh] max-h-[90vh]">
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br from-zinc-300 to-slate-400 rounded-xl shadow-lg mb-4 relative overflow-hidden">
              <svg className="w-7 h-7 text-white relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-700 tracking-tight">MediTrack</h1>
            <p className="text-slate-500 text-base sm:text-base mt-1">Bienvenido de vuelta</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-base font-semibold text-gray-700 mb-2">Rol</label>
              <select
                value={rol}
                onChange={(e) => setRol(e.target.value)}
                className="w-full px-4 py-2.5 bg-white/95 border border-slate-200 rounded-3xl focus:outline-none focus:ring-2 focus:ring-gray-300 placeholder:text-slate-400 text-gray-700 text-base sm:text-lg shadow-sm"
              >
                <option value="" disabled> Selecciona tu rol</option>
                {Array.isArray(roles) && roles.map((rolItem) => (
                  <option key={rolItem.id} value={rolItem.rol}>
                    {rolItem.rol}
                  </option>
                ))}

              </select>
            </div>
            <div>
              <label className="block text-base font-semibold text-gray-700 mb-2">Correo electrónico</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2.5 bg-white/95 border border-slate-200 rounded-3xl focus:outline-none focus:ring-2 focus:ring-gray-300 placeholder:text-slate-400 text-gray-700 text-base sm:text-lg shadow-sm"
                placeholder="tu@email.com"
                autoFocus
              />
            </div>

            <div>
              <label className="block text-base font-semibold text-gray-700 mb-2">Contraseña</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2.5 bg-white/95 border border-slate-200 rounded-3xl focus:outline-none focus:ring-2 focus:ring-gray-300 placeholder:text-slate-400 text-gray-700 text-base sm:text-lg shadow-sm"
                placeholder="••••••••"
              />
            </div>

            <div className="flex items-center justify-end text-sm">
              <button type="button" className="text-gray-500 hover:underline font-medium">¿Olvidaste tu contraseña?</button>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-zinc-400 via-slate-400 to-gray-500 hover:from-slate-500 hover:to-zinc-600 text-white font-bold py-2.5 px-4 rounded-3xl text-base sm:text-lg shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Iniciando sesión...' : 'Iniciar sesión'}
            </button>
          </form>

          <p className="text-center mt-5 text-base text-slate-500">
            ¿No tienes una cuenta?{' '}
            <button type="button" onClick={() => setShowRegister(true)} className="text-gray-700 hover:underline font-semibold">Registrarse</button>
          </p>
          {showRegister && (
            <ModalRegister
              roles={roles.filter(r => r.rol !== 'Admin')}
              onRegister={() => setShowRegister(false)}
              onClose={() => setShowRegister(false)}
            />
          )}
        </main>

        {/* Imagen a la derecha */}
        <aside
          className="hidden xl:block w-3/5 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1920&q=80')"
          }}
        ></aside>
      </div>
    </div>
  );
}