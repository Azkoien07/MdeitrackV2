import { useState, useEffect } from "react"
import { toast } from "react-toastify"
import { LoadingSpinner } from "@components/LoadingSpinner"
import Header from "@components/header"
import {
    Calendar,
    Clock,
    Users,
    FileText,
    Activity,
    Bell,
    Plus,
    Search,
    Filter,
    MoreHorizontal,
    Phone,
    Video,
    MessageCircle,
    CheckCircle,
    AlertCircle,
    User,
    Stethoscope,
    Heart,
    Thermometer,
    TrendingUp,
    Edit,
    Eye,
} from "lucide-react"

const DoctorDashboard = () => {
    const [loading, setLoading] = useState(true)
    const [appointments, setAppointments] = useState([])
    const [patients, setPatients] = useState([])
    const [todayStats, setTodayStats] = useState({})
    const [recentActivity, setRecentActivity] = useState([])
    const [notifications, setNotifications] = useState([])
    const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split("T")[0])

    // Cargar datos de ejemplo
    useEffect(() => {
        const loadData = async () => {
            try {
                setLoading(true)
                await new Promise((resolve) => setTimeout(resolve, 1500))

                setAppointments([
                    {
                        id: 1,
                        patient: "María González",
                        time: "09:00",
                        duration: 30,
                        type: "Consulta General",
                        status: "confirmada",
                        priority: "normal",
                        notes: "Control de presión arterial",
                        contact: "+1 234-567-8901",
                    },
                    {
                        id: 2,
                        patient: "Carlos Ruiz",
                        time: "10:30",
                        duration: 45,
                        type: "Seguimiento",
                        status: "en-progreso",
                        priority: "alta",
                        notes: "Revisión post-operatoria",
                        contact: "+1 234-567-8902",
                    },
                    {
                        id: 3,
                        patient: "Ana López",
                        time: "14:00",
                        duration: 30,
                        type: "Primera Consulta",
                        status: "pendiente",
                        priority: "normal",
                        notes: "Dolor de cabeza recurrente",
                        contact: "+1 234-567-8903",
                    },
                    {
                        id: 4,
                        patient: "Pedro Martín",
                        time: "15:30",
                        duration: 30,
                        type: "Control",
                        status: "confirmada",
                        priority: "baja",
                        notes: "Control de diabetes",
                        contact: "+1 234-567-8904",
                    },
                ])

                setPatients([
                    {
                        id: 1,
                        name: "María González",
                        age: 45,
                        lastVisit: "2024-12-01",
                        condition: "Hipertensión",
                        status: "Estable",
                        nextAppointment: "2024-12-10",
                        vitals: { bp: "120/80", hr: "72", temp: "36.5" },
                    },
                    {
                        id: 2,
                        name: "Carlos Ruiz",
                        age: 38,
                        lastVisit: "2024-11-28",
                        condition: "Post-operatorio",
                        status: "En recuperación",
                        nextAppointment: "2024-12-08",
                        vitals: { bp: "118/75", hr: "68", temp: "36.8" },
                    },
                    {
                        id: 3,
                        name: "Ana López",
                        age: 29,
                        lastVisit: "2024-11-25",
                        condition: "Migraña",
                        status: "En tratamiento",
                        nextAppointment: "2024-12-15",
                        vitals: { bp: "110/70", hr: "75", temp: "36.4" },
                    },
                ])

                setTodayStats({
                    totalAppointments: 8,
                    completedAppointments: 3,
                    pendingAppointments: 4,
                    cancelledAppointments: 1,
                    newPatients: 2,
                    followUps: 6,
                })

                setRecentActivity([
                    {
                        id: 1,
                        type: "appointment",
                        message: "Cita completada con María González",
                        time: "Hace 30 min",
                        icon: CheckCircle,
                        color: "text-green-600",
                    },
                    {
                        id: 2,
                        type: "prescription",
                        message: "Prescripción enviada a Carlos Ruiz",
                        time: "Hace 1 hora",
                        icon: FileText,
                        color: "text-blue-600",
                    },
                    {
                        id: 3,
                        type: "message",
                        message: "Mensaje recibido de Ana López",
                        time: "Hace 2 horas",
                        icon: MessageCircle,
                        color: "text-purple-600",
                    },
                ])

                setNotifications([
                    {
                        id: 1,
                        type: "urgent",
                        title: "Cita urgente solicitada",
                        message: "Pedro Martín solicita cita urgente",
                        time: "Hace 15 min",
                        read: false,
                    },
                    {
                        id: 2,
                        type: "reminder",
                        title: "Recordatorio",
                        message: "Revisar resultados de laboratorio",
                        time: "Hace 1 hora",
                        read: false,
                    },
                ])

                toast.success("¡Dashboard cargado correctamente!", {
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

    const getStatusColor = (status) => {
        switch (status) {
            case "confirmada":
                return "bg-green-100 text-green-800 border-green-200"
            case "pendiente":
                return "bg-yellow-100 text-yellow-800 border-yellow-200"
            case "en-progreso":
                return "bg-blue-100 text-blue-800 border-blue-200"
            case "cancelada":
                return "bg-red-100 text-red-800 border-red-200"
            default:
                return "bg-gray-100 text-gray-800 border-gray-200"
        }
    }

    const getPriorityColor = (priority) => {
        switch (priority) {
            case "alta":
                return "border-l-red-500"
            case "normal":
                return "border-l-blue-500"
            case "baja":
                return "border-l-green-500"
            default:
                return "border-l-gray-500"
        }
    }

    const formatTime = (time) => {
        return new Date(`2024-01-01T${time}`).toLocaleTimeString("es-ES", {
            hour: "2-digit",
            minute: "2-digit",
        })
    }

    if (loading) return <LoadingSpinner />

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-teal-50">
            {/* Header */}
            <Header role="Doctor" />
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8 space-y-6 sm:space-y-8">
                {/* Tarjetas de Estadísticas del Día */}
                <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
                    {/* Citas de Hoy */}
                    <div className="group relative overflow-hidden bg-gradient-to-br from-teal-100 to-cyan-200 rounded-xl sm:rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 border border-teal-200">
                        <div className="absolute inset-0 bg-white/20 backdrop-blur-sm"></div>
                        <div className="relative p-4 sm:p-6">
                            <div className="flex items-center justify-between mb-3 sm:mb-4">
                                <div className="p-2 sm:p-3 bg-teal-500 rounded-lg sm:rounded-xl">
                                    <Calendar className="h-5 w-5 sm:h-6 sm:w-6 lg:h-8 lg:w-8 text-white" />
                                </div>
                                <TrendingUp className="h-4 w-4 sm:h-5 sm:w-5 text-teal-600" />
                            </div>
                            <div className="space-y-1">
                                <p className="text-teal-700 text-xs sm:text-sm font-medium">Citas Hoy</p>
                                <p className="text-2xl sm:text-3xl lg:text-4xl font-bold text-teal-800">
                                    {todayStats.totalAppointments}
                                </p>
                                <p className="text-teal-600 text-xs">Total programadas</p>
                            </div>
                        </div>
                    </div>

                    {/* Pacientes Atendidos */}
                    <div className="group relative overflow-hidden bg-gradient-to-br from-green-100 to-emerald-200 rounded-xl sm:rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 border border-green-200">
                        <div className="absolute inset-0 bg-white/20 backdrop-blur-sm"></div>
                        <div className="relative p-4 sm:p-6">
                            <div className="flex items-center justify-between mb-3 sm:mb-4">
                                <div className="p-2 sm:p-3 bg-green-500 rounded-lg sm:rounded-xl">
                                    <CheckCircle className="h-5 w-5 sm:h-6 sm:w-6 lg:h-8 lg:w-8 text-white" />
                                </div>
                                <TrendingUp className="h-4 w-4 sm:h-5 sm:w-5 text-green-600" />
                            </div>
                            <div className="space-y-1">
                                <p className="text-green-700 text-xs sm:text-sm font-medium">Completadas</p>
                                <p className="text-2xl sm:text-3xl lg:text-4xl font-bold text-green-800">
                                    {todayStats.completedAppointments}
                                </p>
                                <p className="text-green-600 text-xs">Citas finalizadas</p>
                            </div>
                        </div>
                    </div>

                    {/* Pendientes */}
                    <div className="group relative overflow-hidden bg-gradient-to-br from-yellow-100 to-amber-200 rounded-xl sm:rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 border border-yellow-200">
                        <div className="absolute inset-0 bg-white/20 backdrop-blur-sm"></div>
                        <div className="relative p-4 sm:p-6">
                            <div className="flex items-center justify-between mb-3 sm:mb-4">
                                <div className="p-2 sm:p-3 bg-yellow-500 rounded-lg sm:rounded-xl">
                                    <Clock className="h-5 w-5 sm:h-6 sm:w-6 lg:h-8 lg:w-8 text-white" />
                                </div>
                                <AlertCircle className="h-4 w-4 sm:h-5 sm:w-5 text-yellow-600" />
                            </div>
                            <div className="space-y-1">
                                <p className="text-yellow-700 text-xs sm:text-sm font-medium">Pendientes</p>
                                <p className="text-2xl sm:text-3xl lg:text-4xl font-bold text-yellow-800">
                                    {todayStats.pendingAppointments}
                                </p>
                                <p className="text-yellow-600 text-xs">Por atender</p>
                            </div>
                        </div>
                    </div>

                    {/* Pacientes Nuevos */}
                    <div className="group relative overflow-hidden bg-gradient-to-br from-purple-100 to-violet-200 rounded-xl sm:rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 border border-purple-200">
                        <div className="absolute inset-0 bg-white/20 backdrop-blur-sm"></div>
                        <div className="relative p-4 sm:p-6">
                            <div className="flex items-center justify-between mb-3 sm:mb-4">
                                <div className="p-2 sm:p-3 bg-purple-500 rounded-lg sm:rounded-xl">
                                    <Users className="h-5 w-5 sm:h-6 sm:w-6 lg:h-8 lg:w-8 text-white" />
                                </div>
                                <TrendingUp className="h-4 w-4 sm:h-5 sm:w-5 text-purple-600" />
                            </div>
                            <div className="space-y-1">
                                <p className="text-purple-700 text-xs sm:text-sm font-medium">Nuevos</p>
                                <p className="text-2xl sm:text-3xl lg:text-4xl font-bold text-purple-800">{todayStats.newPatients}</p>
                                <p className="text-purple-600 text-xs">Pacientes nuevos</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Layout principal - Citas y Actividad */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
                    {/* Citas del Día */}
                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-xl sm:rounded-2xl shadow-xl overflow-hidden border border-gray-100">
                            <div className="bg-gradient-to-r from-teal-400 to-cyan-500 px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                    <div className="flex items-center space-x-3">
                                        <div className="p-2 bg-white/20 rounded-lg">
                                            <Calendar className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                                        </div>
                                        <div>
                                            <h2 className="text-xl sm:text-2xl font-bold text-white">Citas de Hoy</h2>
                                            <p className="text-teal-100 text-sm sm:text-base">
                                                {new Date().toLocaleDateString("es-ES", {
                                                    weekday: "long",
                                                    year: "numeric",
                                                    month: "long",
                                                    day: "numeric",
                                                })}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2 sm:gap-3">
                                        <input
                                            type="date"
                                            value={selectedDate}
                                            onChange={(e) => setSelectedDate(e.target.value)}
                                            className="px-3 py-2 bg-white/20 border border-white/30 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-white/50"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="p-4 sm:p-6 lg:p-8">
                                <div className="space-y-3 sm:space-y-4">
                                    {appointments.map((appointment, index) => (
                                        <div
                                            key={appointment.id}
                                            className={`group bg-gradient-to-r from-gray-50 to-teal-50 border-l-4 ${getPriorityColor(
                                                appointment.priority,
                                            )} border border-gray-200 rounded-lg sm:rounded-xl p-4 sm:p-6 hover:shadow-lg transition-all duration-300`}
                                            style={{ animationDelay: `${index * 100}ms` }}
                                        >
                                            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                                                <div className="flex-1 min-w-0">
                                                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-3">
                                                        <div className="flex items-center space-x-3">
                                                            <div className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-teal-400 to-cyan-500 rounded-lg sm:rounded-xl text-white font-bold text-sm sm:text-base">
                                                                {formatTime(appointment.time).split(":")[0]}
                                                            </div>
                                                            <div className="min-w-0 flex-1">
                                                                <div className="flex items-center space-x-2 mb-1">
                                                                    <User className="h-3 w-3 sm:h-4 sm:w-4 text-gray-500 flex-shrink-0" />
                                                                    <span className="font-semibold text-gray-800 text-sm sm:text-base truncate">
                                                                        {appointment.patient}
                                                                    </span>
                                                                </div>
                                                                <div className="flex items-center space-x-2">
                                                                    <Clock className="h-3 w-3 sm:h-4 sm:w-4 text-gray-400 flex-shrink-0" />
                                                                    <span className="text-xs sm:text-sm text-gray-600">
                                                                        {formatTime(appointment.time)} - {appointment.duration} min
                                                                    </span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="flex items-center gap-2">
                                                            <span
                                                                className={`px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium border ${getStatusColor(
                                                                    appointment.status,
                                                                )}`}
                                                            >
                                                                {appointment.status}
                                                            </span>
                                                        </div>
                                                    </div>

                                                    <div className="space-y-2">
                                                        <div className="flex items-center space-x-2">
                                                            <Stethoscope className="h-3 w-3 sm:h-4 sm:w-4 text-gray-400 flex-shrink-0" />
                                                            <span className="text-xs sm:text-sm text-gray-600">{appointment.type}</span>
                                                        </div>
                                                        <div className="flex items-start space-x-2">
                                                            <FileText className="h-3 w-3 sm:h-4 sm:w-4 text-gray-400 flex-shrink-0 mt-0.5" />
                                                            <span className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                                                                {appointment.notes}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="flex flex-wrap gap-2 sm:gap-3 lg:flex-col lg:gap-2">
                                                    <button
                                                        onClick={() =>
                                                            toast.info("Iniciando videollamada...", {
                                                                position: "top-right",
                                                                autoClose: 3000,
                                                            })
                                                        }
                                                        className="flex items-center justify-center space-x-1 sm:space-x-2 px-3 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors flex-1 lg:flex-initial text-xs sm:text-sm"
                                                    >
                                                        <Video className="h-3 w-3 sm:h-4 sm:w-4" />
                                                        <span>Video</span>
                                                    </button>
                                                    <button
                                                        onClick={() =>
                                                            toast.info("Iniciando llamada...", {
                                                                position: "top-right",
                                                                autoClose: 3000,
                                                            })
                                                        }
                                                        className="flex items-center justify-center space-x-1 sm:space-x-2 px-3 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors flex-1 lg:flex-initial text-xs sm:text-sm"
                                                    >
                                                        <Phone className="h-3 w-3 sm:h-4 sm:w-4" />
                                                        <span>Llamar</span>
                                                    </button>
                                                    <button
                                                        onClick={() =>
                                                            toast.info("Abriendo chat...", {
                                                                position: "top-right",
                                                                autoClose: 3000,
                                                            })
                                                        }
                                                        className="flex items-center justify-center space-x-1 sm:space-x-2 px-3 py-2 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 transition-colors flex-1 lg:flex-initial text-xs sm:text-sm"
                                                    >
                                                        <MessageCircle className="h-3 w-3 sm:h-4 sm:w-4" />
                                                        <span>Chat</span>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Panel lateral - Actividad y Notificaciones */}
                    <div className="space-y-6">
                        {/* Actividad Reciente */}
                        <div className="bg-white rounded-xl sm:rounded-2xl shadow-xl overflow-hidden border border-gray-100">
                            <div className="bg-gradient-to-r from-purple-400 to-violet-500 px-4 sm:px-6 py-4">
                                <div className="flex items-center space-x-3">
                                    <div className="p-2 bg-white/20 rounded-lg">
                                        <Activity className="h-5 w-5 text-white" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg sm:text-xl font-bold text-white">Actividad Reciente</h3>
                                        <p className="text-purple-100 text-sm">Últimas acciones</p>
                                    </div>
                                </div>
                            </div>
                            <div className="p-4 sm:p-6">
                                <div className="space-y-4">
                                    {recentActivity.map((activity) => (
                                        <div key={activity.id} className="flex items-start space-x-3">
                                            <div className={`p-2 rounded-lg bg-gray-100 ${activity.color}`}>
                                                <activity.icon className="h-4 w-4" />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-sm font-medium text-gray-800">{activity.message}</p>
                                                <p className="text-xs text-gray-500">{activity.time}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Notificaciones */}
                        <div className="bg-white rounded-xl sm:rounded-2xl shadow-xl overflow-hidden border border-gray-100">
                            <div className="bg-gradient-to-r from-orange-400 to-red-500 px-4 sm:px-6 py-4">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-3">
                                        <div className="p-2 bg-white/20 rounded-lg">
                                            <Bell className="h-5 w-5 text-white" />
                                        </div>
                                        <div>
                                            <h3 className="text-lg sm:text-xl font-bold text-white">Notificaciones</h3>
                                            <p className="text-orange-100 text-sm">Alertas importantes</p>
                                        </div>
                                    </div>
                                    <div className="bg-white/20 backdrop-blur-sm px-2 py-1 rounded-full">
                                        <span className="text-white font-semibold text-sm">
                                            {notifications.filter((n) => !n.read).length}
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className="p-4 sm:p-6">
                                <div className="space-y-4">
                                    {notifications.map((notification) => (
                                        <div
                                            key={notification.id}
                                            className={`p-3 rounded-lg border-l-4 ${notification.type === "urgent" ? "border-l-red-500 bg-red-50" : "border-l-blue-500 bg-blue-50"
                                                }`}
                                        >
                                            <div className="flex items-start justify-between">
                                                <div className="flex-1 min-w-0">
                                                    <p className="text-sm font-medium text-gray-800">{notification.title}</p>
                                                    <p className="text-xs text-gray-600 mt-1">{notification.message}</p>
                                                    <p className="text-xs text-gray-500 mt-2">{notification.time}</p>
                                                </div>
                                                {!notification.read && (
                                                    <div className="w-2 h-2 bg-red-500 rounded-full flex-shrink-0 mt-1"></div>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Pacientes Recientes */}
                <div className="bg-white rounded-xl sm:rounded-2xl shadow-xl overflow-hidden border border-gray-100">
                    <div className="bg-gradient-to-r from-indigo-400 to-blue-500 px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                            <div className="flex items-center space-x-3">
                                <div className="p-2 bg-white/20 rounded-lg">
                                    <Users className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                                </div>
                                <div>
                                    <h2 className="text-xl sm:text-2xl font-bold text-white">Mis Pacientes</h2>
                                    <p className="text-indigo-100 text-sm sm:text-base">Pacientes bajo seguimiento</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2 sm:gap-3">
                                <div className="relative">
                                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                                    <input
                                        type="text"
                                        placeholder="Buscar paciente..."
                                        className="pl-10 pr-4 py-2 border border-white/30 rounded-lg bg-white/20 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50 text-sm"
                                    />
                                </div>
                                <button className="p-2 bg-white/20 rounded-lg hover:bg-white/30 transition-colors">
                                    <Filter className="h-4 w-4 text-white" />
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="p-4 sm:p-6 lg:p-8">
                        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
                            {patients.map((patient, index) => (
                                <div
                                    key={patient.id}
                                    className="group bg-gradient-to-r from-gray-50 to-indigo-50 border border-gray-200 rounded-lg sm:rounded-xl p-4 sm:p-6 hover:shadow-lg hover:border-indigo-300 transition-all duration-300"
                                    style={{ animationDelay: `${index * 100}ms` }}
                                >
                                    <div className="flex items-start justify-between mb-4">
                                        <div className="flex items-center space-x-3">
                                            <div className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-indigo-400 to-blue-500 rounded-lg sm:rounded-xl text-white font-bold text-sm sm:text-base">
                                                {patient.name.split(" ")[0][0]}
                                                {patient.name.split(" ")[1]?.[0]}
                                            </div>
                                            <div className="min-w-0">
                                                <h4 className="font-semibold text-gray-800 text-sm sm:text-base">{patient.name}</h4>
                                                <p className="text-xs sm:text-sm text-gray-600">{patient.age} años</p>
                                            </div>
                                        </div>
                                        <button className="p-1 hover:bg-gray-200 rounded-lg transition-colors">
                                            <MoreHorizontal className="h-4 w-4 text-gray-400" />
                                        </button>
                                    </div>

                                    <div className="space-y-3">
                                        <div className="flex items-center justify-between">
                                            <span className="text-xs sm:text-sm text-gray-600">Condición:</span>
                                            <span className="text-xs sm:text-sm font-medium text-gray-800">{patient.condition}</span>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <span className="text-xs sm:text-sm text-gray-600">Estado:</span>
                                            <span
                                                className={`text-xs sm:text-sm font-medium px-2 py-1 rounded-full ${patient.status === "Estable"
                                                    ? "bg-green-100 text-green-800"
                                                    : patient.status === "En recuperación"
                                                        ? "bg-yellow-100 text-yellow-800"
                                                        : "bg-blue-100 text-blue-800"
                                                    }`}
                                            >
                                                {patient.status}
                                            </span>
                                        </div>

                                        {/* Signos Vitales */}
                                        <div className="grid grid-cols-3 gap-2 pt-2 border-t border-gray-200">
                                            <div className="text-center">
                                                <div className="flex items-center justify-center mb-1">
                                                    <Heart className="h-3 w-3 text-red-500" />
                                                </div>
                                                <p className="text-xs font-medium text-gray-800">{patient.vitals.bp}</p>
                                                <p className="text-xs text-gray-500">PA</p>
                                            </div>
                                            <div className="text-center">
                                                <div className="flex items-center justify-center mb-1">
                                                    <Activity className="h-3 w-3 text-blue-500" />
                                                </div>
                                                <p className="text-xs font-medium text-gray-800">{patient.vitals.hr}</p>
                                                <p className="text-xs text-gray-500">FC</p>
                                            </div>
                                            <div className="text-center">
                                                <div className="flex items-center justify-center mb-1">
                                                    <Thermometer className="h-3 w-3 text-orange-500" />
                                                </div>
                                                <p className="text-xs font-medium text-gray-800">{patient.vitals.temp}°</p>
                                                <p className="text-xs text-gray-500">Temp</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex gap-2 mt-4 pt-4 border-t border-gray-200">
                                        <button
                                            onClick={() =>
                                                toast.info("Abriendo historial médico...", {
                                                    position: "top-right",
                                                    autoClose: 3000,
                                                })
                                            }
                                            className="flex items-center justify-center space-x-1 px-3 py-2 bg-indigo-100 text-indigo-700 rounded-lg hover:bg-indigo-200 transition-colors flex-1 text-xs"
                                        >
                                            <Eye className="h-3 w-3" />
                                            <span>Ver</span>
                                        </button>
                                        <button
                                            onClick={() =>
                                                toast.info("Editando información...", {
                                                    position: "top-right",
                                                    autoClose: 3000,
                                                })
                                            }
                                            className="flex items-center justify-center space-x-1 px-3 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors flex-1 text-xs"
                                        >
                                            <Edit className="h-3 w-3" />
                                            <span>Editar</span>
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DoctorDashboard