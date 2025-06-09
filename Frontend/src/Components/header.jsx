"use client"

import { Shield, Activity, Bell, User, ChevronDown, Search, Calendar, Clock, Menu, X } from "lucide-react"
import { useState } from "react"

export default function Header({ role = "Administrador" }) {
    const [showNotifications, setShowNotifications] = useState(false)
    const [showProfile, setShowProfile] = useState(false)
    const [showMobileMenu, setShowMobileMenu] = useState(false)
    const [showMobileSearch, setShowMobileSearch] = useState(false)

    const roleConfig = {
        Administrador: {
            title: "Panel de Administración",
            subtitle: "Sistema de gestión médica integral",
            colorFrom: "from-slate-700",
            colorVia: "via-gray-700",
            colorTo: "to-blue-700",
            icon: Shield,
            stats: {
                total: "1,247",
                label: "Usuarios activos",
            },
        },
        Doctor: {
            title: "Panel del Doctor",
            subtitle: "Gestión de pacientes y citas",
            colorFrom: "from-teal-700",
            colorVia: "via-emerald-700",
            colorTo: "to-cyan-700",
            icon: Activity,
            stats: {
                total: "28",
                label: "Citas hoy",
            },
        },
        Paciente: {
            title: "Portal del Paciente",
            subtitle: "Consulta tu historial y agenda",
            colorFrom: "from-indigo-700",
            colorVia: "via-violet-700",
            colorTo: "to-purple-700",
            icon: User,
            stats: {
                total: "3",
                label: "Próximas citas",
            },
        },
    }

    const {
        title,
        subtitle,
        colorFrom,
        colorVia,
        colorTo,
        icon: RoleIcon,
        stats,
    } = roleConfig[role] || roleConfig["Administrador"]

    const currentTime = new Date().toLocaleTimeString("es-ES", {
        hour: "2-digit",
        minute: "2-digit",
    })

    const currentDate = new Date().toLocaleDateString("es-ES", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
    })

    return (
        <div className="relative">
            {/* Header Principal */}
            <div className={`bg-gradient-to-r ${colorFrom} ${colorVia} ${colorTo} text-white relative overflow-hidden`}>
                {/* Elementos decorativos de fondo */}
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute -top-4 -right-4 w-24 h-24 rounded-full bg-white/20 blur-xl"></div>
                    <div className="absolute top-1/2 -left-8 w-32 h-32 rounded-full bg-white/10 blur-2xl"></div>
                    <div className="absolute bottom-0 right-1/4 w-16 h-16 rounded-full bg-white/15 blur-lg"></div>
                </div>

                <div className="container mx-auto px-4 sm:px-6 py-4 sm:py-6 relative z-10">
                    {/* Layout principal - Desktop */}
                    <div className="hidden lg:flex items-center justify-between">
                        {/* Sección izquierda - Info principal */}
                        <div className="flex items-center space-x-6">
                            <div className="relative">
                                <div className="p-4 bg-white/20 backdrop-blur-md rounded-2xl border border-white/30 shadow-lg">
                                    <RoleIcon className="h-8 w-8" />
                                </div>
                                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white shadow-sm animate-pulse"></div>
                            </div>

                            <div>
                                <div className="flex items-center gap-3 mb-1">
                                    <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-white/80 bg-clip-text">{title}</h1>
                                    <div className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full border border-white/30">
                                        <span className="text-xs font-medium">v2.1</span>
                                    </div>
                                </div>
                                <p className="text-white/80 text-base">{subtitle}</p>
                                <div className="flex items-center gap-4 mt-2 text-sm text-white/70">
                                    <div className="flex items-center gap-1">
                                        <Calendar className="h-4 w-4" />
                                        <span className="capitalize">{currentDate}</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <Clock className="h-4 w-4" />
                                        <span>{currentTime}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Sección central - Búsqueda */}
                        <div className="flex-1 max-w-md mx-8">
                            <div className="relative w-full">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-white/60" />
                                <input
                                    type="text"
                                    placeholder="Buscar pacientes, doctores..."
                                    className="w-full pl-10 pr-4 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-white/40 transition-all"
                                />
                            </div>
                        </div>

                        {/* Sección derecha - Estadísticas y acciones */}
                        <div className="flex items-center space-x-4">
                            {/* Estadística rápida */}
                            <div className="text-right">
                                <div className="text-2xl font-bold">{stats.total}</div>
                                <div className="text-xs text-white/70">{stats.label}</div>
                            </div>

                            {/* Estado del sistema */}
                            <div className="flex items-center space-x-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-xl border border-white/20">
                                <div className="relative">
                                    <Activity className="h-5 w-5 text-green-300" />
                                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-ping"></div>
                                </div>
                                <span className="text-sm font-medium">Sistema activo</span>
                            </div>

                            {/* Notificaciones */}
                            <div className="relative">
                                <button
                                    onClick={() => setShowNotifications(!showNotifications)}
                                    className="p-2 bg-white/10 backdrop-blur-md rounded-xl border border-white/20 hover:bg-white/20 transition-all"
                                >
                                    <Bell className="h-5 w-5" />
                                    <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-xs font-bold">
                                        3
                                    </div>
                                </button>
                            </div>

                            {/* Perfil de usuario */}
                            <div className="relative">
                                <button
                                    onClick={() => setShowProfile(!showProfile)}
                                    className="flex items-center space-x-2 p-2 bg-white/10 backdrop-blur-md rounded-xl border border-white/20 hover:bg-white/20 transition-all"
                                >
                                    <div className="w-8 h-8 bg-gradient-to-r from-white/30 to-white/20 rounded-lg flex items-center justify-center">
                                        <User className="h-4 w-4" />
                                    </div>
                                    <ChevronDown className="h-4 w-4" />
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Layout móvil y tablet */}
                    <div className="lg:hidden">
                        {/* Primera fila - Logo, título y menú hamburguesa */}
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center space-x-3">
                                <div className="relative">
                                    <div className="p-3 bg-white/20 backdrop-blur-md rounded-xl border border-white/30 shadow-lg">
                                        <RoleIcon className="h-6 w-6" />
                                    </div>
                                    <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-white shadow-sm animate-pulse"></div>
                                </div>

                                <div>
                                    <h1 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-white to-white/80 bg-clip-text">
                                        {title}
                                    </h1>
                                    <p className="text-white/80 text-sm hidden sm:block">{subtitle}</p>
                                </div>
                            </div>

                            {/* Botones de acción móvil */}
                            <div className="flex items-center space-x-2">
                                {/* Búsqueda móvil */}
                                <button
                                    onClick={() => setShowMobileSearch(!showMobileSearch)}
                                    className="p-2 bg-white/10 backdrop-blur-md rounded-lg border border-white/20 hover:bg-white/20 transition-all"
                                >
                                    <Search className="h-5 w-5" />
                                </button>

                                {/* Notificaciones móvil */}
                                <div className="relative">
                                    <button
                                        onClick={() => setShowNotifications(!showNotifications)}
                                        className="p-2 bg-white/10 backdrop-blur-md rounded-lg border border-white/20 hover:bg-white/20 transition-all"
                                    >
                                        <Bell className="h-5 w-5" />
                                        <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center text-xs font-bold">
                                            3
                                        </div>
                                    </button>
                                </div>

                                {/* Menú hamburguesa */}
                                <button
                                    onClick={() => setShowMobileMenu(!showMobileMenu)}
                                    className="p-2 bg-white/10 backdrop-blur-md rounded-lg border border-white/20 hover:bg-white/20 transition-all"
                                >
                                    {showMobileMenu ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                                </button>
                            </div>
                        </div>

                        {/* Segunda fila - Información adicional en tablet */}
                        <div className="hidden sm:flex lg:hidden items-center justify-between text-sm text-white/70">
                            <div className="flex items-center gap-4">
                                <div className="flex items-center gap-1">
                                    <Calendar className="h-4 w-4" />
                                    <span className="capitalize">{currentDate}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <Clock className="h-4 w-4" />
                                    <span>{currentTime}</span>
                                </div>
                            </div>

                            <div className="flex items-center space-x-4">
                                <div className="text-right">
                                    <div className="text-lg font-bold text-white">{stats.total}</div>
                                    <div className="text-xs text-white/70">{stats.label}</div>
                                </div>
                                <div className="flex items-center space-x-1 px-2 py-1 bg-white/10 backdrop-blur-md rounded-lg border border-white/20">
                                    <Activity className="h-4 w-4 text-green-300" />
                                    <span className="text-xs font-medium">Activo</span>
                                </div>
                            </div>
                        </div>

                        {/* Barra de búsqueda móvil expandible */}
                        {showMobileSearch && (
                            <div className="mt-4 lg:hidden">
                                <div className="relative w-full">
                                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-white/60" />
                                    <input
                                        type="text"
                                        placeholder="Buscar..."
                                        className="w-full pl-10 pr-4 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-white/40 transition-all"
                                        autoFocus
                                    />
                                </div>
                            </div>
                        )}

                        {/* Menú móvil expandible */}
                        {showMobileMenu && (
                            <div className="mt-4 lg:hidden">
                                <div className="bg-white/10 backdrop-blur-md rounded-xl border border-white/20 p-4 space-y-4">
                                    {/* Información del usuario */}
                                    <div className="flex items-center gap-3 pb-4 border-b border-white/20">
                                        <div className="w-10 h-10 bg-gradient-to-r from-white/30 to-white/20 rounded-lg flex items-center justify-center">
                                            <User className="h-5 w-5" />
                                        </div>
                                        <div>
                                            <p className="font-semibold">Admin Usuario</p>
                                            <p className="text-sm text-white/70">{role}</p>
                                        </div>
                                    </div>

                                    {/* Estadísticas móvil */}
                                    <div className="sm:hidden">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <div className="text-2xl font-bold">{stats.total}</div>
                                                <div className="text-xs text-white/70">{stats.label}</div>
                                            </div>
                                            <div className="flex items-center space-x-2 px-3 py-2 bg-white/10 rounded-lg">
                                                <Activity className="h-4 w-4 text-green-300" />
                                                <span className="text-sm">Sistema activo</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Fecha y hora móvil */}
                                    <div className="sm:hidden text-sm text-white/70 space-y-1">
                                        <div className="flex items-center gap-2">
                                            <Calendar className="h-4 w-4" />
                                            <span className="capitalize">{currentDate}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Clock className="h-4 w-4" />
                                            <span>{currentTime}</span>
                                        </div>
                                    </div>

                                    {/* Opciones del menú */}
                                    <div className="space-y-2 pt-4 border-t border-white/20">
                                        <button className="w-full text-left px-3 py-2 text-sm hover:bg-white/10 rounded-lg transition-colors">
                                            Mi Perfil
                                        </button>
                                        <button className="w-full text-left px-3 py-2 text-sm hover:bg-white/10 rounded-lg transition-colors">
                                            Configuración
                                        </button>
                                        <button className="w-full text-left px-3 py-2 text-sm text-red-300 hover:bg-red-500/20 rounded-lg transition-colors">
                                            Cerrar Sesión
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Borde inferior decorativo */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
            </div>

            {/* Borde inferior con sombra */}
            <div className="h-6 bg-gradient-to-b from-black/5 to-transparent"></div>

            {/* Dropdown de notificaciones */}
            {showNotifications && (
                <div className="absolute top-full right-4 sm:right-6 mt-2 w-80 max-w-[calc(100vw-2rem)] bg-white rounded-xl shadow-2xl border border-gray-200 z-50 overflow-hidden">
                    <div className="p-4 border-b border-gray-100">
                        <h3 className="font-semibold text-gray-900">Notificaciones</h3>
                    </div>
                    <div className="max-h-96 overflow-y-auto">
                        <div className="p-4 hover:bg-gray-50 border-b border-gray-100">
                            <div className="flex items-start gap-3">
                                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                                <div className="min-w-0">
                                    <p className="text-sm font-medium text-gray-900">Nueva cita programada</p>
                                    <p className="text-xs text-gray-500 mt-1">Dr. García - 15:30 hoy</p>
                                </div>
                            </div>
                        </div>
                        <div className="p-4 hover:bg-gray-50 border-b border-gray-100">
                            <div className="flex items-start gap-3">
                                <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                                <div className="min-w-0">
                                    <p className="text-sm font-medium text-gray-900">Sistema actualizado</p>
                                    <p className="text-xs text-gray-500 mt-1">Versión 2.1 disponible</p>
                                </div>
                            </div>
                        </div>
                        <div className="p-4 hover:bg-gray-50">
                            <div className="flex items-start gap-3">
                                <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2 flex-shrink-0"></div>
                                <div className="min-w-0">
                                    <p className="text-sm font-medium text-gray-900">Recordatorio</p>
                                    <p className="text-xs text-gray-500 mt-1">Backup programado a las 23:00</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Dropdown de perfil */}
            {showProfile && (
                <div className="hidden lg:block absolute top-full right-6 mt-2 w-64 bg-white rounded-xl shadow-2xl border border-gray-200 z-50 overflow-hidden">
                    <div className="p-4 border-b border-gray-100">
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center text-white font-semibold">
                                AD
                            </div>
                            <div>
                                <p className="font-semibold text-gray-900">Admin Usuario</p>
                                <p className="text-sm text-gray-500">{role}</p>
                            </div>
                        </div>
                    </div>
                    <div className="p-2">
                        <button className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg">
                            Mi Perfil
                        </button>
                        <button className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg">
                            Configuración
                        </button>
                        <button className="w-full text-left px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg">
                            Cerrar Sesión
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}
