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