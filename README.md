# 1. Manual de Instalación y Ejecución

## Requisitos

*   Servidor web (Apache, Nginx, etc.)
*   PHP 7.4 o superior
*   MySQL o MariaDB

## Instalación

1.  Clone o descargue este repositorio en el directorio raíz de su servidor web.
2.  Importe el archivo `database.sql` en su base de datos MySQL o MariaDB. Esto creará la base de datos `task_manager` y las tablas `users` y `tasks`.
3.  Configure la conexión a la base de datos en el archivo `config/database.php`. Modifique los valores de `$host`, `$db_name`, `$username` y `$password` según su configuración.

## Ejecución

1.  Abra su navegador web y navegue a la URL de su proyecto.
2.  La página de inicio de sesión se mostrará. Como no hay usuarios por defecto, deberá crear uno directamente en la base de datos o utilizar la API.
3.  Para utilizar la aplicación, puede navegar a las siguientes páginas:
    *   `users.html`: para gestionar los usuarios.
    *   `tasks.html`: para gestionar las tareas.

## API Endpoints

La API REST se encuentra en el directorio `/api`.

*   `POST /api/login.php`: Iniciar sesión.
*   `GET /api/users.php`: Obtener todos los usuarios.
*   `GET /api/users/read_one.php?id={id}`: Obtener un usuario por su ID.
*   `POST /api/users/create.php`: Crear un nuevo usuario.
*   `PUT /api/users/update.php`: Actualizar un usuario.
*   `DELETE /api/users/delete.php`: Eliminar un usuario.
*   `GET /api/tasks.php`: Obtener todas las tareas.
*   `GET /api/task.php?id={id}`: Obtener una tarea por su ID.
*   `POST /api/tasks_create.php`: Crear una nueva tarea.
*   `PUT /api/tasks_update.php`: Actualizar una tarea.
*   `DELETE /api/tasks_delete.php`: Eliminar una tarea.

---

# 2. Prueba Técnica: Gestor de Tareas

Desarrollo de una aplicación web que gestione un sistema simple de tareas. Debe incluir además una API para que un tercero pueda hacer una integración con la aplicación.

## Gestión de usuarios
* Listar usuarios
* Crear usuarios
* Consultar la información de los usuarios
* Modificar la información de los usuarios
* Eliminar usuarios
* **Datos:** correo, contraseña, nombre y apellidos.

## Gestión de tareas
* Listar tareas
* Crear tareas
* Consultar la información de las tareas
* Modificar la información de las tareas
* Eliminar tareas
* **Datos:** usuario asociado, nombre, descripción, fecha y hora de inicio, fecha y hora de fin, completada (si/no).

## Endpoints API
* `POST /api/login`
* `GET /api/users`
* `GET /api/tasks`
* `GET /api/tasks/{id}`
* `POST /api/tasks`
* `PUT /api/tasks/{id}`
* `DELETE /api/tasks/{id}`

## Tecnologías
Para ello será indispensable emplear las siguientes tecnologías:
* HTML5
* CSS3
* JavaScript
* PHP
* jQuery AJAX
* MySQL/MariaDB
* Bootstrap 5

> **Nota:** No se permite el uso de frameworks comerciales (CakePHP, Laravel, Angular, etc.)

## Entrega
La solución debe incluir el código fuente de la aplicación y un pequeño manual de instalación y ejecución.