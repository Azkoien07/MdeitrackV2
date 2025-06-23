import { useEffect, useState } from 'react'
import Header from '@components/header'
import StatCard from '@components/StatCard'
import ManagementSection from '@components/ManagementSection'
import PacienteCard from '@components/PacienteCard'
import DoctorCard from '@components/DoctorCard'
import { useDashboardData } from '@hooks/useAdminData'
import { LoadingSpinner } from '@components/LoadingSpinner'
import { toast } from 'react-toastify'
import { Plus, UserCheck, Users, Stethoscope, AlertCircle } from "lucide-react"
import { GET_ALL_PATIENTS } from '@service/patientService'
import { GET_ALL_DOCTORS } from '@/Service/doctorService'

const AdminDashboard = () => {
    const [patients, setPatients] = useState([]);
    const [doctors, setDoctors] = useState([]);
    const [loadingData, setLoadingData] = useState(true);
    const [fetchError, setFetchError] = useState(null);

    const {
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
    } = useDashboardData();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [patientsRes, doctorsRes] = await Promise.all([
                    GET_ALL_PATIENTS(0, 10),
                    GET_ALL_DOCTORS(0, 10)
                ]);
                setPatients(Array.isArray(patientsRes?.data) ? patientsRes.data : []);
                setDoctors(Array.isArray(doctorsRes?.data) ? doctorsRes.data : []);
            } catch (error) {
                console.error("Error al cargar datos:", error.message || error);
                setFetchError("No se pudo cargar pacientes o doctores.");
            } finally {
                setLoadingData(false);
            }
        };
        fetchData();
    }, []);

    if (loading || loadingData) return <LoadingSpinner />;

    if (error || fetchError) {
        return (
            <div className="text-red-500 text-center mt-6">
                {error || fetchError}
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-blue-50">
            <Header role={userRole} />

            <div className="container mx-auto px-6 py-8 space-y-8">
                {/* Estadísticas */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <StatCard
                        icon={Users}
                        title="Pacientes Registrados"
                        value={patients.length}
                        subtitle="+12% este mes"
                        bgFrom="from-emerald-100"
                        bgTo="to-teal-200"
                        iconBg="bg-emerald-500"
                        textColor="text-emerald-800"
                        borderColor="border-emerald-200"
                        trendColor="text-emerald-600"
                    />

                    <StatCard
                        icon={UserCheck}
                        title="Doctores Activos"
                        value={doctors.length}
                        subtitle="+5% este mes"
                        bgFrom="from-blue-100"
                        bgTo="to-indigo-200"
                        iconBg="bg-blue-500"
                        textColor="text-blue-800"
                        borderColor="border-blue-200"
                        trendColor="text-blue-600"
                    />

                    <StatCard
                        icon={Stethoscope}
                        title="Especialidades"
                        value={especialidades.length}
                        subtitle="Disponibles"
                        bgFrom="from-purple-100"
                        bgTo="to-violet-200"
                        iconBg="bg-purple-500"
                        textColor="text-purple-800"
                        borderColor="border-purple-200"
                        trendColor="text-purple-600"
                    />
                </div>

                {/* Pacientes */}
                <ManagementSection
                    title="Gestión de Pacientes"
                    description="Administra la información de pacientes"
                    icon={<Users className="h-6 w-6 text-white" />}
                    headerColor="bg-gradient-to-r from-emerald-400 to-teal-500"
                    items={patients}
                    itemCountLabel="registrados"
                    renderItem={(paciente, index) => (
                        <PacienteCard
                            key={paciente.id}
                            paciente={paciente}
                            index={index}
                            onDescargar={handleDescargarReporte}
                            onEliminar={handleEliminarPaciente}
                        />
                    )}
                />

                {/* Doctores */}
                <ManagementSection
                    title="Gestión de Doctores"
                    description="Administra doctores y especialidades"
                    icon={<Stethoscope className="h-6 w-6 text-white" />}
                    headerColor="bg-gradient-to-r from-blue-400 to-indigo-500"
                    items={doctors}
                    itemCountLabel="registrados"
                    rightHeaderContent={
                        <button
                            onClick={() =>
                                toast.info("Función de agregar doctor próximamente", {
                                    position: "top-right",
                                    autoClose: 3000,
                                })
                            }
                            className="flex items-center space-x-2 bg-white text-blue-600 px-6 py-3 rounded-xl font-semibold hover:bg-blue-50 transition-colors shadow-lg"
                        >
                            <Plus className="h-5 w-5" />
                            <span>Agregar Doctor</span>
                        </button>
                    }
                    renderItem={(doctor, index) => (
                        <DoctorCard
                            key={doctor.id}
                            doctor={doctor}
                            index={index}
                            especialidades={especialidades}
                            selectedEspecialidades={selectedEspecialidades}
                            onSelectEspecialidad={(id, value) =>
                                setSelectedEspecialidades({ ...selectedEspecialidades, [id]: value })
                            }
                            onAsignarEspecialidad={handleAsignarEspecialidad}
                            onEliminar={handleEliminarDoctor}
                            onEditar={() =>
                                toast.info("Función de editar próximamente", {
                                    position: "top-right",
                                    autoClose: 3000,
                                })
                            }
                        />
                    )}
                />
            </div>
        </div>
    )
}

export default AdminDashboard;
