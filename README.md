# SISTEMA-ERP 🚀

Sistema de Gestión de Recursos Empresariales (ERP) profesional y moderno, diseñado para optimizar los procesos de negocio. Este proyecto integra un potente backend en Java/Spring Boot con un frontend interactivo en React/Vite.

---

## ✨ Características Principales

- **Gestión de Inventario**: Control detallado de productos, stock y categorías.
- **Módulo de Ventas**: Registro de transacciones con cálculo de precios dinámicos.
- **Autenticación Segura**: Sistema de login basado en JWT (JSON Web Tokens).
- **Dashboard Intuitivo**: Visualización de métricas clave del negocio.
- **Arquitectura Escalable**: Separación clara entre frontend y backend para facilitar el mantenimiento.

---

## 🛠️ Stack Tecnológico

### Backend
- **Java 17**
- **Spring Boot 3.4.2**
- **Spring Security + JWT**
- **Spring Data JPA**
- **MySQL** (Base de Datos)
- **Lombok**

### Frontend
- **React 19**
- **Vite**
- **Tailwind CSS 4**
- **Axios** (Comunicación API)
- **React Router Dom**

---

## 🚀 Guía de Instalación

### Requisitos Previos
- **JDK 17** o superior.
- **Node.js 18** o superior.
- **MySQL Server**.
- **Maven**.

### 1. Configuración de la Base de Datos
1. Crea una base de datos llamada `sistema_erp`.
2. Importa el archivo `database/system_erp_db.sql` para crear las tablas necesarias.

### 2. Backend
```bash
cd backend
mvn clean install
mvn spring-boot:run
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
│   ├── src/main/java # Código fuente Java
│   └── pom.xml       # Dependencias de Maven
├── frontend/         # Interfaz de usuario con React
│   ├── src/          # Componentes y lógica de React
│   └── package.json  # Dependencias de Node
└── database/         # Scripts de SQL y migraciones
```

---

## 📝 Notas de Desarrollo

- Los archivos `.env` y configuraciones locales están ignorados por Git para mantener la seguridad.
- El proyecto utiliza **Tailwind CSS 4** para un diseño moderno y minimalista.

Desarrollado con ❤️ para la gestión empresarial eficiente.
