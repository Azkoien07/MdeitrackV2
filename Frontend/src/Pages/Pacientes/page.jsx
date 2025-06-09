
import { useState, useEffect } from "react"
import { toast, ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
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
    Download,
    MessageCircle,
    Stethoscope,
    TrendingUp,
    Plus,
    Edit,
    Thermometer,
    Weight,
} from "lucide-react"

const PacientesDashboard = () => {
    // Estados para manejar los datos
    const [loading, setLoading] = useState(true)
    const [appointments, setAppointments] = useState([])
    const [prescriptions, setPrescriptions] = useState([])
    const [vitals, setVitals] = useState({})
    const [doctors, setDoctors] = useState([])
    const [medicalHistory, setMedicalHistory] = useState([])
    const [notifications, setNotifications] = useState([])

    // Cargar datos de ejemplo
    useEffect(() => {
        const loadData = async () => {
            try {
                setLoading(true)
                await new Promise((resolve) => setTimeout(resolve, 1500))

                setAppointments([
                    {
                        id: 1,
                        doctor: "Dr. María González",
                        specialty: "Cardiología",
                        date: new Date("2024-12-10"),
                        time: "10:30",
                        status: "confirmada",
                        type: "Consulta de seguimiento",
                    },
                    {
                        id: 2,
                        doctor: "Dr. Carlos Ruiz",
                        specialty: "Medicina General",
                        date: new Date("2024-12-15"),
                        time: "14:00",
                        status: "pendiente",
                        type: "Consulta general",
                    },
                    {
                        id: 3,
                        doctor: "Dr. Ana López",
                        specialty: "Dermatología",
                        date: new Date("2024-12-20"),
                        time: "09:15",
                        status: "confirmada",
                        type: "Revisión anual",
                    },
                ])

                setPrescriptions([
                    {
                        id: 1,
                        medication: "Losartán 50mg",
                        dosage: "1 tableta cada 12 horas",
                        doctor: "Dr. María González",
                        startDate: new Date("2024-11-01"),
                        endDate: new Date("2024-12-31"),
                        status: "activa",
                    },
                    {
                        id: 2,
                        medication: "Omeprazol 20mg",
                        dosage: "1 cápsula en ayunas",
                        doctor: "Dr. Carlos Ruiz",
                        startDate: new Date("2024-11-15"),
                        endDate: new Date("2024-12-15"),
                        status: "activa",
                    },
                    {
                        id: 3,
                        medication: "Vitamina D3",
                        dosage: "1 tableta semanal",
                        doctor: "Dr. Ana López",
                        startDate: new Date("2024-10-01"),
                        endDate: new Date("2025-01-01"),
                        status: "activa",
                    },
                ])

                setVitals({
                    bloodPressure: { systolic: 120, diastolic: 80, date: "2024-12-05" },
                    heartRate: { value: 72, date: "2024-12-05" },
                    weight: { value: 70.5, date: "2024-12-03" },
                    height: { value: 170, date: "2024-01-15" },
                    temperature: { value: 36.5, date: "2024-12-05" },
                })

                setDoctors([
                    {
                        id: 1,
                        name: "Dr. María González",
                        specialty: "Cardiología",
                        phone: "+1 234-567-8901",
                        email: "maria.gonzalez@hospital.com",
                        location: "Consultorio 205, Piso 2",
                    },
                    {
                        id: 2,
                        name: "Dr. Carlos Ruiz",
                        specialty: "Medicina General",
                        phone: "+1 234-567-8902",
                        email: "carlos.ruiz@hospital.com",
                        location: "Consultorio 101, Piso 1",
                    },
                ])

                setMedicalHistory([
                    {
                        id: 1,
                        date: new Date("2024-11-20"),
                        type: "Consulta",
                        doctor: "Dr. María González",
                        diagnosis: "Hipertensión controlada",
                        notes: "Paciente responde bien al tratamiento actual",
                    },
                    {
                        id: 2,
                        date: new Date("2024-10-15"),
                        type: "Examen",
                        doctor: "Dr. Carlos Ruiz",
                        diagnosis: "Exámenes de rutina",
                        notes: "Todos los valores dentro de rangos normales",
                    },
                ])

                setNotifications([
                    {
                        id: 1,
                        type: "appointment",
                        title: "Cita próxima",
                        message: "Tienes una cita con Dr. María González mañana a las 10:30",
                        date: new Date(),
                        read: false,
                    },
                    {
                        id: 2,
                        type: "prescription",
                        title: "Medicamento por vencer",
                        message: "Tu prescripción de Omeprazol vence en 10 días",
                        date: new Date(),
                        read: false,
                    },
                ])

                toast.success("¡Datos cargados correctamente!", {
                    position: "top-right",
                    autoClose: 3000,
                })
            } catch (err) {
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
        return (
            <div className="fixed inset-0 bg-gradient-to-br from-slate-50 via-gray-50 to-blue-50 flex items-center justify-center z-50">
                <div className="flex flex-col items-center justify-center">
                    <div className="relative w-20 h-20 flex items-center justify-center">
                        <div className="w-20 h-20 border-4 border-slate-200 rounded-full animate-pulse"></div>
                        <div className="absolute inset-0 w-20 h-20 border-4 border-slate-500 rounded-full border-t-transparent animate-spin"></div>
                    </div>
                    <div className="mt-6 space-y-2 text-center">
                        <h3 className="text-xl font-semibold text-gray-800">Cargando Panel</h3>
                        <p className="text-gray-600">Preparando tu información médica...</p>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-blue-50">
            {/* Header */}
            <Header role="Paciente" />

            <div className="container mx-auto px-6 py-8 space-y-8">
                {/* Tarjetas de Resumen de Salud */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {/* Próxima Cita */}
                    <div className="group relative overflow-hidden bg-gradient-to-br from-blue-100 to-indigo-200 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 border border-blue-200">
                        <div className="absolute inset-0 bg-white/20 backdrop-blur-sm"></div>
                        <div className="relative p-6">
                            <div className="flex items-center justify-between mb-4">
                                <div className="p-3 bg-blue-500 rounded-xl">
                                    <Calendar className="h-6 w-6 text-white" />
                                </div>
                                <Clock className="h-5 w-5 text-blue-600" />
                            </div>
                            <div className="space-y-1">
                                <p className="text-blue-700 text-sm font-medium">Próxima Cita</p>
                                <p className="text-2xl font-bold text-blue-800">10 Dic</p>
                                <p className="text-blue-600 text-xs">Dr. María González</p>
                            </div>
                        </div>
                    </div>

                    {/* Medicamentos Activos */}
                    <div className="group relative overflow-hidden bg-gradient-to-br from-green-100 to-emerald-200 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 border border-green-200">
                        <div className="absolute inset-0 bg-white/20 backdrop-blur-sm"></div>
                        <div className="relative p-6">
                            <div className="flex items-center justify-between mb-4">
                                <div className="p-3 bg-green-500 rounded-xl">
                                    <Pill className="h-6 w-6 text-white" />
                                </div>
                                <TrendingUp className="h-5 w-5 text-green-600" />
                            </div>
                            <div className="space-y-1">
                                <p className="text-green-700 text-sm font-medium">Medicamentos</p>
                                <p className="text-2xl font-bold text-green-800">{prescriptions.length}</p>
                                <p className="text-green-600 text-xs">Activos</p>
                            </div>
                        </div>
                    </div>

                    {/* Presión Arterial */}
                    <div className="group relative overflow-hidden bg-gradient-to-br from-red-100 to-rose-200 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 border border-red-200">
                        <div className="absolute inset-0 bg-white/20 backdrop-blur-sm"></div>
                        <div className="relative p-6">
                            <div className="flex items-center justify-between mb-4">
                                <div className="p-3 bg-red-500 rounded-xl">
                                    <Heart className="h-6 w-6 text-white" />
                                </div>
                                <Activity className="h-5 w-5 text-red-600" />
                            </div>
                            <div className="space-y-1">
                                <p className="text-red-700 text-sm font-medium">Presión Arterial</p>
                                <p className="text-2xl font-bold text-red-800">
                                    {vitals.bloodPressure?.systolic}/{vitals.bloodPressure?.diastolic}
                                </p>
                                <p className="text-red-600 text-xs">mmHg</p>
                            </div>
                        </div>
                    </div>

                    {/* Peso */}
                    <div className="group relative overflow-hidden bg-gradient-to-br from-purple-100 to-violet-200 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 border border-purple-200">
                        <div className="absolute inset-0 bg-white/20 backdrop-blur-sm"></div>
                        <div className="relative p-6">
                            <div className="flex items-center justify-between mb-4">
                                <div className="p-3 bg-purple-500 rounded-xl">
                                    <Weight className="h-6 w-6 text-white" />
                                </div>
                                <TrendingUp className="h-5 w-5 text-purple-600" />
                            </div>
                            <div className="space-y-1">
                                <p className="text-purple-700 text-sm font-medium">Peso Actual</p>
                                <p className="text-2xl font-bold text-purple-800">{vitals.weight?.value}</p>
                                <p className="text-purple-600 text-xs">kg</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Próximas Citas */}
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
                    <div className="bg-gradient-to-r from-blue-400 to-indigo-500 px-8 py-6">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                                <div className="p-2 bg-white/20 rounded-lg">
                                    <Calendar className="h-6 w-6 text-white" />
                                </div>
                                <div>
                                    <h2 className="text-2xl font-bold text-white">Próximas Citas</h2>
                                    <p className="text-blue-100">Gestiona tus citas médicas</p>
                                </div>
                            </div>
                            <button
                                onClick={() =>
                                    toast.info("Función de agendar cita próximamente", {
                                        position: "top-right",
                                        autoClose: 3000,
                                    })
                                }
                                className="flex items-center space-x-2 bg-white text-blue-600 px-6 py-3 rounded-xl font-semibold hover:bg-blue-50 transition-colors shadow-lg"
                            >
                                <Plus className="h-5 w-5" />
                                <span>Agendar Cita</span>
                            </button>
                        </div>
                    </div>

                    <div className="p-8">
                        <div className="space-y-4">
                            {appointments.map((appointment, index) => (
                                <div
                                    key={appointment.id}
                                    className="group bg-gradient-to-r from-gray-50 to-blue-50 border border-gray-200 rounded-xl p-6 hover:shadow-lg hover:border-blue-300 transition-all duration-300"
                                    style={{ animationDelay: `${index * 100}ms` }}
                                >
                                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                                        <div className="flex-1">
                                            <div className="flex items-center space-x-4 mb-3">
                                                <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-xl text-white font-bold">
                                                    {formatDate(appointment.date).split("/")[0]}
                                                </div>
                                                <div>
                                                    <div className="flex items-center space-x-2">
                                                        <User className="h-4 w-4 text-gray-500" />
                                                        <span className="font-semibold text-gray-800">{appointment.doctor}</span>
                                                    </div>
                                                    <div className="flex items-center space-x-2 mt-1">
                                                        <Stethoscope className="h-4 w-4 text-gray-400" />
                                                        <span className="text-sm text-gray-600">{appointment.specialty}</span>
                                                    </div>
                                                    <div className="flex items-center space-x-2 mt-1">
                                                        <Clock className="h-4 w-4 text-gray-400" />
                                                        <span className="text-sm text-gray-600">
                                                            {formatDate(appointment.date)} - {appointment.time}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <span
                                                    className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(appointment.status)}`}
                                                >
                                                    {appointment.status}
                                                </span>
                                                <span className="text-sm text-gray-600">{appointment.type}</span>
                                            </div>
                                        </div>

                                        <div className="flex flex-wrap gap-3">
                                            <button
                                                onClick={() =>
                                                    toast.info("Función de videollamada próximamente", {
                                                        position: "top-right",
                                                        autoClose: 3000,
                                                    })
                                                }
                                                className="flex items-center space-x-2 px-4 py-2 bg-green-100 text-green-700 rounded-xl hover:bg-green-200 transition-colors"
                                            >
                                                <MessageCircle className="h-4 w-4" />
                                                <span className="font-medium">Videollamada</span>
                                            </button>
                                            <button
                                                onClick={() =>
                                                    toast.info("Función de reprogramar próximamente", {
                                                        position: "top-right",
                                                        autoClose: 3000,
                                                    })
                                                }
                                                className="flex items-center space-x-2 px-4 py-2 bg-amber-100 text-amber-700 rounded-xl hover:bg-amber-200 transition-colors"
                                            >
                                                <Edit className="h-4 w-4" />
                                                <span className="font-medium">Reprogramar</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Grid de Medicamentos y Signos Vitales */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Medicamentos */}
                    <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
                        <div className="bg-gradient-to-r from-green-400 to-emerald-500 px-6 py-4">
                            <div className="flex items-center space-x-3">
                                <div className="p-2 bg-white/20 rounded-lg">
                                    <Pill className="h-5 w-5 text-white" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-white">Medicamentos</h3>
                                    <p className="text-green-100 text-sm">Prescripciones activas</p>
                                </div>
                            </div>
                        </div>
                        <div className="p-6">
                            <div className="space-y-4">
                                {prescriptions.map((prescription) => (
                                    <div
                                        key={prescription.id}
                                        className="bg-gradient-to-r from-gray-50 to-green-50 border border-gray-200 rounded-lg p-4 hover:shadow-md transition-all duration-300"
                                    >
                                        <div className="flex items-start justify-between">
                                            <div className="flex-1">
                                                <h4 className="font-semibold text-gray-800">{prescription.medication}</h4>
                                                <p className="text-sm text-gray-600 mt-1">{prescription.dosage}</p>
                                                <p className="text-xs text-gray-500 mt-2">Dr. {prescription.doctor}</p>
                                                <div className="flex items-center space-x-2 mt-2">
                                                    <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                                                        {prescription.status}
                                                    </span>
                                                    <span className="text-xs text-gray-500">Hasta: {formatDate(prescription.endDate)}</span>
                                                </div>
                                            </div>
                                            <button
                                                onClick={() =>
                                                    toast.info("Función de renovar próximamente", {
                                                        position: "top-right",
                                                        autoClose: 3000,
                                                    })
                                                }
                                                className="text-green-600 hover:text-green-800 transition-colors"
                                            >
                                                <Download className="h-4 w-4" />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Signos Vitales */}
                    <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
                        <div className="bg-gradient-to-r from-red-400 to-rose-500 px-6 py-4">
                            <div className="flex items-center space-x-3">
                                <div className="p-2 bg-white/20 rounded-lg">
                                    <Activity className="h-5 w-5 text-white" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-white">Signos Vitales</h3>
                                    <p className="text-red-100 text-sm">Últimas mediciones</p>
                                </div>
                            </div>
                        </div>
                        <div className="p-6">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-gradient-to-r from-red-50 to-rose-50 rounded-lg p-4">
                                    <div className="flex items-center space-x-2 mb-2">
                                        <Heart className="h-4 w-4 text-red-500" />
                                        <span className="text-sm font-medium text-gray-700">Presión Arterial</span>
                                    </div>
                                    <p className="text-2xl font-bold text-red-800">
                                        {vitals.bloodPressure?.systolic}/{vitals.bloodPressure?.diastolic}
                                    </p>
                                    <p className="text-xs text-gray-500">{vitals.bloodPressure?.date}</p>
                                </div>

                                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-4">
                                    <div className="flex items-center space-x-2 mb-2">
                                        <Activity className="h-4 w-4 text-blue-500" />
                                        <span className="text-sm font-medium text-gray-700">Frecuencia Cardíaca</span>
                                    </div>
                                    <p className="text-2xl font-bold text-blue-800">{vitals.heartRate?.value}</p>
                                    <p className="text-xs text-gray-500">bpm - {vitals.heartRate?.date}</p>
                                </div>

                                <div className="bg-gradient-to-r from-purple-50 to-violet-50 rounded-lg p-4">
                                    <div className="flex items-center space-x-2 mb-2">
                                        <Weight className="h-4 w-4 text-purple-500" />
                                        <span className="text-sm font-medium text-gray-700">Peso</span>
                                    </div>
                                    <p className="text-2xl font-bold text-purple-800">{vitals.weight?.value} kg</p>
                                    <p className="text-xs text-gray-500">{vitals.weight?.date}</p>
                                </div>

                                <div className="bg-gradient-to-r from-orange-50 to-amber-50 rounded-lg p-4">
                                    <div className="flex items-center space-x-2 mb-2">
                                        <Thermometer className="h-4 w-4 text-orange-500" />
                                        <span className="text-sm font-medium text-gray-700">Temperatura</span>
                                    </div>
                                    <p className="text-2xl font-bold text-orange-800">{vitals.temperature?.value}°C</p>
                                    <p className="text-xs text-gray-500">{vitals.temperature?.date}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Mis Doctores */}
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
                    <div className="bg-gradient-to-r from-indigo-400 to-purple-500 px-8 py-6">
                        <div className="flex items-center space-x-3">
                            <div className="p-2 bg-white/20 rounded-lg">
                                <Stethoscope className="h-6 w-6 text-white" />
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold text-white">Mis Doctores</h2>
                                <p className="text-indigo-100">Información de contacto</p>
                            </div>
                        </div>
                    </div>

                    <div className="p-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {doctors.map((doctor) => (
                                <div
                                    key={doctor.id}
                                    className="bg-gradient-to-r from-gray-50 to-indigo-50 border border-gray-200 rounded-xl p-6 hover:shadow-lg hover:border-indigo-300 transition-all duration-300"
                                >
                                    <div className="flex items-start space-x-4">
                                        <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-indigo-400 to-purple-500 rounded-xl text-white font-bold">
                                            {doctor.name.split(" ")[1]?.[0] || "D"}
                                        </div>
                                        <div className="flex-1">
                                            <h4 className="font-semibold text-gray-800">{doctor.name}</h4>
                                            <p className="text-sm text-gray-600 mb-3">{doctor.specialty}</p>
                                            <div className="space-y-2">
                                                <div className="flex items-center space-x-2">
                                                    <Phone className="h-4 w-4 text-gray-400" />
                                                    <span className="text-sm text-gray-600">{doctor.phone}</span>
                                                </div>
                                                <div className="flex items-center space-x-2">
                                                    <Mail className="h-4 w-4 text-gray-400" />
                                                    <span className="text-sm text-gray-600">{doctor.email}</span>
                                                </div>
                                                <div className="flex items-center space-x-2">
                                                    <MapPin className="h-4 w-4 text-gray-400" />
                                                    <span className="text-sm text-gray-600">{doctor.location}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mt-4 flex space-x-2">
                                        <button
                                            onClick={() =>
                                                toast.info("Función de mensaje próximamente", {
                                                    position: "top-right",
                                                    autoClose: 3000,
                                                })
                                            }
                                            className="flex-1 bg-indigo-100 text-indigo-700 py-2 px-4 rounded-lg hover:bg-indigo-200 transition-colors text-sm font-medium"
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
                                            className="flex-1 bg-green-100 text-green-700 py-2 px-4 rounded-lg hover:bg-green-200 transition-colors text-sm font-medium"
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

export default PacientesDashboard