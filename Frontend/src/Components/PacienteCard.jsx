import React from "react";
import { Mail, Calendar, Download, Edit, Trash2 } from "lucide-react";
import { toast } from "react-toastify";

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString("es-ES", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });
}

export default function PacienteCard({ paciente, index, onDescargar, onEliminar }) {
    return (
        <div
            className="group bg-gradient-to-r from-gray-50 to-emerald-50 border border-gray-200 rounded-xl p-4 sm:p-6 hover:shadow-lg hover:border-emerald-300 transition-all duration-300 min-w-0"
            style={{ animationDelay: `${index * 100}ms` }}
        >
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 lg:gap-6">
                <div className="flex-1">
                    <div className="flex items-center space-x-3 sm:space-x-4 mb-3 sm:mb-4">
                        <div className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-xl text-white font-bold text-lg sm:text-xl">
                            {paciente.id}
                        </div>
                        <div>
                            <div className="font-bold text-gray-900 text-sm sm:text-base">
                                {paciente.name} {paciente.lastname}
                            </div>
                            <div className="flex items-center space-x-1 sm:space-x-2">
                                <Mail className="h-4 w-4 text-gray-500" />
                                <span className="font-semibold text-gray-800 text-sm sm:text-base">
                                    {paciente.user?.email || "Correo no disponible"}
                                </span>
                            </div>
                            <div className="flex items-center space-x-1 sm:space-x-2 mt-1">
                                <Calendar className="h-4 w-4 text-gray-400" />
                                <span className="text-xs sm:text-sm text-gray-600">
                                    {paciente.created_at
                                        ? `Registrado: ${formatDate(paciente.created_at)}`
                                        : "Fecha de registro no disponible"}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex flex-wrap gap-2 sm:gap-3 mt-2 lg:mt-0">
                    <button
                        onClick={() => onDescargar(paciente.id)}
                        className="flex items-center space-x-1 sm:space-x-2 px-3 sm:px-4 py-2 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition-colors group text-xs sm:text-base"
                    >
                        <Download className="h-4 w-4 group-hover:scale-110 transition-transform" />
                        <span className="font-medium">Reporte</span>
                    </button>
                    <button
                        onClick={() =>
                            toast.info("Función de editar próximamente", {
                                position: "top-right",
                                autoClose: 3000,
                            })
                        }
                        className="flex items-center space-x-1 sm:space-x-2 px-3 sm:px-4 py-2 bg-amber-100 text-amber-700 rounded-xl hover:bg-amber-200 transition-colors text-xs sm:text-base"
                    >
                        <Edit className="h-4 w-4" />
                        <span className="font-medium">Editar</span>
                    </button>
                    <button
                        onClick={() => onEliminar(paciente.id, paciente.user?.email)}
                        className="flex items-center space-x-1 sm:space-x-2 px-3 sm:px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors group text-xs sm:text-base"
                    >
                        <Trash2 className="h-4 w-4 group-hover:scale-110 transition-transform" />
                        <span className="font-medium">Eliminar</span>
                    </button>
                </div>
            </div>
        </div>
    );
}
