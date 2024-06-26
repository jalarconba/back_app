import express from "express";
import cors from "cors";
import pool from "./db/conexionDB.js";
// import { requireLogin } from "./requiereLogin.js"; 

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3001;

// // Aplica el middleware de autenticación a las rutas protegidas
// app.use('/app', requireLogin);
// app.use('/home', requireLogin);
// app.use('/components/loginform', requireLogin);
// app.use('/login', requireLogin);

//rutas para alumnos
app.get('/alumnos', async (req, res) => {
    try {
        const query = 'SELECT * FROM alumnos;';
        const result = await pool.query(query);
        res.json(result.rows);
    } catch (err) {
        console.error('Error al consultar la base de datos:', err);
        res.status(500).send('Error al obtener los alumnos');
    }
});
// RUTA PARA AGREGAR ALUMNO
app.post("/alumnos", async (req, res) => {
    const { rut, nombres, apellido_paterno, apellido_materno, correo_electronico, fecha_nacimiento, curso } = req.body;
    try {
        const query = 'INSERT INTO alumnos (rut, nombres, apellido_paterno, apellido_materno, correo_electronico, fecha_nacimiento, curso) VALUES ($1, $2, $3, $4, $5, $6, $7)';
        const result = await pool.query(query, [rut, nombres, apellido_paterno, apellido_materno, correo_electronico, fecha_nacimiento, curso]);
        console.log("Alumno creado:", result);
        res.status(201).json({ message: 'Alumno creado correctamente' });
    } catch (err) {
        console.error("Error al crear alumno:", err);
        res.status(500).json({ message: 'Error al crear alumno' });
    }
});
// RUTA PARA ACTUALIZAR ALUMNO
app.put("/alumnos/:id", async (req, res) => {
    const id = req.params.id;
    const { rut, nombres, apellido_paterno, apellido_materno, correo_electronico, fecha_nacimiento, curso } = req.body;
    try {
        const query = 'UPDATE alumnos SET rut = $1, nombres = $2, apellido_paterno = $3, apellido_materno = $4, correo_electronico = $5, fecha_nacimiento = $6, curso = $7 WHERE id = $8';
        const result = await pool.query(query, [rut, nombres, apellido_paterno, apellido_materno, correo_electronico, fecha_nacimiento, curso, id]);
        console.log("Alumno actualizado:", result);
        res.status(200).json({ message: 'Alumno actualizado correctamente' });
    } catch (err) {
        console.error("Error al actualizar alumno:", err);
        res.status(500).json({ message: 'Error al actualizar alumno' });
    }
});
// RUTA PARA ELIMINAR ALUMNO
app.delete("/alumnos/:id", async (req, res) => {
    const id = req.params.id;
    try {
        const query = 'DELETE FROM alumnos WHERE id = $1';
        const result = await pool.query(query, [id]);
        console.log("Alumno eliminado:", result);
        res.status(200).json({ message: 'Alumno eliminado correctamente' });
    } catch (err) {
        console.error("Error al eliminar alumno:", err);
        res.status(500).json({ message: 'Error al eliminar alumno' });
    }
});

// Rutas para Usuarios
app.get('/usuarios', async (req, res) => {
    try {
        const query = 'SELECT * FROM usuarios;';
        const result = await pool.query(query);
        res.json(result.rows);
    } catch (err) {
        console.error('Error al consultar la base de datos:', err);
        res.status(500).send('Error al obtener los usuarios');
    }
});

app.post('/usuarios', async (req, res) => {
    const { username, password, correo_electronico, rol } = req.body;
    try {
        const query = 'INSERT INTO usuarios (username, password, correo_electronico, rol) VALUES ($1, $2, $3, $4) RETURNING *;';
        const result = await pool.query(query, [username, password, correo_electronico, rol]);
        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error("Error al crear usuario:", err);
        res.status(500).json({ message: 'Error al crear usuario' });
    }
});

