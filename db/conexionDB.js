import pg from "pg"

const pool = new pg.Pool({
    host:'34.176.116.146',
    user:'postgres',
    port:8083,
    password:'1234',
    database:'Asistencia',
    allowExitOnIdle: true,
})
export default pool;
