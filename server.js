require('dotenv').config();
const express = require('express');
const mysql = require('mysql2');

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const db = mysql.createConnection(
    {
        host: '127.0.0.1',
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: 'employees_db'
    },
    console.log(`Successfully connected to the employees_db database.`)
);

// const tableNames = async ()=>{
//     return new Promise((resolve, reject)=>{
//         try{
//             db.query('SHOW TABLES', (err, result)=>{
//                 if (err){
//                     // console.error(err);
//                     return reject(err);
//                 } else {
//                     console.log(result)
//                     return resolve(result.map((table)=>table.Tables_in_employees_db.charAt(0).toUpperCase()+table.Tables_in_employees_db.slice(1)));
//                     // console.log(result[0].Tables_in_employees_db)
//                 };
//             })
//         } catch(err){
//             reject(err);
//         };
//     });
// };
// db.query('SHOW TABLES', (err, result)=>{
//     if (err){
//         console.error(err);
//     } else {
//         const names = result.map((table)=>table.Tables_in_employees_db.charAt(0).toUpperCase()+table.Tables_in_employees_db.slice(1));
//         console.log(names)
//         // console.log(result[0].Tables_in_employees_db)
//     };
// })

app.get('/api/tables', (req, res)=>{
    db.query('SHOW TABLES',(err, result)=>{
        if (err){
            res.status(400).json(err)
        }else{
            res.send(result);
        }
    })
})
app.use((req, res) => {
    res.status(404).end();
  });

app.listen(PORT, () => {
console.log(`Server running on port ${PORT}`);
});