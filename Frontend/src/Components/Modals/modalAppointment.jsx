import React, { useState, useEffect } from "react";
import { X } from "lucide-react";
import { GET_ALL_DOCTORS } from "@service/doctorService";
import { GET_ALL_SPECIALTIES } from "@service/specialtiesService";
import { ADD_QUOTE } from "@service/quotesService";
import { toast } from "react-toastify";

export const AppointmentModal = ({ isOpen, onClose, onSubmit }) => {
    const [doctors, setDoctors] = useState([]);
    const [specialties, setSpecialties] = useState([]);
    const [loading, setLoading] = useState(false);

    const headquartersOptions = [
        "Clínica Norte",
        "Clínica Sur",
        "Centro Médico Central",
        "Autopista Sur"
    ];

    const [formData, setFormData] = useState({
        doctor_id: "",
        date: "",
        time: "",
        headquarters: "",
        specialty_id: ""
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [doctorsRes, specialtiesRes] = await Promise.all([
                    GET_ALL_DOCTORS(0, 100),
                    GET_ALL_SPECIALTIES(0, 100)
                ]);

                setDoctors(Array.isArray(doctorsRes?.data) ? doctorsRes.data : []);
                setSpecialties(Array.isArray(specialtiesRes?.data) ? specialtiesRes.data : []);
            } catch (error) {
                console.error("Error cargando datos:", error.message);
                toast.error("Error al cargar doctores y especialidades");
            }
        };

        if (isOpen) {
            fetchData();
        }
    }, [isOpen]);

    useEffect(() => {
        document.body.style.overflow = isOpen ? "hidden" : "";
        return () => {
            document.body.style.overflow = "";
        };
    }, [isOpen]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { doctor_id, date, time, headquarters, specialty_id } = formData;

        if (!doctor_id || !date || !time || !headquarters || !specialty_id) {
            toast.error("Por favor completa todos los campos");
            return;
        }

        setLoading(true);
        try {
            // Datos para enviar al backend
            const quoteDto = {
                date: `${formData.date}T00:00:00`,
                time: `${formData.date}T${formData.time}:00`,
                headquarters: formData.headquarters,
                state: "Pendiente",
                doctor: { id: parseInt(formData.doctor_id) },
                specialties: { id: parseInt(formData.specialty_id) },
            };

            // Enviar al backend
            const response = await ADD_QUOTE(quoteDto);

            // Buscar la información completa del doctor y especialidad
            const selectedDoctor = doctors.find(doc => doc.id == doctor_id);
            const selectedSpecialty = specialties.find(spec => spec.id == specialty_id);

            const appointmentForUI = {
                id: response?.id || Date.now(),
                doctor: {
                    name: selectedDoctor?.name || "Doctor",
                    lastname: selectedDoctor?.lastname || "Desconocido"
                },
                specialties: {
                    name: selectedSpecialty?.name || "Especialidad Desconocida"
                },
                date: `${date}T00:00:00`,
                time: time,
                state: "Pendiente",
                type: "Consulta General",
                headquarters: headquarters,
                doctor_id: doctor_id,
                specialty_id: specialty_id
            };

            // Notificar al componente padre con la estructura correcta
            onSubmit && onSubmit(appointmentForUI);

            // Limpiar formulario
            setFormData({
                doctor_id: "",
                date: "",
                time: "",
                headquarters: "",
                specialty_id: ""
            });

            toast.success("Cita agendada exitosamente");
            onClose();

        } catch (error) {
            console.error("Error al agendar cita:", error);
            toast.error("Error al agendar la cita. Intenta nuevamente.");
        } finally {
            setLoading(false);
        }
    };

    // Limpiar formulario al cerrar
    const handleClose = () => {
        setFormData({
            doctor_id: "",
            date: "",
            time: "",
            headquarters: "",
            specialty_id: ""
        });
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl max-h-screen overflow-y-auto">
                <div className="bg-gradient-to-r from-blue-500 to-indigo-600 px-6 py-5 rounded-t-2xl flex justify-between items-center sticky top-0 z-10">
                    <div>
                        <h2 className="text-2xl font-semibold text-white">Agendar Cita Médica</h2>
                        <p className="text-white/70 text-sm">Complete los datos para registrar su cita</p>
                    </div>
                    <button
                        onClick={handleClose}
                        className="p-2 hover:bg-white/20 rounded-full transition"
                        disabled={loading}
                    >
                        <X className="w-5 h-5 text-white" />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-8 space-y-6">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">Doctor</label>
                        <select
                            name="doctor_id"
                            value={formData.doctor_id}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            required
                            disabled={loading}
                        >
                            <option value="" disabled>Selecciona un doctor</option>
                            {doctors.map((doctor) => (
                                <option key={doctor.id} value={doctor.id}>
                                    {doctor.name} {doctor.lastname}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">Especialidad</label>
                        <select
                            name="specialty_id"
                            value={formData.specialty_id}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            required
                            disabled={loading}
                        >
                            <option value="" disabled>Selecciona una especialidad</option>
                            {specialties.map((specialty) => (
                                <option key={specialty.id} value={specialty.id}>
                                    {specialty.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">Sede</label>
                        <select
                            name="headquarters"
                            value={formData.headquarters}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            required
                            disabled={loading}
                        >
                            <option value="" disabled>Selecciona una sede</option>
                            {headquartersOptions.map((sede, idx) => (
                                <option key={idx} value={sede}>{sede}</option>
                            ))}
                        </select>
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">Fecha</label>
                            <input
                                type="date"
                                name="date"
                                value={formData.date}
                                onChange={handleChange}
                                min={new Date().toISOString().split("T")[0]}
                                className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                required
                                disabled={loading}
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">Hora</label>
                            <input
                                type="time"
                                name="time"
                                value={formData.time}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                required
                                disabled={loading}
                            />
                        </div>
                    </div>

                    <div className="flex justify-end gap-3 pt-4">
                        <button
                            type="button"
                            onClick={handleClose}
                            className="px-6 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition disabled:opacity-50"
                            disabled={loading}
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            className="px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl hover:from-blue-600 hover:to-indigo-700 transition shadow-lg disabled:opacity-50 flex items-center space-x-2"
                            disabled={loading}
                        >
                            {loading && (
                                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                            )}
                            <span>{loading ? "Agendando..." : "Agendar Cita"}</span>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};