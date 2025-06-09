import Header from '@components/header'
import StatCard from '@components/StatCard'
import ManagementSection from '@components/ManagementSection'
import PacienteCard from '@components/PacienteCard'
import DoctorCard from '@components/DoctorCard'
import { useDashboardData } from '@hooks/useAdminData'
import { LoadingSpinner } from '@components/LoadingSpinner'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import {
    Plus,
    UserCheck,
    Users,
    Stethoscope,
    AlertCircle,
} from "lucide-react"

const AdminDashboard = () => {
    const {
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
    } = useDashboardData();

    if (loading) return <LoadingSpinner />;

    if (error) return <div className="text-red-500 text-center mt-6">{error}</div>;
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-blue-50">
            {/* Header */}
            <Header role={userRole} />

            <div className="container mx-auto px-6 py-8 space-y-8">
                {/* Error Alert */}
                {error && (
                    <div className="bg-gradient-to-r from-red-50 to-rose-50 border-l-4 border-red-400 rounded-lg p-4 shadow-sm">
                        <div className="flex items-center">
                            <div className="p-2 bg-red-100 rounded-full mr-3">
                                <AlertCircle className="h-5 w-5 text-red-600" />
                            </div>
                            <div>
                                <h4 className="font-medium text-red-800">Error del Sistema</h4>
                                <p className="text-red-700 text-sm">{error}</p>
                            </div>
                        </div>
                    </div>
                )}

                {/* Tarjetas de Estadísticas */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <StatCard
                        icon={Users}
                        title="Pacientes Registrados"
                        value={pacientes.length}
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
                        value={doctores.length}
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

                {/* Sección de Pacientes */}
                <ManagementSection
                    title="Gestión de Pacientes"
                    description="Administra la información de pacientes"
                    icon={<Users className="h-6 w-6 text-white" />}
                    headerColor="bg-gradient-to-r from-emerald-400 to-teal-500"
                    items={pacientes}
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

                {/* Sección de Doctores */}
                <ManagementSection
                    title="Gestión de Doctores"
                    description="Administra doctores y especialidades"
                    icon={<Stethoscope className="h-6 w-6 text-white" />}
                    headerColor="bg-gradient-to-r from-blue-400 to-indigo-500"
                    items={doctores}
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
            {/* Toast Container */}
            <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                className="mt-16"
            />
        </div>
    )
}
export default AdminDashboard