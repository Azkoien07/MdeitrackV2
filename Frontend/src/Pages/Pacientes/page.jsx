import { useState, useEffect } from "react"
import { toast } from "react-toastify"
import { AppointmentModal } from "@components/Modals/modalAppointment"
import { LoadingSpinner } from '@components/LoadingSpinner'
import { GET_ALL_DOCTORS } from '@service/doctorService'
import { GET_USER_BY_ID } from '@service/userService'

import Header from "@components/header"
import {
    Calendar,
    Clock,
    Heart,
    Activity,
    Pill,
    User,
    Phone,
    Mail,
    MapPin,
    MessageCircle,
    Stethoscope,
    TrendingUp,
    Plus,
    Edit,
    Weight,
} from "lucide-react"

const PacientesDashboard = () => {
    // Estados para manejar los datos
    const [loading, setLoading] = useState(true)
    const [appointments, setAppointments] = useState([])
    const [prescriptions, setPrescriptions] = useState([])
    const [vitals, setVitals] = useState({})
    const [doctors, setDoctors] = useState([])
    const [isModalOpen, setIsModalOpen] = useState(false)

    useEffect(() => {
        const loadData = async () => {
            try {
                // Esperar 2 segundos artificialmente
                await new Promise((res) => setTimeout(res, 2000))

                const response = await GET_ALL_DOCTORS(0, 100)

                // Guardar doctores si vienen correctamente
                setDoctors(Array.isArray(response?.data) ? response.data : [])

                toast.success("¡Datos cargados correctamente!", {
                    position: "top-right",
                    autoClose: 3000,
                })
            } catch (err) {
                console.error("Error al cargar los datos", err)
                toast.error("Error al cargar los datos", {
                    position: "top-right",
                    autoClose: 5000,
                })
            } finally {
                setLoading(false)
            }
        }

        loadData()
    }, [])


    const handleAppointmentSubmit = (formData) => {
        const newAppointment = {
            id: appointments.length + 1,
            doctor: formData.doctor,
            specialty: getSpecialtyByDoctor(formData.doctor),
            date: new Date(formData.date),
            time: formData.time,
            status: "pendiente",
            type: formData.reason || "Consulta general",
        }

        setAppointments((prev) => [...prev, newAppointment])
        toast.success("¡Cita agendada exitosamente!", {
            position: "top-right",
            autoClose: 3000,
        })
    }

    const getSpecialtyByDoctor = (doctorName) => {
        const specialties = {
            "Dr. María González": "Cardiología",
            "Dr. Carlos Ruiz": "Medicina General",
            "Dr. Ana López": "Dermatología",
        }
        return specialties[doctorName] || "Medicina General"
    }

    const formatDate = (date) => {
        return new Intl.DateTimeFormat("es-ES", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
        }).format(date)
    }

    const getStatusColor = (status) => {
        switch (status) {
            case "confirmada":
                return "bg-green-100 text-green-800"
            case "pendiente":
                return "bg-yellow-100 text-yellow-800"
            case "cancelada":
                return "bg-red-100 text-red-800"
            default:
                return "bg-gray-100 text-gray-800"
        }
    }

    if (loading) {
        return <LoadingSpinner />;
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-blue-50">
            {/* Header */}
            <Header role="Paciente" />

            <div className="container mx-auto px-4 sm:px-6 py-4 sm:py-8 space-y-6 sm:space-y-8">
                {/* Tarjetas de Resumen de Salud */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
                    {/* Próxima Cita */}
                    <div className="group relative overflow-hidden bg-gradient-to-br from-blue-100 to-indigo-200 rounded-xl sm:rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 border border-blue-200">
                        <div className="absolute inset-0 bg-white/20 backdrop-blur-sm"></div>
                        <div className="relative p-3 sm:p-6">
                            <div className="flex items-center justify-between mb-2 sm:mb-4">
                                <div className="p-2 sm:p-3 bg-blue-500 rounded-lg sm:rounded-xl">
                                    <Calendar className="h-4 w-4 sm:h-6 sm:w-6 text-white" />
                                </div>
                                <Clock className="h-3 w-3 sm:h-5 sm:w-5 text-blue-600" />
                            </div>
                            <div className="space-y-1">
                                <p className="text-blue-700 text-xs sm:text-sm font-medium">Próxima Cita</p>
                                <p className="text-lg sm:text-2xl font-bold text-blue-800">10 Dic</p>
                                <p className="text-blue-600 text-xs hidden sm:block">Dr. María González</p>
                            </div>
                        </div>
                    </div>

                    {/* Medicamentos Activos */}
                    <div className="group relative overflow-hidden bg-gradient-to-br from-green-100 to-emerald-200 rounded-xl sm:rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 border border-green-200">
                        <div className="absolute inset-0 bg-white/20 backdrop-blur-sm"></div>
                        <div className="relative p-3 sm:p-6">
                            <div className="flex items-center justify-between mb-2 sm:mb-4">
                                <div className="p-2 sm:p-3 bg-green-500 rounded-lg sm:rounded-xl">
                                    <Pill className="h-4 w-4 sm:h-6 sm:w-6 text-white" />
                                </div>
                                <TrendingUp className="h-3 w-3 sm:h-5 sm:w-5 text-green-600" />
                            </div>
                            <div className="space-y-1">
                                <p className="text-green-700 text-xs sm:text-sm font-medium">Medicamentos</p>
                                <p className="text-lg sm:text-2xl font-bold text-green-800">{prescriptions.length}</p>
                                <p className="text-green-600 text-xs">Activos</p>
                            </div>
                        </div>
                    </div>

                    {/* Presión Arterial */}
                    <div className="group relative overflow-hidden bg-gradient-to-br from-red-100 to-rose-200 rounded-xl sm:rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 border border-red-200">
                        <div className="absolute inset-0 bg-white/20 backdrop-blur-sm"></div>
                        <div className="relative p-3 sm:p-6">
                            <div className="flex items-center justify-between mb-2 sm:mb-4">
                                <div className="p-2 sm:p-3 bg-red-500 rounded-lg sm:rounded-xl">
                                    <Heart className="h-4 w-4 sm:h-6 sm:w-6 text-white" />
                                </div>
                                <Activity className="h-3 w-3 sm:h-5 sm:w-5 text-red-600" />
                            </div>
                            <div className="space-y-1">
                                <p className="text-red-700 text-xs sm:text-sm font-medium">Presión</p>
                                <p className="text-sm sm:text-2xl font-bold text-red-800">
                                    {vitals.bloodPressure?.systolic}/{vitals.bloodPressure?.diastolic}
                                </p>
                                <p className="text-red-600 text-xs">mmHg</p>
                            </div>
                        </div>
                    </div>

                    {/* Peso */}
                    <div className="group relative overflow-hidden bg-gradient-to-br from-purple-100 to-violet-200 rounded-xl sm:rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 border border-purple-200">
                        <div className="absolute inset-0 bg-white/20 backdrop-blur-sm"></div>
                        <div className="relative p-3 sm:p-6">
                            <div className="flex items-center justify-between mb-2 sm:mb-4">
                                <div className="p-2 sm:p-3 bg-purple-500 rounded-lg sm:rounded-xl">
                                    <Weight className="h-4 w-4 sm:h-6 sm:w-6 text-white" />
                                </div>
                                <TrendingUp className="h-3 w-3 sm:h-5 sm:w-5 text-purple-600" />
                            </div>
                            <div className="space-y-1">
                                <p className="text-purple-700 text-xs sm:text-sm font-medium">Peso</p>
                                <p className="text-lg sm:text-2xl font-bold text-purple-800">{vitals.weight?.value}</p>
                                <p className="text-purple-600 text-xs">kg</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Próximas Citas */}
                <div className="bg-white rounded-xl sm:rounded-2xl shadow-xl overflow-hidden border border-gray-100">
                    <div className="bg-gradient-to-r from-blue-400 to-indigo-500 px-4 sm:px-8 py-4 sm:py-6">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                            <div className="flex items-center space-x-3">
                                <div className="p-2 bg-white/20 rounded-lg">
                                    <Calendar className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                                </div>
                                <div>
                                    <h2 className="text-xl sm:text-2xl font-bold text-white">Próximas Citas</h2>
                                    <p className="text-blue-100 text-sm hidden sm:block">Gestiona tus citas médicas</p>
                                </div>
                            </div>
                            <button
                                onClick={() => setIsModalOpen(true)}
                                className="flex items-center justify-center space-x-2 bg-white text-blue-600 px-4 sm:px-6 py-2 sm:py-3 rounded-lg sm:rounded-xl font-semibold hover:bg-blue-50 transition-colors shadow-lg text-sm sm:text-base"
                            >
                                <Plus className="h-4 w-4 sm:h-5 sm:w-5" />
                                <span className="hidden sm:inline">Agendar Cita</span>
                                <span className="sm:hidden">Agendar</span>
                            </button>
                        </div>
                    </div>

                    <div className="p-4 sm:p-8">
                        <div className="space-y-4">
                            {appointments.map((appointment, index) => (
                                <div
                                    key={appointment.id}
                                    className="group bg-gradient-to-r from-gray-50 to-blue-50 border border-gray-200 rounded-lg sm:rounded-xl p-4 sm:p-6 hover:shadow-lg hover:border-blue-300 transition-all duration-300"
                                    style={{ animationDelay: `${index * 100}ms` }}
                                >
                                    <div className="flex flex-col space-y-4">
                                        <div className="flex-1">
                                            <div className="flex items-start space-x-3 sm:space-x-4 mb-3">
                                                <div className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-lg sm:rounded-xl text-white font-bold text-sm sm:text-base">
                                                    {formatDate(appointment.date).split("/")[0]}
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <div className="flex items-center space-x-2 mb-1">
                                                        <User className="h-3 w-3 sm:h-4 sm:w-4 text-gray-500 flex-shrink-0" />
                                                        <span className="font-semibold text-gray-800 text-sm sm:text-base truncate">
                                                            {appointment.doctor?.name} {appointment.doctor?.lastname}
                                                        </span>
                                                    </div>
                                                    <div className="flex items-center space-x-2 mb-1">
                                                        <Stethoscope className="h-3 w-3 sm:h-4 sm:w-4 text-gray-400 flex-shrink-0" />
                                                        <span className="text-xs sm:text-sm text-gray-600 truncate">
                                                            {appointment.specialties?.name || "Sin especialidad"}
                                                        </span>
                                                    </div>
                                                    <div className="flex items-center space-x-2">
                                                        <Clock className="h-3 w-3 sm:h-4 sm:w-4 text-gray-400 flex-shrink-0" />
                                                        <span className="text-xs sm:text-sm text-gray-600">
                                                            {formatDate(appointment.date)} - {appointment.time}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="flex flex-wrap items-center gap-2">
                                                <span className={`px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium ${getStatusColor(appointment.state)}`}>
                                                    {appointment.state}
                                                </span>
                                                <span className="text-xs sm:text-sm text-gray-600 truncate">{appointment.type}</span>
                                            </div>
                                        </div>

                                        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                                            <button
                                                onClick={() =>
                                                    toast.info("Función de videollamada próximamente", {
                                                        position: "top-right",
                                                        autoClose: 3000,
                                                    })
                                                }
                                                className="flex items-center justify-center space-x-2 px-3 sm:px-4 py-2 bg-green-100 text-green-700 rounded-lg sm:rounded-xl hover:bg-green-200 transition-colors text-sm"
                                            >
                                                <MessageCircle className="h-3 w-3 sm:h-4 sm:w-4" />
                                                <span className="font-medium">Videollamada</span>
                                            </button>
                                            <button
                                                onClick={() =>
                                                    toast.info("Función de reprogramar próximamente", {
                                                        position: "top-right",
                                                        autoClose: 3000,
                                                    })
                                                }
                                                className="flex items-center justify-center space-x-2 px-3 sm:px-4 py-2 bg-amber-100 text-amber-700 rounded-lg sm:rounded-xl hover:bg-amber-200 transition-colors text-sm"
                                            >
                                                <Edit className="h-3 w-3 sm:h-4 sm:w-4" />
                                                <span className="font-medium">Reprogramar</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}

                        </div>
                    </div>
                </div>

                {/* Mis Doctores */}
                <div className="bg-white rounded-xl sm:rounded-2xl shadow-xl overflow-hidden border border-gray-100">
                    <div className="bg-gradient-to-r from-indigo-400 to-purple-500 px-4 sm:px-8 py-4 sm:py-6">
                        <div className="flex items-center space-x-3">
                            <div className="p-2 bg-white/20 rounded-lg">
                                <Stethoscope className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                            </div>
                            <div>
                                <h2 className="text-xl sm:text-2xl font-bold text-white">Mis Doctores</h2>
                                <p className="text-indigo-100 text-sm hidden sm:block">Información de contacto</p>
                            </div>
                        </div>
                    </div>

                    <div className="p-4 sm:p-8">
                        <div className="grid grid-cols-1 gap-4 sm:gap-6">
                            {doctors.map((doctor) => (
                                <div
                                    key={doctor.id}
                                    className="bg-gradient-to-r from-gray-50 to-indigo-50 border border-gray-200 rounded-lg sm:rounded-xl p-4 sm:p-6 hover:shadow-lg hover:border-indigo-300 transition-all duration-300"
                                >
                                    <div className="flex flex-col sm:flex-row sm:items-start space-y-3 sm:space-y-0 sm:space-x-4">
                                        <div className="flex items-center space-x-3 sm:space-x-0 sm:block">
                                            <div className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-indigo-400 to-purple-500 rounded-lg sm:rounded-xl text-white font-bold text-sm sm:text-base">
                                                {doctor.name.split(" ")[1]?.[0] || "D"}
                                            </div>
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <h4 className="font-semibold text-gray-800 text-sm sm:text-base">{doctor.name}</h4>
                                            <p className="text-xs sm:text-sm text-gray-600 mb-2 sm:mb-3">{doctor.specialty}</p>
                                            <div className="space-y-1 sm:space-y-2">
                                                <div className="flex items-center space-x-2">
                                                    <Phone className="h-3 w-3 sm:h-4 sm:w-4 text-gray-400 flex-shrink-0" />
                                                    <span className="text-xs sm:text-sm text-gray-600 truncate">{doctor.phone}</span>
                                                </div>
                                                <div className="flex items-center space-x-2">
                                                    <Mail className="h-3 w-3 sm:h-4 sm:w-4 text-gray-400 flex-shrink-0" />
                                                    <span className="text-xs sm:text-sm text-gray-600 truncate">{doctor.email}</span>
                                                </div>
                                                <div className="flex items-center space-x-2">
                                                    <MapPin className="h-3 w-3 sm:h-4 sm:w-4 text-gray-400 flex-shrink-0" />
                                                    <span className="text-xs sm:text-sm text-gray-600">{doctor.location}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mt-3 sm:mt-4 flex flex-col sm:flex-row gap-2">
                                        <button
                                            onClick={() =>
                                                toast.info("Función de mensaje próximamente", {
                                                    position: "top-right",
                                                    autoClose: 3000,
                                                })
                                            }
                                            className="flex-1 bg-indigo-100 text-indigo-700 py-2 px-3 sm:px-4 rounded-lg hover:bg-indigo-200 transition-colors text-xs sm:text-sm font-medium"
                                        >
                                            Enviar Mensaje
                                        </button>
                                        <button
                                            onClick={() =>
                                                toast.info("Función de llamada próximamente", {
                                                    position: "top-right",
                                                    autoClose: 3000,
                                                })
                                            }
                                            className="flex-1 bg-green-100 text-green-700 py-2 px-3 sm:px-4 rounded-lg hover:bg-green-200 transition-colors text-xs sm:text-sm font-medium"
                                        >
                                            Llamar
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal de Agendar Cita */}
            <AppointmentModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSubmit={handleAppointmentSubmit} />
        </div>
    )
}

export default PacientesDashboard