app.put('/usuarios/:id', async (req, res) => {
    const id = req.params.id;
    const { username, password, correo_electronico, rol } = req.body;
    try {
        const query = 'UPDATE usuarios SET username = $1, password = $2, correo_electronico = $3, rol = $4 WHERE id_usuario = $5 RETURNING *;';
        const result = await pool.query(query, [username, password, correo_electronico, rol, id]);
        res.json(result.rows[0]);
    } catch (err) {
        console.error("Error al actualizar usuario:", err);
        res.status(500).json({ message: 'Error al actualizar usuario' });
    }
});

app.delete('/usuarios/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const query = 'DELETE FROM usuarios WHERE id_usuario = $1 RETURNING *;';
        const result = await pool.query(query, [id]);
        res.json(result.rows[0]);
    } catch (err) {
        console.error("Error al eliminar usuario:", err);
        res.status(500).json({ message: 'Error al eliminar usuario' });
    }
});

// Rutas para Apoderados
app.get('/apoderados', async (req, res) => {
    try {
        const query = 'SELECT * FROM apoderados;';
        const result = await pool.query(query);
        res.json(result.rows);
    } catch (err) {
        console.error('Error al consultar la base de datos:', err);
        res.status(500).send('Error al obtener los apoderados');
    }
});

app.post('/apoderados', async (req, res) => {
    const { rut_alumno, rut_apoderado, nombreapo, direccion, comuna, telefono, email } = req.body;
    try {
        const query = 'INSERT INTO apoderados (rut_alumno, rut_apoderado, nombreapo, direccion, comuna, telefono, email) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *;';
        const result = await pool.query(query, [rut_alumno, rut_apoderado, nombreapo, direccion, comuna, telefono, email]);
        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error("Error al crear apoderado:", err);
        res.status(500).json({ message: 'Error al crear apoderado' });
    }
});

app.put('/apoderados/:id', async (req, res) => {
    const id = req.params.id;
    const { rut_alumno, rut_apoderado, nombreapo, direccion, comuna, telefono, email } = req.body;
    try {
        const query = 'UPDATE apoderados SET rut_alumno = $1, rut_apoderado = $2, nombreapo = $3, direccion = $4, comuna = $5, telefono = $6, email = $7 WHERE id = $8 RETURNING *;';
        const result = await pool.query(query, [rut_alumno, rut_apoderado, nombreapo, direccion, comuna, telefono, email, id]);
        res.json(result.rows[0]);
    } catch (err) {
        console.error("Error al actualizar apoderado:", err);
        res.status(500).json({ message: 'Error al actualizar apoderado' });
    }
});

app.delete('/apoderados/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const query = 'DELETE FROM apoderados WHERE id = $1 RETURNING *;';
        const result = await pool.query(query, [id]);
        res.json(result.rows[0]);
    } catch (err) {
        console.error("Error al eliminar apoderado:", err);
        res.status(500).json({ message: 'Error al eliminar apoderado' });
    }
});
// Endpoint para iniciar sesión
app.post("/login", async (req, res) => {
    const { username, password } = req.body;
    
    try {
      // Consulta en la base de datos para verificar las credenciales
      const query = 'SELECT * FROM usuarios WHERE username = $1 AND password = $2';
      const result = await pool.query(query, [username, password]);
  
      if (result.rows.length > 0) {
        // Credenciales válidas, devuelve un token de sesión (aquí podrías usar JWT)
        res.status(200).json({ message: 'Inicio de sesión exitoso' });
      } else {
        // Credenciales inválidas
        res.status(401).json({ message: 'Credenciales inválidas' });
      }
    } catch (err) {
      console.error("Error al iniciar sesión:", err);
      res.status(500).json({ message: 'Error al iniciar sesión' });
    }
  });

app.listen(PORT, () => {
  console.log(`El servidor está encendido en el puerto http://localhost:${PORT}`);
});



export default app;

