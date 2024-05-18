import express from "express";
import cors from "cors";
import pool from "./db/conexionDB.js";

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 3002;

// Ruta para obtener todos los alumnos
app.get('/alumnos', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM alumnos;');
        res.json(result.rows);
    } catch (err) {
        console.error('Error al consultar la base de datos:', err);
        res.status(500).send('Error al obtener los alumnos');
    }
});

// Ruta para obtener todos los usuarios
app.get('/usuarios', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM usuarios;');
        res.json(result.rows);
    } catch (err) {
        console.error('Error al consultar la base de datos:', err);
        res.status(500).send('Error al obtener los usuarios');
    }
});
// Ruta para obtener todos los apoderados
app.get('/apoderados', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM apoderados;');
        res.json(result.rows);
    } catch (err) {
        console.error('Error al consultar la base de datos:', err);
        res.status(500).send('Error al obtener los apoderados');
    }
});

// Ruta para crear un nuevo alumno
app.post("/create", async (req, res) => {
    const { rut, nombres, apellido_paterno, apellido_materno, correo_electronico, fecha_nacimiento, curso } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO alumnos (rut, nombres, apellido_paterno, apellido_materno, correo_electronico, fecha_nacimiento, curso) VALUES ($1, $2, $3, $4, $5, $6)', 
            [rut, nombres, apellido_paterno, apellido_materno, correo_electronico, fecha_nacimiento, curso]
        );
        console.log("Alumno creado:", result);
        res.status(201).json({ message: 'Alumno creado correctamente' });
    } catch (err) {
        console.error("Error al crear alumno:", err);
        res.status(500).json({ message: 'Error al crear alumno' });
    }
});

// Ruta para actualizar un alumno
app.put("/update", async (req, res) => {
    const { id, rut, nombres, apellido_paterno, apellido_materno, correo_electronico, curso } = req.body;
    try {
        const result = await pool.query(
            'UPDATE alumnos SET rut = $1, nombres = $2, apellido_paterno = $3, apellido_materno = $4, correo_electronico = $5, fecha_nacimiento = $6 curso = $7 WHERE id = $8', 
            [rut, nombres, apellido_paterno, apellido_materno, correo_electronico, fecha_nacimiento, curso, id]
        );
        console.log("Alumno actualizado:", result);
        res.status(200).json({ message: 'Alumno actualizado correctamente' });
    } catch (err) {
        console.error("Error al actualizar alumno:", err);
        res.status(500).json({ message: 'Error al actualizar alumno' });
    }
});

// Ruta para eliminar un alumno
app.delete("/delete/:id", async (req, res) => {
    const id = req.params.id;
    try {
        const result = await pool.query('DELETE FROM alumnos WHERE id = $1', [id]);
        console.log("Alumno eliminado:", result);
        res.status(200).json({ message: 'Alumno eliminado correctamente' });
    } catch (err) {
        console.error("Error al eliminar alumno:", err);
        res.status(500).json({ message: 'Error al eliminar alumno' });
    }
});

// Inicio del servidor
app.listen(PORT, () => {
    console.log('El servidor está encendido en el puerto ' + PORT);
});





