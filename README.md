# SISTEMA-ERP 🚀

Sistema de Gestión de Recursos Empresariales (ERP) profesional y moderno, diseñado para optimizar los procesos de negocio. Este proyecto integra un potente backend en Java/Spring Boot con un frontend interactivo en React/Vite.

---

## ✨ Características Implementadas

### 🖨️ Módulo de Gestión de Impresoras
- **Control Total**: Registro detallado de marca, modelo, número de serie, IP y responsable.
- **Interfaz Inteligente**: 
  - Formulario dinámico con conversión automática a **MAYÚSCULAS**.
  - Reseteo inteligente tras guardado.
  - Indicador visual de **Color vs Blanco y Negro**.
  - Visualización de Sedes, Tipos y Estados en tiempo real.
- **Búsqueda Avanzada**: Filtrado instantáneo por marca, serie o persona responsable.

### 📚 Sistema de Catálogos Automáticos
- Gestión modular de:
  - **Sedes (Branches)**: Ubicaciones físicas de los equipos.
  - **Tipos de Equipo**: Clasificación profesional (Láser, Multifuncional, etc.).
  - **Estados**: Monitoreo de disponibilidad (Activo, Inactivo, En Reparación).

### 🔐 Seguridad y Autenticación
- **JWT (JSON Web Tokens)**: Implementación robusta para sesiones seguras.
- **Middleware de Seguridad**: Filtro de autenticación personalizado (`JwtAuthenticationFilter`) que valida cada petición al servidor.
- **Persistencia Segura**: Manejo de tokens en el frontend para una experiencia de usuario fluida y protegida.

---

## 🛠️ Stack Tecnológico

### Backend
- **Java 17**
- **Spring Boot 3.4.2**
- **Spring Security + JWT** (Arquitectura sin estado)
- **Spring Data JPA** (Persistencia avanzada)
- **MySQL** (Base de Datos Relacional)
- **Lombok** (Código limpio y eficiente)

### Frontend
- **React 19 + Vite** (Renderizado ultrarrápido)
- **Tailwind CSS 4** (Diseño moderno, responsivo y minimalista)
- **Axios** (Integración fluida con API protegida)
- **React Router Dom** (Navegación profesional)

---

## 🚀 Guía de Instalación

### Requisitos Previos
- **JDK 17** o superior.
- **Node.js 18** o superior.
- **MySQL Server**.

### 1. Configuración de la Base de Datos
1. Crea una base de datos llamada `system_erp_db`.
2. Las tablas se generan automáticamente al iniciar el backend gracias a JPA/Hibernate.

### 2. Backend
```bash
cd backend
./mvnw spring-boot:run
```

### 3. Frontend
```bash
cd frontend
npm install
npm run dev
```

---

## 📂 Estructura del Proyecto

```text
SISTEM-ERP/
├── backend/          # API REST con Spring Boot
│   ├── src/.../catalogs # Módulo de Catálogos (Nuevo)
│   ├── src/.../printers # Módulo de Impresoras (Nuevo)
│   ├── src/.../security # Arquitectura de Seguridad JWT
│   └── pom.xml       # Configuración Maven
├── frontend/         # Interfaz de usuario con React
│   ├── src/modules   # Módulos funcionales (Printers, etc.)
│   ├── src/services  # Servicios de API con Auth
│   └── src/layout    # Diseño y navegación principal
└── database/         # Repositorio de scripts SQL
```

---

## 👨‍💻 Autor
**Mario Munera** - *Desarrollador Principal*

---

> Desarrollado con ❤️ para una gestión empresarial eficiente y profesional.
