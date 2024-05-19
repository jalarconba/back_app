import pg from "pg";



const pool = new pg.Pool({
    host: 'dpg-cp2o4g21hbls7381qot0-a.oregon-postgres.render.com', 
    user: 'asistencia_up7g_user',
    port: 5432, 
    password: 'zUEFUu2J8g92bRFx8Mau4uUh7INAynqD',
    database: 'asistencia_up7g', 
    allowExitOnIdle: true,
    ssl: true
});

pool.connect((err, client, release) => {
    if (err) {
        console.error('Error al conectar a la base de datos:', err.message);
    } else {
        console.log('Conexión exitosa a la base de datos');
        release(); 
    }
});

export default pool;