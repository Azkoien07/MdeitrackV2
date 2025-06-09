import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { Check, X } from "lucide-react";

export function useDashboardData() {
    const [pacientes, setPacientes] = useState([]);
    const [doctores, setDoctores] = useState([]);
    const [especialidades, setEspecialidades] = useState([]);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);
    const [selectedEspecialidades, setSelectedEspecialidades] = useState({});
    const userRole = "Administrador";

    useEffect(() => {
        // Simulación de carga de datos
        const loadData = async () => {
            try {
                setLoading(true);
                await new Promise((resolve) => setTimeout(resolve, 1500));

                setPacientes([
                    { id: 1, usuario: { correo: "paciente1@email.com" }, created_at: new Date("2024-01-15") },
                    { id: 2, usuario: { correo: "paciente2@email.com" }, created_at: new Date("2024-02-20") },
                    { id: 3, usuario: { correo: "paciente3@email.com" }, created_at: new Date("2024-03-10") },
                ]);

                setDoctores([
                    {
                        id: 1,
                        usuario: { correo: "doctor1@email.com" },
                        especialidades: [
                            { id: 1, nombre: "Cardiología" },
                            { id: 2, nombre: "Medicina Interna" },
                        ],
                    },
                    {
                        id: 2,
                        usuario: { correo: "doctor2@email.com" },
                        especialidades: [{ id: 3, nombre: "Pediatría" }],
                    },
                ]);

                setEspecialidades([
                    { id: 1, nombre: "Cardiología" },
                    { id: 2, nombre: "Medicina Interna" },
                    { id: 3, nombre: "Pediatría" },
                    { id: 4, nombre: "Neurología" },
                    { id: 5, nombre: "Dermatología" },
                ]);

                toast.success("¡Datos cargados correctamente!", { position: "top-right", autoClose: 3000 });
            } catch {
                setError("Error al cargar los datos");
                toast.error("Error al cargar los datos del sistema", { position: "top-right", autoClose: 5000 });
            } finally {
                setLoading(false);
            }
        };

        loadData();
    }, []);

    const handleEliminarPaciente = (id, email) => {
        const confirmToast = () => (
            <div className="flex flex-col space-y-3">
                <p className="text-gray-800 font-medium">¿Eliminar paciente?</p>
                <p className="text-sm text-gray-600">{email}</p>
                <div className="flex space-x-2 justify-end">
                    <button
                        onClick={() => {
                            setPacientes((ps) => ps.filter((p) => p.id !== id));
                            toast.dismiss();
                            toast.success("Paciente eliminado correctamente", { position: "top-right", autoClose: 3000 });
                        }}
                        className="flex items-center space-x-1 px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                    >
                        <Check className="h-4 w-4" />
                        <span>Confirmar</span>
                    </button>
                    <button
                        onClick={() => toast.dismiss()}
                        className="flex items-center space-x-1 px-3 py-1 bg-gray-400 text-white rounded-lg hover:bg-gray-500 transition-colors"
                    >
                        <X className="h-4 w-4" />
                        <span>Cancelar</span>
                    </button>
                </div>
            </div>
        );
        toast(confirmToast, {
            position: "top-center",
            autoClose: false,
            closeOnClick: false,
            draggable: false,
            className: "bg-white border border-gray-200 shadow-lg rounded-xl",
        });
    };

    const handleEliminarDoctor = (id, email) => {
        const confirmToast = () => (
            <div className="flex flex-col space-y-3">
                <p className="text-gray-800 font-medium">¿Eliminar doctor?</p>
                <p className="text-sm text-gray-600">{email}</p>
                <div className="flex space-x-2 justify-end">
                    <button
                        onClick={() => {
                            setDoctores((ds) => ds.filter((d) => d.id !== id));
                            toast.dismiss();
                            toast.success("Doctor eliminado correctamente", { position: "top-right", autoClose: 3000 });
                        }}
                        className="flex items-center space-x-1 px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                    >
                        <Check className="h-4 w-4" />
                        <span>Confirmar</span>
                    </button>
                    <button
                        onClick={() => toast.dismiss()}
                        className="flex items-center space-x-1 px-3 py-1 bg-gray-400 text-white rounded-lg hover:bg-gray-500 transition-colors"
                    >
                        <X className="h-4 w-4" />
                        <span>Cancelar</span>
                    </button>
                </div>
            </div>
        );
        toast(confirmToast, {
            position: "top-center",
            autoClose: false,
            closeOnClick: false,
            draggable: false,
            className: "bg-white border border-gray-200 shadow-lg rounded-xl",
        });
    };

    const handleAsignarEspecialidad = (doctorId) => {
        const especialidadId = selectedEspecialidades[doctorId];
        if (!especialidadId) {
            toast.warning("Por favor selecciona una especialidad", { position: "top-right", autoClose: 3000 });
            return;
        }

        const especialidad = especialidades.find((e) => e.id === Number.parseInt(especialidadId));
        if (!especialidad) return;

        setDoctores((ds) =>
            ds.map((doctor) => {
                if (doctor.id === doctorId) {
                    const yaAsignada = doctor.especialidades.some((e) => e.id === especialidad.id);
                    if (!yaAsignada) {
                        toast.success(`Especialidad "${especialidad.nombre}" asignada correctamente`, { position: "top-right", autoClose: 3000 });
                        return { ...doctor, especialidades: [...doctor.especialidades, especialidad] };
                    } else {
                        toast.info("Esta especialidad ya está asignada", { position: "top-right", autoClose: 3000 });
                    }
                }
                return doctor;
            }),
        );

        setSelectedEspecialidades((sel) => ({ ...sel, [doctorId]: "" }));
    };

    const handleDescargarReporte = (pacienteId) => {
        toast.info(`Preparando reporte del paciente #${pacienteId}...`, { position: "top-right", autoClose: 2000 });
        setTimeout(() => {
            toast.success("¡Reporte descargado exitosamente!", { position: "top-right", autoClose: 3000 });
        }, 2000);
    };

    return {
        pacientes,
        doctores,
        especialidades,
        error,
        loading,
        selectedEspecialidades,
        setSelectedEspecialidades,
        userRole,
        handleEliminarPaciente,
        handleEliminarDoctor,
        handleAsignarEspecialidad,
        handleDescargarReporte,
    };
}