Este proyecto es una mini aplicación full stack para gestionar servicios y reservas.

La aplicación permite registrar servicios con nombre, descripción, precio y duración. También permite registrar reservas asociadas a un servicio, indicando el nombre del cliente, correo, fecha y hora. Además, se pueden visualizar los servicios y reservas registrados.

El proyecto está dividido en tres partes:

- Frontend desarrollado con Angular.
- Backend desarrollado con Node.js y Express.
- Base de datos relacional en PostgreSQL.

TECNOLOGÍAS UTILIZADAS:

    Frontend

    - Angular 21.2.14
    - TypeScript
    - Bootstrap
    - HTML
    - CSS

    Backend

    - Node.js 24.11.0
    - npm 11.6.1
    - Express
    - PostgreSQL
    - pg
    - cors
    - dotenv
    - nodemon

    Base de datos

    - PostgreSQL

PASOS PARA INSTALAR DEPENDECIAS:

    Backend:

        Ingresar a la carpeta del backend:

        *en la terminal*
        cd backend
        

        Instalar dependencias:

        *en la terminal*
        npm install
        

    Frontend:

        Ingresar a la carpeta del frontend:

        *en la terminal*
        cd frontend/buki-app

        Instalar dependencias:

        *en la terminal*
        npm install

PASOS PARA CREAR LA BASE DE DATOS:

    Crear una base de datos en PostgreSQL con el nombre: "buki_test"

    Luego ejecutar el script SQL ubicado en: database/script.sql

    El script crea las siguientes tablas:

    - "services": almacena los servicios registrados
    - "bookings": almacena las reservas y se relaciona con la tabla "services"

VARIABLES DE ENTORNO NECESARIAS:

    Dentro de la carpeta "backend", crear un archivo ".env" con la siguiente estructura:

    PORT=3000
    DB_HOST=localhost
    DB_PORT=5432
    DB_USER=postgres
    DB_PASSWORD=your_password
    DB_NAME=buki_test

    Reemplazar "tu_contraseña" por la contraseña correspondiente de PostgreSQL.

    También se incluye un archivo ".env.example" como referencia.

COMANDOS PARA EJECUTAR FRONTEND Y BACKEND:

    Ejecutar backend:

        Desde la carpeta "backend":

        *En la terminal*
        npm run dev

        El backend se ejecuta en: http://localhost:3000

    Ejecutar frontend:

        Desde la carpeta "frontend/buki-app":

        *En la terminal*
        npx ng serve
        
        El frontend se ejecuta en: http://localhost:4200

    Endpoints principales

    -Servicios(URL: http://localhost:3000/api/services)

    GET /api/services -> Lista los servicios registrados. 

    POST /api/services -> Registra un nuevo servicio. 
    
    *Body > raw > JSON:*

    ejemplo de estructura del crud:
    {
    "name": "Corte de cabello",
    "description": "Corte clásico para caballero",
    "price": 35,
    "duration": 45
    }

    -Reservas(URL: http://localhost:3000/api/bookings)

    GET /api/bookings -> Lista las reservas registradas junto con la información del servicio asociado.

    POST /api/bookings -> Registra una nueva reserva asociada a un servicio existente.
    *Body > raw > JSON:*

    ejemplo de estructura del crud
    {
    "client_name": "Juan Perez",
    "client_email": "juan@gmail.com",
    "service_id": 1,
    "booking_date": "2026-06-08",
    "booking_time": "10:30"
    }