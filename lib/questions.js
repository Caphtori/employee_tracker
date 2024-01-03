const questions = [];

const answerData = {
    raw: 'test',
    options: [],
    name: ()=> this.raw.Tables_in_employees_db.charAt(0).toUpperCase()+this.raw.Tables_in_employees_db.slice(1),
    sqlName: ()=>this.raw.toUpperCase(),
};

class Question{
    constructor(name, message, query){
        this.name = name;
        this.message = message;
        this.query = query;
    };
};

class Input extends Question{
    constructor(name, message, query){
        super(name, message, query);
        questions.push({
            type: "input",
            message: this.message,
            name: this.name
        })
    };
};

class List extends Question{
    constructor(name, message, query, choices){
        super(name, message, query);
        this.choices = choices;
        questions.push({
            type: "list",
            message: this.message,
            name: this.name,
            choices: this.choices
        })
    };
};

const startingQuestion = new List("start", "Select Catagory", NULL, answerData.options)
const show = new List("show", `SELECT * FROM ${answerData.sqlName}`)
const add = new Input("add", ``)

modules.exports = { questions, answerData }