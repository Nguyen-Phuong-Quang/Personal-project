const sql = require('mssql/msnodesqlv8')

const config = {
    server: "localhost",
    user: "sa",
    password: "251209",
    database: "Students",
    driver: "msnodesqlv8",
    port: 49172
}

const conn = new sql.ConnectionPool(config).connect()
    .then(pool => {
        return pool;
    })

module.exports = {
    conn,
    sql
}