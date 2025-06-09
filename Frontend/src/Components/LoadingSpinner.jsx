import React from "react";

export function LoadingSpinner() {
    return (
        <div className="fixed inset-0 bg-gradient-to-br from-slate-50 via-gray-50 to-blue-50 flex items-center justify-center z-50">
            <div className="flex flex-col items-center justify-center">
                <div className="relative w-20 h-20 flex items-center justify-center">
                    <div className="w-20 h-20 border-4 border-slate-200 rounded-full animate-pulse"></div>
                    <div className="absolute inset-0 w-20 h-20 border-4 border-slate-500 rounded-full border-t-transparent animate-spin"></div>
                </div>
                <div className="mt-6 space-y-2 text-center">
                    <h3 className="text-xl font-semibold text-gray-800">Cargando Panel</h3>
                    <p className="text-gray-600">Preparando tu dashboard...</p>
                </div>
            </div>
        </div>
    );
}
