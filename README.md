# MediTrack - Sistema de Gestión Médica (Java + React)

## 🏥 Descripción

**MediTrack** es una plataforma moderna e intuitiva diseñada para optimizar la gestión de pacientes, doctores y citas médicas en clínicas y centros de salud. Su objetivo es mejorar la organización del tiempo y la atención al paciente, asegurando un flujo de trabajo eficiente y sin errores.

---

## 🔧 Tecnologías utilizadas

- **Backend:** Java con Spring Boot
- **Frontend:** React.js
- **Base de datos:** PostgreSQL
- **ORM:** Spring Data JPA (Hibernate)
- **Cliente HTTP:** Axios
- **Control de dependencias (Backend):** Gradle
- **Control de dependencias (Frontend):** pnpm o bun
- **Autenticación:** Spring Security

---

## 📄 Características principales

- ✅ Registro, actualización y gestión de pacientes y profesionales de la salud
- ✅ Administración eficiente de citas médicas, evitando errores y retrasos
- ✅ Gestión de especialidades médicas para asignar correctamente cada cita
- ✅ Centralización de la información para un acceso rápido y seguro
- ✅ Panel de control intuitivo construido con React
- ✅ Sistema de autenticación y control de roles *(opcional con Spring Security)*
- ✅ API RESTful completamente documentada
- ✅ Interfaz responsive y fácil de usar

---

## 🚀 Instalación y configuración

### 🔙 Backend - Spring Boot

#### 1. Clonar el repositorio
```bash
git clone https://github.com/tu-usuario/MediTrack.git
cd MediTrack/backend
```

#### 2. Configurar la base de datos
Crear una base de datos PostgreSQL y configurar las credenciales en `application.properties`:

```properties
# Base de datos
spring.datasource.url=jdbc:postgresql://localhost:5432/meditrack_db
spring.datasource.username=tu_usuario
spring.datasource.password=tu_contraseña
spring.datasource.driver-class-name=org.postgresql.Driver

# JPA/Hibernate
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.PostgreSQLDialect

# Puerto del servidor
server.port=8081
```

#### 3. Instalar dependencias y ejecutar
```bash
# Instalar dependencias
./gradlew build

# Ejecutar la aplicación
./gradlew bootRun
```

El backend estará disponible en: `http://localhost:8080`

### 🔜 Frontend - React

#### 1. Navegar al directorio frontend
```bash
cd ../frontend
```

#### 2. Instalar dependencias
```bash
# Con pnpm
pnpm install

# O con bun
bun install
```

#### 3. Configurar variables de entorno
Crear un archivo `.env` en la raíz del proyecto frontend:

```env
REACT_APP_API_URL=http://localhost:8081/api
REACT_APP_API_VERSION=v1
```

#### 4. Ejecutar la aplicación
```bash
# Con pnpm
pnpm run start

# O con bun
bun run start
```

El frontend estará disponible en: `http://localhost:3000`

---

## 📁 Estructura del proyecto

```
MediTrack/
├── backend/
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/
│   │   │   │   └── com/meditrack/
│   │   │   │       ├── controller/
│   │   │   │       ├── service/
│   │   │   │       ├── repository/
│   │   │   │       ├── model/
│   │   │   │       ├── dto/
│   │   │   │       └── config/
│   │   │   └── resources/
│   │   │       └── application.properties
│   │   └── test/
│   ├── build.gradle
│   └── README.md
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── utils/
│   │   ├── hooks/
│   │   └── styles/
│   ├── package.json
│   └── README.md
└── README.md
```

---

## 🌐 API Endpoints

### Pacientes
- `GET /api/pacientes` - Obtener todos los pacientes
- `GET /api/pacientes/{id}` - Obtener paciente por ID
- `POST /api/pacientes` - Crear nuevo paciente
- `PUT /api/pacientes/{id}` - Actualizar paciente
- `DELETE /api/pacientes/{id}` - Eliminar paciente

### Doctores
- `GET /api/doctores` - Obtener todos los doctores
- `GET /api/doctores/{id}` - Obtener doctor por ID
- `POST /api/doctores` - Crear nuevo doctor
- `PUT /api/doctores/{id}` - Actualizar doctor
- `DELETE /api/doctores/{id}` - Eliminar doctor

### Citas
- `GET /api/citas` - Obtener todas las citas
- `GET /api/citas/{id}` - Obtener cita por ID
- `POST /api/citas` - Crear nueva cita
- `PUT /api/citas/{id}` - Actualizar cita
- `DELETE /api/citas/{id}` - Eliminar cita
- `GET /api/citas/doctor/{doctorId}` - Obtener citas por doctor
- `GET /api/citas/paciente/{pacienteId}` - Obtener citas por paciente

### Especialidades
- `GET /api/especialidades` - Obtener todas las especialidades
- `POST /api/especialidades` - Crear nueva especialidad

---

---

## 🤝 Contribución

1. Fork el proyecto
2. Crear una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abrir un Pull Request

### Convenciones de código

- **Backend**: Seguir las convenciones de Java y Spring Boot
- **Frontend**: Utilizar ESLint y Prettier
- **Commits**: Utilizar Conventional Commits

---

---

## 📞 Soporte

Si tienes problemas o preguntas:

1. Revisa la documentación
2. Busca en los issues existentes
3. Crea un nuevo issue si es necesario
4. Contacta al equipo de desarrollo

---

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo [LICENSE](LICENSE) para más detalles.

---

## 👥 Autores

- **Gabriel Felipe** - *Desarrollo inicial* - [Azkoien07](https://github.com/Azkoien07)

---

**¡Gracias por usar MediTrack!** 🚀
