# 📋 Tech Inventory API

> **Sistema integral de gestión de inventario tecnológico**

Aplicación full-stack diseñada para administrar eficientemente el inventario de equipos tecnológicos en múltiples sedes, incluyendo seguimiento de impresoras, estados y más.

---

## 📚 Tabla de Contenidos

- [Descripción General](#descripción-general)
- [Requisitos Previos](#requisitos-previos)
- [Instalación](#instalación)
- [Configuración](#configuración)
- [Ejecución](#ejecución)
- [estructura del Proyecto](#estructura-del-proyecto)
- [API REST](#api-rest)
- [Tecnologías](#tecnologías)
- [Contribuciones](#contribuciones)
- [Licencia](#licencia)

---

## 🎯 Descripción General

**Tech Inventory API** es un sistema moderno para la gestión centralizada de inventario tecnológico. Permite:

✅ Registrar y gestionar impresoras  
✅ Administrar múltiples sedes  
✅ Clasificar equipos por tipos  
✅ Rastrear estados de dispositivos  
✅ Interfaz web intuitiva y responsive  

**Arquitectura**: Microservicios monolíticos con separación frontend-backend
- **Backend**: REST API con Spring Boot
- **Frontend**: Interfaz moderna con React y Vite
- **Base de datos**: MySQL 8.0+

---

## 🔧 Requisitos Previos

### Sistema
- **Windows 10/11** (o Linux/macOS equivalentes)
- **Java 17+** (JDK)
- **MySQL 8.0+** en ejecución
- **Node.js 16+** y npm 7+ (solo para frontend)

### Software Recomendado
- **Visual Studio Code** o IntelliJ IDEA
- **MySQL Workbench** (para gestión de BD)
- **Git** 2.30+ (para control de versiones)

---

## 📦 Instalación

### 1. Clonar el Repositorio

```bash
git clone <repositorio-url>
cd tech-api
```

### 2. Configurar la Base de Datos MySQL

```sql
-- Crear base de datos
CREATE DATABASE inventario_tech CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Crear usuario (opcional pero recomendado)
CREATE USER 'inventario'@'localhost' IDENTIFIED BY 'TuContraseña123*';
GRANT ALL PRIVILEGES ON inventario_tech.* TO 'inventario'@'localhost';
FLUSH PRIVILEGES;
```

### 3. Backend - Spring Boot

No requiere instalación adicional de Maven (incluye Maven Wrapper).

```bash
# Desde la raíz del proyecto
.\mvnw.cmd clean install
```

### 4. Frontend - React + Vite

```bash
cd tech-frontend

# Instalar dependencias
npm install

# (Opcional) Instalar Tailwind CSS si no está ya incluido
npm install -D tailwindcss postcss autoprefixer
npm run build
```

---

## ⚙️ Configuración

### Backend - `application.properties`

Actualiza el archivo `src/main/resources/application.properties`:

```properties
# Conexión MySQL
spring.datasource.url=jdbc:mysql://localhost:3306/inventario_tech?allowPublicKeyRetrieval=true&useSSL=false&serverTimezone=UTC
spring.datasource.username=root
spring.datasource.password=TuContraseña123*
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver

# JPA/Hibernate
spring.jpa.database-platform=org.hibernate.dialect.MySQLDialect
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.format_sql=true

# Puerto (opcional)
server.port=8080
```

### Frontend - Variables de Entorno

Crea `.env` en `tech-frontend/`:

```env
VITE_API_URL=http://localhost:8080
```

---

## 🚀 Ejecución

### Opción 1: Ejecución Completa (Terminal Separadas)

#### Terminal 1 - Backend
```bash
cd c:\ruta\al\tech-api

.\mvnw.cmd spring-boot:run
```

El API estará disponible en: `http://localhost:8080`

#### Terminal 2 - Frontend
```bash
cd c:\ruta\al\tech-api\tech-frontend
npm run dev
```

La aplicación estará disponible en: `http://localhost:5173` (o el puerto mostrado)

### Opción 2: Build de Producción

**Backend:**
```bash
.\mvnw.cmd clean package
java -jar target/tech-api-0.0.1-SNAPSHOT.jar
```

**Frontend:**
```bash
cd tech-frontend
npm run build
# Los archivos compilados estarán en dist/
```

---

## 📁 Estructura del Proyecto

```
tech-api/
├── src/
│   ├── main/
│   │   ├── java/com/inventario/tech_api/
│   │   │   ├── TechApiApplication.java          # Clase principal
│   │   │   ├── controllers/
│   │   │   │   ├── ImpresoraController.java     # CRUD Impresoras
│   │   │   │   ├── SedeController.java          # CRUD Sedes
│   │   │   │   ├── EstadoController.java        # CRUD Estados
│   │   │   │   └── (más controllers)
│   │   │   ├── models/
│   │   │   │   ├── Impresora.java               # Entidad Impresora
│   │   │   │   ├── Sede.java                    # Entidad Sede
│   │   │   │   ├── Estado.java                  # Entidad Estado
│   │   │   │   └── Tipo.java                    # Entidad Tipo
│   │   │   └── repositories/
│   │   │       ├── ImpresoraRepository.java     # DAO Impresoras
│   │   │       ├── SedeRepository.java          # DAO Sedes
│   │   │       └── (más repositories)
│   │   └── resources/
│   │       ├── application.properties           # Configuración
│   │       ├── static/                          # Archivos estáticos
│   │       └── templates/                       # Templates (si aplica)
│   └── test/                                    # Tests unitarios
│
├── tech-frontend/
│   ├── src/
│   │   ├── App.jsx                              # Componente principal
│   │   ├── main.jsx                             # Entrada React
│   │   └── assets/                              # Imágenes, iconos
│   ├── public/                                  # Archivos públicos
│   ├── package.json                             # Dependencias npm
│   ├── vite.config.js                           # Config Vite
│   └── tailwind.config.js                       # Config Tailwind CSS
│
├── pom.xml                                      # Configuración Maven
├── mvnw / mvnw.cmd                              # Maven Wrapper
├── .gitignore                                   # Archivos a ignorar en Git
├── .env.example                                 # Ejemplo variables entorno
└── README.md                                    # Este archivo
```

---

## 🔌 API REST

### Base URL
```
http://localhost:8080/api
```

### Endpoints Principales

#### Impresoras
| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/impresoras` | Obtener todas las impresoras |
| POST | `/impresoras` | Crear nueva impresora |
| GET | `/impresoras/{id}` | Obtener impresora por ID |
| PUT | `/impresoras/{id}` | Actualizar impresora |
| DELETE | `/impresoras/{id}` | Eliminar impresora |

#### Sedes
| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/sedes` | Listar todas las sedes |
| POST | `/sedes` | Crear nueva sede |

#### Estados
| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/estados` | Listar estados disponibles |
| POST | `/estados` | Crear nuevo estado |

### Ejemplo de Solicitud POST

```bash
curl -X POST http://localhost:8080/api/impresoras \
  -H "Content-Type: application/json" \
  -d {
    "marca": "HP",
    "modelo": "LaserJet Pro",
    "numeroImpresora": "IMP001",
    "numeroSerie": "SN12345",
    "idTipo": 1,
    "esColor": true,
    "idSede": 1,
    "idEstado": 1
  }
```

---

## 💻 Tecnologías

### Backend
- **Spring Boot 4.0.2** - Framework web
- **Spring Data JPA** - Acceso a datos
- **Hibernate** - ORM
- **MySQL Connector/J** - Driver JDBC
- **Lombok** - Reducción de boilerplate
- **Maven** - Gestor de dependencias

### Frontend
- **React 18+** - Librería UI
- **Vite** - Build tool moderno
- **Tailwind CSS 3** - Estilos utilitarios
- **JavaScript ES6+** - Lenguaje base

### DevOps/Database
- **MySQL 8.0+**
- **Git & GitHub**

---

## 🤝 Contribuciones

### Proceso de Contribución

1. Fork el repositorio
2. Crear rama feature (`git checkout -b feature/AmazingFeature`)
3. Commit cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abrir Pull Request

### Estándares de Código
- Seguir convenciones de nomenclatura (camelCase para variables, PascalCase para clases)
- Añadir comentarios documentados en métodos complejos
- Mantener cobertura de tests > 80%
- Ejecutar análisis de código antes de commit

---

## 📋 Notas Importantes

### Configuración de Base de Datos
- La contraseña de BD está en `application.properties`. **Cambiarla en producción**.
- Usar variables de entorno para credenciales en ambientes distintos a desarrollo.

### CORS
El backend configura CORS para aceptar todas las fuentes (`@CrossOrigin(origins = "*")`). 
**En producción, especificar dominios permitidos:**

```java
@CrossOrigin(origins = "https://tu-dominio.com")
```

### Logs
Los logs de SQL están habilitados (`spring.jpa.show-sql=true`). Deshabilitar en producción.

---

## 📞 Soporte

Para reportar bugs o solicitar features, abre un **Issue** en el repositorio.

---

## 📜 Licencia

Este proyecto está bajo licencia **MIT**. Ver archivo `LICENSE` para más detalles.

---

**Última actualización**: Febrero 2026  
**Versión**: 0.0.1-SNAPSHOT

