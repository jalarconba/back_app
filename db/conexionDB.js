import pg from "pg"

const pool = new pg.Pool({
    host:'localhost',
    user:'postgres',
    port:8083,
    password:'1234',
    database:'Asistencia',
    allowExitOnIdle: true,
})
export default pool;