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

// Ruta para obtener todos los usuarios
app.get('/usuarios', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM usuario;');
        res.json(result.rows);
    } catch (err) {
        console.error('Error al consultar la base de datos:', err);
        res.status(500).send('Error al obtener los usuarios');
    }
});

// Ruta para actualizar un alumno
const update = () => {
    app.put("http://localhost:3002/update", {
      id: id,
      rut: rut,
      nombres: nombres, 
      apellido_paterno: apellidoPaterno, 
      apellido_materno: apellidoMaterno, 
      correo_electronico: correoElectronico,
      curso: curso
    })
    .then((response) => {
      console.log("Respuesta del servidor al actualizar:", response);
      getAlumnos();
      alert("Alumno actualizado");
      setEditar(false);
    })
    .catch((error) => {
      console.error("Error al actualizar alumno:", error);
      alert("Error al actualizar Alumno");
    });
  }

// Ruta para eliminar un alumno
app.delete('/alumnos/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query('DELETE FROM alumno WHERE id = $1', [id]);
        res.json({ message: 'Alumno eliminado correctamente' });
    } catch (err) {
        console.error('Error al eliminar alumno:', err);
        res.status(500).send('Error al eliminar alumno');
    }
});

// Inicio del servidor
app.listen(PORT, () => {
    console.log('El servidor está encendido en el puerto ' + PORT);
});
