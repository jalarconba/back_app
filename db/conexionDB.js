import pg from "pg";

const pool = new pg.Pool({
    host: 'dpg-cp2o4g21hbls7381qot0-a.oregon-postgres.render.com', 
    user: 'asistencia_up7g_user',
    port: 5432, // Puerto predeterminado de PostgreSQL
    password: 'zUEFUu2J8g92bRFx8Mau4uUh7INAynqD',
    database: 'asistencia_up7g', // Nombre de la base de datos
    allowExitOnIdle: true,
    
});

export default pool;

