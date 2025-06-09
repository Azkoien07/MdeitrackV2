function Sidebar() {
    return (
        <div className="bg-gray-100 w-64 h-screen fixed top-0 left-0 py-4 px-2">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">MediTrack</h2>
            <nav>
                <ul className="list-none p-0 m-0">
                    <li className="mb-2">
                        <a href="#" className="block py-2 px-4 text-gray-700 hover:bg-gray-200 rounded">
                            Dashboard
                        </a>
                    </li>
                    <li className="mb-2">
                        <a href="#" className="block py-2 px-4 text-gray-700 hover:bg-gray-200 rounded">
                            Pacientes
                        </a>
                    </li>
                    <li className="mb-2">
                        <a href="#" className="block py-2 px-4 text-gray-700 hover:bg-gray-200 rounded">
                            Doctores
                        </a>
                    </li>
                    <li className="mb-2">
                        <a href="#" className="block py-2 px-4 text-gray-700 hover:bg-gray-200 rounded">
                            Citas
                        </a>
                    </li>
                    <li className="mb-2">
                        <a href="#" className="block py-2 px-4 text-gray-700 hover:bg-gray-200 rounded">
                            Configuración
                        </a>
                    </li>
                </ul>
            </nav>
        </div>
    );
}

export default Sidebar;