import React from "react";
import { Mail, Award, Edit, Trash2, UserCheck } from "lucide-react";

export default function DoctorCard({
    doctor,
    index,
    especialidades,
    selectedEspecialidades,
    onSelectEspecialidad,
    onAsignarEspecialidad,
    onEliminar,
    onEditar,
}) {
    return (
        <div
            key={doctor.id}
            className="group bg-gradient-to-r from-gray-50 to-blue-50 border border-gray-200 rounded-xl p-4 sm:p-6 hover:shadow-lg hover:border-blue-300 transition-all duration-300 min-w-0"
            style={{ animationDelay: `${index * 150}ms` }}
        >
            <div className="flex flex-col xl:flex-row gap-4 xl:gap-6">
                {/* Doctor Info */}
                <div className="flex-1">
                    <div className="flex items-center space-x-3 sm:space-x-4 mb-3 sm:mb-4">
                        <div className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-xl text-white font-bold text-lg sm:text-xl">
                            {doctor.id}
                        </div>
                        <div>
                            <div className="flex items-center space-x-1 sm:space-x-2">
                                <Mail className="h-4 w-4 text-gray-500" />
                                <span className="font-semibold text-gray-800 text-sm sm:text-base">{doctor.usuario?.correo}</span>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-2 sm:space-y-3">
                        <div className="flex items-center space-x-1 sm:space-x-2">
                            <Award className="h-5 w-5 text-gray-500" />
                            <span className="font-medium text-gray-700 text-sm sm:text-base">Especialidades:</span>
                        </div>
                        <div className="flex flex-wrap gap-1 sm:gap-2">
                            {doctor.especialidades.length === 0 ? (
                                <span className="bg-gray-100 text-gray-500 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm">Sin especialidades</span>
                            ) : (
                                doctor.especialidades.map((especialidad) => (
                                    <span
                                        key={especialidad.id}
                                        className="bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-800 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium"
                                    >
                                        {especialidad.nombre}
                                    </span>
                                ))
                            )}
                        </div>
                    </div>
                </div>

                {/* Acciones */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 xl:min-w-fit mt-4 xl:mt-0">
                    <div className="flex items-center flex-wrap gap-2 sm:gap-3">
                        <select
                            value={selectedEspecialidades[doctor.id] || ""}
                            onChange={(e) => onSelectEspecialidad(doctor.id, e.target.value)}
                            className="px-3 sm:px-4 py-2 border border-gray-300 rounded-xl focus:border-blue-400 focus:outline-none transition-colors bg-white min-w-[120px] sm:min-w-[200px] text-xs sm:text-base"
                        >
                            <option value="">Seleccionar especialidad</option>
                            {especialidades
                                .filter((esp) => !doctor.especialidades.some((docEsp) => docEsp.id === esp.id))
                                .map((esp) => (
                                    <option key={esp.id} value={esp.id}>
                                        {esp.nombre}
                                    </option>
                                ))}
                        </select>

                        <button
                            onClick={() => onAsignarEspecialidad(doctor.id)}
                            disabled={!selectedEspecialidades[doctor.id]}
                            className="flex items-center justify-center space-x-1 sm:space-x-2 px-3 sm:px-4 py-2 bg-gradient-to-r from-emerald-400 to-teal-500 text-white rounded-xl hover:from-emerald-500 hover:to-teal-600 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed transition-all shadow-lg min-w-[80px] sm:min-w-[100px] h-9 sm:h-10 text-xs sm:text-base"
                        >
                            <UserCheck className="h-4 w-4" />
                            <span className="font-medium">Asignar</span>
                        </button>
                    </div>

                    <div className="flex gap-2 sm:gap-3 mt-2 sm:mt-0">
                        <button
                            onClick={() => onEditar(doctor)}
                            className="flex items-center gap-1 sm:gap-2 px-3 sm:px-4 py-2 bg-yellow-100 text-yellow-700 rounded-xl hover:bg-yellow-200 transition-all shadow-sm hover:shadow-md text-xs sm:text-base"
                        >
                            <Edit className="h-4 w-4" />
                            <span className="font-medium">Editar</span>
                        </button>
                        <button
                            onClick={() => onEliminar(doctor.id, doctor.usuario?.correo)}
                            className="flex items-center gap-1 sm:gap-2 px-3 sm:px-4 py-2 bg-red-100 text-red-700 rounded-xl hover:bg-red-200 transition-all shadow-sm hover:shadow-md text-xs sm:text-base"
                        >
                            <Trash2 className="h-4 w-4" />
                            <span className="font-medium">Eliminar</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
