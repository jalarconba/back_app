<<<<<<< HEAD
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // Simulación de verificación de credenciales
    if (username === 'admin' && password === 'password') {
      // Suponiendo que el token se guarda aquí después del inicio de sesión exitoso
      localStorage.setItem('token', '123456');
      navigate('/home'); // Redirige a la página de inicio
    } else {
      setError('Credenciales inválidas. Inténtalo de nuevo.');
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center">Acceso Login</h2>
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <form style={{ backgroundColor: 'rgba(255, 255, 255, 0.5)', padding: '20px', borderRadius: '10px' }}>
            <div className="mb-3 row">
              <label htmlFor="username" className="col-md-4 col-form-label">Usuario:</label>
              <div className="col-md-8">
                <input type="text" className="form-control" id="username" value={username} onChange={(e) => setUsername(e.target.value)} />
              </div>
            </div>
            <div className="mb-3 row">
              <label htmlFor="password" className="col-md-4 col-form-label">Contraseña:</label>
              <div className="col-md-8">
                <input type="password" className="form-control" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
              </div>
            </div>
            <div className="row">
              <div className="col-md-8 offset-md-4">
                <button type="button" className="btn btn-primary" style={{ backgroundColor: '#007bff', border: 'none' }} onClick={handleLogin}>Iniciar sesión</button>
                {loginError && <p className="text-danger">Credenciales inválidas</p>}
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
=======
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
  
>>>>>>> 400d71548268cafe63b50eb5ab48d43b30433b61
