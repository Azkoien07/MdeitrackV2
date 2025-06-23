
import { Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login from "../App.jsx";
import AdminDashboard from '@pages/Admin/page.jsx';
import PacientesDashboard from "@pages/Pacientes/page.jsx";
import DoctorDashboard from "@pages/Doctores/page.jsx";

function ProtectedRoute({ children }) {
    const isAuth = localStorage.getItem("auth") === "true";
    return isAuth ? children : <Navigate to="/" />;
}

export default function AppRoutes() {
    return (
        <>
            <ToastContainer position="top-right" autoClose={3000} />
            <Routes>
                <Route path="/" element={<Login />} />
                <Route
                    path="/admin"
                    element={
                        <AdminDashboard />
                    }
                />
                <Route
                    path="/pacientes"
                    element={
                        <PacientesDashboard />
                    }
                />
                <Route
                    path="/doctores"
                    element={
                        <DoctorDashboard />
                    }
                />
            </Routes>
        </>
    );
}
