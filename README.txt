# Proyecto de Consultas a la API de Grupo Centinela

## Instrucciones para obtener el token de autenticación

Para poder utilizar las funcionalidades de este proyecto, es necesario obtener un token de autenticación. Sigue los pasos a continuación para obtenerlo:

### 1. Realizar la solicitud de autenticación

Debes hacer una solicitud POST a la siguiente ruta para obtener el token:

**URL:** `https://one.grupocentinela.cl/api/auth/login`

**Método:** POST

**Encabezados:** 
- `Content-Type: application/json`

**Cuerpo de la solicitud (Body):**
```json
{
    "username": "username",
    "password": "password"
}
2. Obtener el token
Después de realizar la solicitud, recibirás una respuesta en formato JSON que incluirá un campo llamado token. Este token es necesario para realizar consultas a otras rutas de la API.

3. Configurar el archivo .env
Copia el token obtenido y pégalo en el archivo .env en la clave API_KEY. El archivo .env debería verse así:

plaintext

API_KEY="el_token_obtenido"
API_URL=https://one.grupocentinela.cl/api/consults/execute
4. Recomendación
Se recomienda utilizar una herramienta como Postman para realizar la solicitud POST de manera sencilla.

Configuración del Proyecto
Clona el repositorio:


git clone <URL_del_repositorio>
Instala las dependencias del proyecto:


npm install
Crea un archivo .env en la raíz del proyecto basado en el archivo .env.example.

Reemplaza el valor de API_KEY en el archivo .env con el token obtenido en el paso 2.

Ejecuta el proyecto con:

nodemon src/server.js o npm run start

¡Listo! Ahora puedes realizar consultas a la API


Este `README.md` ahora incluye todas las instrucciones necesarias para instalar y ejecutar el proyecto, además de cómo obtener y configurar el token de autenticación.





