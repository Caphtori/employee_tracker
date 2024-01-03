const questions = [];

class Question{
    constructor(name, message){
        this.name = name;
        this.message = message;
    };
};

class Input extends Question{
    constructor(name, message){
        super(name, message);
        questions.push({
            type: "input",
            message: this.message,
            name: this.name
        })
    };
};

class List extends Question{
    constructor(name, message, choices){
        super(name, message);
        this.choices = choices;
        questions.push({
            type: "list",
            message: this.message,
            name: this.name,
            choices: this.choices
        })
    };
};

const tableNames = () =>
  fetch('/api/tables', {
    method: 'GET',
  })
  .then((res)=>res.json)
  .then((data)=>data.map((table)=>table.Tables_in_employees_db.charAt(0).toUpperCase()+table.Tables_in_employees_db.slice(1)))

const showTable = new List("showTable", "")

modules.exports = questions