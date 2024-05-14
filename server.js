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
        const result = await pool.query('SELECT * FROM alumno;');
        res.json(result.rows);
    } catch (err) {
        console.error('Error al consultar la base de datos:', err);
        res.status(500).send('Error al obtener los alumnos');
    }
});

// Ruta para crear un nuevo alumno
app.post("/create", (req, res) => {
    const { rut, nombres, apellido_paterno, apellido_materno, correo_electronico, curso } = req.body;

    pool.query('INSERT INTO alumno (rut, nombres, apellido_paterno, apellido_materno, correo_electronico, curso) VALUES (?, ?, ?, ?, ?, ?)', 
    [rut, nombres, apellido_paterno, apellido_materno, correo_electronico, curso], (err, result) => {
        if (err) {
            console.error("Error al crear alumno:", err);
            res.status(500).json({ message: 'Error al crear alumno' });
        } else {
            console.log("Alumno creado:", result);
            res.status(201).json({ message: 'Alumno creado correctamente' });
        }
    });
});

// Ruta para actualizar un alumno
app.put("/update", (req, res) => {
    const { id, rut, nombres, apellido_paterno, apellido_materno, correo_electronico, curso } = req.body;

    pool.query('UPDATE alumno SET rut = ?, nombres = ?, apellido_paterno = ?, apellido_materno = ?, correo_electronico = ?, curso = ? WHERE id = ?', 
    [rut, nombres, apellido_paterno, apellido_materno, correo_electronico, curso, id], (err, result) => {
        if (err) {
            console.error("Error al actualizar alumno:", err);
            res.status(500).json({ message: 'Error al actualizar alumno' });
        } else {
            console.log("Alumno actualizado:", result);
            res.status(200).json({ message: 'Alumno actualizado correctamente' });
        }
    });
});

// Ruta para eliminar un alumno
app.delete("/delete/:id", (req, res) => {
    const id = req.params.id;

    pool.query('DELETE FROM alumno WHERE id = ?', [id], (err, result) => {
        if (err) {
            console.error("Error al eliminar alumno:", err);
            res.status(500).json({ message: 'Error al eliminar alumno' });
        } else {
            console.log("Alumno eliminado:", result);
            res.status(200).json({ message: 'Alumno eliminado correctamente' });
        }
    });
});

// Inicio del servidor
app.listen(PORT, () => {
    console.log('El servidor está encendido en el puerto ' + PORT);
});



// Inicio del servidor
app.listen(PORT, () => {
    console.log('El servidor está encendido en el puerto ' + PORT);
});
