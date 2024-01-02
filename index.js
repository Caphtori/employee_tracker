require('dotenv').config();
const mysql = require('mysql2');

const db = mysql.createConnection(
    {
        host: localhost,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: 'employees_db'
    },
    console.log(`Successfully connected to the employees_db database.`)
)

