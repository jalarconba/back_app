// Ruta para manejar el inicio de sesión
app.post('/login', async (req, res) => {
    const { nombre_usuario, contraseña } = req.body;
  
    try {
      // Consulta la base de datos para verificar las credenciales del usuario
      const result = await pool.query('SELECT * FROM usuarios WHERE nombre_usuario = $1 AND contraseña = $2', [nombre_usuario, contraseña]);
  
      if (result.rows.length > 0) {
        // Usuario autenticado correctamente
        req.session.usuario = result.rows[0]; // Guarda los datos del usuario en la sesión
        res.status(200).send('Inicio de sesión exitoso');
      } else {
        // Credenciales inválidas
        res.status(401).send('Credenciales incorrectas');
      }
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      res.status(500).send('Error al iniciar sesión');
    }
  });
  