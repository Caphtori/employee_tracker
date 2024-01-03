require('dotenv').config();
const mysql = require('mysql2');

const PORT = process.env.PORT || 3001;

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
// const tableNames = db.promise().query('SHOW TABLES')
//     .then((result)=>result.map((table)=>table.Tables_in_employees_db.charAt(0).toUpperCase()+table.Tables_in_employees_db.slice(1)))
//     .catch(console.log)
// console.log(tableNames)

// async function testPromise(){db.promise().query('SHOW TABLES') 
//     .then((result)=>{
//         // console.log(result)
//         return result
//     })}
// const test2 = await testPromise()
// console.log(test2)

const sampleTable = "departments"
const sampleQuery = `SELECT * FROM ${sampleTable}`
const testInfoSchema = "SELECT `ROW_NAME` FROM `INFORMATION_SCHEMA`.`ROW` WHERE `TABLE_SCHEMA`='employees_db' AND `TABLE_NAME`='"+sampleTable+"'"
async function testQuery(query){
    return new Promise((resolve, reject)=>{
        db.query(query, (err, result)=>{
            if (err){
                reject(err);
            } else{
                resolve(result);
            };
        })
    })
};




async function init(){
    const test = await testQuery(testInfoSchema)
    console.log(test.map((result)=>result.COLUMN_NAME))
}
init()

module.exports = db