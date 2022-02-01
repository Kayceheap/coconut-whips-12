const inquirer = require("inquirer");
const mysql = require("mysql2");
const cTable = require("console.table");

const getUserRequest = function() {
    inquirer.prompt( {
        type: "input",
        name: "request",
        message: "What would you like to do?"
    }).then(({ request }) => {
        if (request.toLowerCase() == "view departments") {
            showDepartments();
        } 
        if (request.toLowerCase() == "view roles") {
            showRoles();
        }
        if (request.toLowerCase() == "view employees") {
            showEmployees();
        }
        console.log(request);
      
    })
}
const getConnection = function() {
    const connection = mysql.createConnection( {
        host: "localhost", 
        user: "root",
        password: "coconuts",
        database: "Coconut"
    });
    return connection;
   
    
}

const showDepartments = function() {
    const connection = getConnection();
    connection.query("select * from departments", function(err, results, fields) {
        console.table(results);
        getUserRequest();
    })
};

const showRoles = function() {
    const connection = getConnection();
    connection.query("select * from roles", function(err, results, fields) {
        console.table(results);
        getUserRequest();
        
    })
    
}

const showEmployees = function() {
    const connection = getConnection();
    connection.query(`select emp.id, emp.first_name, emp.last_name, r.title, d.name, r.salary, manager.first_name as 'manager first name',
     manager.last_name as 'manager last name' from employees emp
     join roles r on r.id = emp.role_id 
     join departments d on d.id = r.department_id 
     left outer join employees manager on manager.id = emp.manager_id 
    `, function(err, results, fields) {
        if (err) {
            console.log(err);
        }
        console.table(results);
        getUserRequest();
        
    })
}

getUserRequest();