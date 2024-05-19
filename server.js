import express from "express";
import cors from "cors";
import pool from "./db/conexionDB.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 3002;
const SECRET_KEY = "your_secret_key"; // Cambia esto a una clave secreta fuerte

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
            'INSERT INTO alumnos (rut, nombres, apellido_paterno, apellido_materno, correo_electronico, fecha_nacimiento, curso) VALUES ($1, $2, $3, $4, $5, $6, $7)', 
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
    const { id, rut, nombres, apellido_paterno, apellido_materno, correo_electronico, fecha_nacimiento, curso } = req.body;
    console.log("Datos recibidos para actualización:", req.body);
    try {
        const result = await pool.query(
            'UPDATE alumnos SET rut = $1, nombres = $2, apellido_paterno = $3, apellido_materno = $4, correo_electronico = $5, fecha_nacimiento = $6, curso = $7 WHERE id = $8', 
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

// Ruta para el login
app.post("/login", async (req, res) => {
    const { username, password } = req.body;
    try {
        const result = await pool.query('SELECT * FROM usuarios WHERE login = $1', [username]);
        if (result.rows.length > 0) {
            const user = result.rows[0];
            const isMatch = await bcrypt.compare(password, user.password);
            if (isMatch) {
                const token = jwt.sign({ id: user.id, username: user.login }, SECRET_KEY, { expiresIn: '1h' });
                res.json({ token });
            } else {
                res.status(401).json({ message: 'Credenciales inválidas' });
            }
        } else {
            res.status(401).json({ message: 'Credenciales inválidas' });
        }
    } catch (err) {
        console.error('Error al iniciar sesión:', err);
        res.status(500).json({ message: 'Error al iniciar sesión' });
    }
});

// Inicio del servidor
app.listen(PORT, () => {
    console.log('El servidor está encendido en el puerto ' + PORT);
});


