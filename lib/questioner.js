const inquirer = require('inquirer');
const { db } = require('../index.js');

const columnQuery = (table)=>"SELECT `ROW_NAME` FROM `INFORMATION_SCHEMA`.`ROW` WHERE `TABLE_SCHEMA`='employees_db' AND `TABLE_NAME`='"+table+"'";
const singular = (str)=>str.slice(0,-1);

async function questioner(questions){
    const result = await inquirer.prompt(questions).then((data)=>data)
    return result;
};

// Master Question
async function starterQuestions(){
    // async function getTables(){
    //     return new Promise((resolve, reject)=>{
    //         db.query('SHOW TABLES', (err, result)=>{
    //             if (err){
    //                 reject(err);
    //             } else{
    //                 resolve(result.map((table)=>table.Tables_in_employees_db.charAt(0).toUpperCase()+table.Tables_in_employees_db.slice(1)));
    //             };
    //         })
    //     })
    // };
    // const tableData = await getTables();
    const tableData = await myQuery('SHOW TABLES').map((table)=>table.Tables_in_employees_db.charAt(0).toUpperCase()+table.Tables_in_employees_db.slice(1));
    const questionOne = await questioner([{
        type: "list",
        message: "Choose a category.",
        name: "starterCategory",
        choices: tableData
    }])
    .then(questionTwo({ starterCategory }))
    const conslude = conclusion(questionOne.starterCategory)
};

// Sub Questions
async function questionTwo(category){
    let actionChoices = ["View", "Add", "Delete"];
    if (category === "Employees"){
        actionChoices.splice("Update", 0, 3);
    };

    const questionTwo = await questioner([{
        type: "list",
        message: "Choose an action.",
        name: "catAction",
        choices: actionChoices
    }])

};

async function conclusion(category){
    const questionEnd = await questioner([{
        type: "list",
        message: "You have reached the end of your action.",
        name: "conclusion",
        choices: ["Continue", "Restart", "Quit"]
    }])
    switch(questionEnd.conclusion){
        case "Continue":
            const cont = await questionTwo(category);
        case "Restart":
            const restart = await starterQuestions();
        case "End":
            const end = await db.end();
    };
};


// Actions
async function viewSimple(table){
    const tableName = table.toLowerCase();
    const viewEntries = await myQuery(`SELECT * FROM ${tableName}`);
    print(...viewEntries)
    return;
};

async function addEntry(table){
    let continueEntries = True;
}

async function deleteEntry(table){
    let countinueDelete = True;
    const tableSingular = singular(table);
    while(countinueDelete === True){
        const entry = await questioner([{
            type: 'input',
            message: `Enter the ID of the ${tableSingular} you would like to delete.`,
            name: 'deleter'
        }])
        .then(async ({ deleter })=>{
            const fetchEntry = await myQuery(`SELECT * FROM ${table} WHERE id=${deleter}`)
        })
        const confirmName = ()=>{
            if (table === "Employees"){
                return
            }
        }
        const confirm = await questioner([{
            type: "list",
            message: `Delete ${confirmName()}?`,
            name: 'confirmDelete',
            choices: ['Yes', 'No']
        }])
        if (confirm.confirmDelete==='Yes'){
            const deleteQuery = await myQuery(`DELETE FROM ${table} WHERE id=${entry.deleter}`)
        }
        const continueDeleting = await questioner([{
            type: 'list',
            message: `Continue deleting?`,
            name: 'deleteRepeat',
            choices: ["Yes", 'No']
        }])
        if (continueDeleting.deleteRepeat==='No'){
            countinueDelete = False
        }}
};



// Utils

async function myQuery(query){
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