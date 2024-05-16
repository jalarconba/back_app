import pg from "pg"

const pool = new pg.Pool({
    host:'dpg-cp2o4g21hbls7381qot0-a',
    user:'postgres',
    port:5432,
    password:'asistencia_up7g_user',
    database:'asistencia_up7g',
    allowExitOnIdle: true,
})
export default pool;
