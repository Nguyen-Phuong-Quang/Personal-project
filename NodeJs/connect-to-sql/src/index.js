const { conn, sql } = require('./connect')

const express = require('express');
const app = express();

async function getData(app) {
    var pool = await conn;
    return await pool.request().query("select * from Customers", function (err, data) {
        console.log(data.recordset);
        app.use('/', (req, res) => {
            res.json(data.recordset);
        })
    })

}

getData(app);

app.listen(3000);