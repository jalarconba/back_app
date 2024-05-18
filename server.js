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

// Ruta para crear un nuevo alumno
app.post("/create", (req, res) => {
    const { rut_alumno, nombre_alumno, curso, fecha, hora_llegada } = req.body;

    pool.query(
        'INSERT INTO alumnos (rut_alumno, nombre_alumno, curso, fecha, hora_llegada) VALUES ($1, $2, $3, $4, $5)',
        [rut_alumno, nombre_alumno, curso, fecha, hora_llegada],
        (err, result) => {
            if (err) {
                console.error("Error al crear alumno:", err);
                res.status(500).json({ message: 'Error al crear alumno' });
            } else {
                console.log("Alumno creado:", result);
                res.status(201).json({ message: 'Alumno creado correctamente' });
            }
        }
    );
});

// Ruta para actualizar un alumno
app.put("/update", (req, res) => {
    const { id, rut_alumno, nombre_alumno, curso, fecha, hora_llegada } = req.body;

    pool.query(
        'UPDATE alumnos SET rut_alumno = $1, nombre_alumno = $2, curso = $3, fecha = $4, hora_llegada = $5 WHERE id = $6',
        [rut_alumno, nombre_alumno, curso, fecha, hora_llegada, id],
        (err, result) => {
            if (err) {
                console.error("Error al actualizar alumno:", err);
                res.status(500).json({ message: 'Error al actualizar alumno' });
            } else {
                console.log("Alumno actualizado:", result);
                res.status(200).json({ message: 'Alumno actualizado correctamente' });
            }
        }
    );
});

// Ruta para eliminar un alumno
app.delete("/delete/:id", (req, res) => {
    const id = req.params.id;

    pool.query('DELETE FROM alumnos WHERE id = $1', [id], (err, result) => {
        if (err) {
            console.error("Error al eliminar alumno:", err);
            res.status(500).json({ message: 'Error al eliminar alumno' });
        } else {
            console.log("Alumno eliminado:", result);
            res.status(200).json({ message: 'Alumno eliminado correctamente' });
        }
    });
});

// Ruta para obtener un alumno por RUT
app.get('/alumnos/:rut', async (req, res) => {
    const rut = req.params.rut;
    try {
        const result = await pool.query('SELECT * FROM alumnos WHERE rut_alumno = $1;', [rut]);
        res.json(result.rows);
    } catch (err) {
        console.error('Error al consultar la base de datos:', err);
        res.status(500).send('Error al obtener el alumno');
    }
});

// Inicio del servidor
app.listen(PORT, () => {
    console.log('El servidor está encendido en el puerto ' + PORT);
});





