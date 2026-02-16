# SISTEMA-ERP 🚀

Sistema de Gestión de Recursos Empresariales (ERP) profesional y moderno, diseñado para optimizar los procesos de negocio. Este proyecto integra un potente backend en Java/Spring Boot con un frontend interactivo en React/Vite.

---

## ✨ Características Implementadas

### 💻 Módulos de Inventario de Hardware
- **Computadores**: Gestión completa con asociación de RAM y Discos. Autocompletado de fechas y validación de MAC Address.
- **Périféricos**: Control de Celulares e Impresoras con datos técnicos específicos.
- **Componentes**: Módulos independientes para memorias RAM y Discos Duros (SSD/HDD).
- **Inventario General**: Vista consolidada de todos los activos tecnológicos.

### 📚 Sistema de Catálogos e Infraestructura
- **Sedes y Ubicaciones**: Organización física de los equipos.
- **Estados y Marcas**: Estandarización de la información para reportes precisos.
- **Auditoría**: Registro automático de fechas de ingreso y modificación.

### 🔐 Seguridad y Autenticación
- **JWT (JSON Web Tokens)**: Sesiones seguras con expiración.
- **CORS Configurado**: Integración segura entre Frontend y Backend.
- **Manejo de Roles**: Preparado para expansión de permisos.

---

## 🛠️ Stack Tecnológico

### Backend
- **Java 17** + **Spring Boot 3.4.2**
- **Spring Security + JWT**
- **Spring Data JPA** (MySQL)
- **Maven** (Gestión de dependencias)

### Frontend
- **React 19 + Vite**
- **Tailwind CSS 4**
- **Axios** (API Client)
- **React Router Dom 7**

---

## 🚀 Guía de Instalación

### 1. Requisitos
- Java 17+, Node.js 20+, MySQL 8.0+.

### 2. Configuración Fast-Track
```bash
# Backend: Configura la DB en src/main/resources/application.properties
cd backend && ./mvnw spring-boot:run

# Frontend:
cd frontend && npm install && npm run dev
```

---

## 📂 Estructura del Proyecto

```text
SISTEM-ERP/
├── backend/          # Spring Boot API
│   ├── catalogs/     # Marcas, Sedes, Estados
│   ├── computers/    # Lógica de Computadores
│   ├── inventory/    # Lógica de Discos y RAM
│   ├── security/     # Seguridad JWT
│   └── uploads/      # Imágenes y Archivos
├── frontend/         # React Application
│   ├── src/modules/  # Módulos Computadores, Celulares, etc.
│   ├── src/services/ # Servicios Axios y Auth
│   └── src/hooks/    # Custom React Hooks
└── database/         # Recursos SQL
```

---

## 👨‍💻 Autor
**Mario Munera** - *Desarrollador Principal*

---

> Desarrollado con ❤️ para una gestión empresarial eficiente y profesional.
