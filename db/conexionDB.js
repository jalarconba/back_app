<<<<<<< HEAD
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
=======
import pg from "pg";

const pool = new pg.Pool({
    host: 'dpg-cp2o4g21hbls7381qot0-a.oregon-postgres.render.com', 
    user: 'asistencia_up7g_user',
    port: 5432, // Puerto predeterminado de PostgreSQL
    password: 'zUEFUu2J8g92bRFx8Mau4uUh7INAynqD',
    database: 'asistencia_up7g', // Nombre de la base de datos
    allowExitOnIdle: true,
    ssl: true
});

export default pool;

>>>>>>> 400d71548268cafe63b50eb5ab48d43b30433b61
