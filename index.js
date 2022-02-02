const inquirer = require("inquirer");
const mysql = require("mysql2");
const cTable = require("console.table");

const getUserRequest = function () {
    inquirer.prompt({
        type: "input",
        name: "request",
        message: `What would you like to do? 
        View departments, 
        View roles, 
        View employees, 
        Add department, 
        Add role, 
        add employee, 
        update employee?`
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
        if (request.toLowerCase() == "add department") {
            addDepartment();
        }
        if (request.toLowerCase() == "add role") {
            addRole();
        }
        if (request.toLowerCase() == "add employee") {
            addEmployee();
        }
        if (request.toLowerCase() == "update employee") {
            updateEmployee();
        }
    })
}
const getConnection = function () {
    const connection = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "coconuts",
        database: "Coconut"
    });
    return connection;


}

const showDepartments = function () {
    const connection = getConnection();
    connection.query("select * from departments", function (err, results, fields) {
        console.table(results);
        getUserRequest();
    })
};

const showRoles = function () {
    const connection = getConnection();
    connection.query("select * from roles", function (err, results, fields) {
        console.table(results);
        getUserRequest();

    })

}

const showEmployees = function () {
    const connection = getConnection();
    connection.query(`select emp.id, emp.first_name, emp.last_name, r.title, d.name, r.salary, manager.first_name as 'manager first name',
     manager.last_name as 'manager last name' from employees emp
     join roles r on r.id = emp.role_id 
     join departments d on d.id = r.department_id 
     left outer join employees manager on manager.id = emp.manager_id 
    `, function (err, results, fields) {
        if (err) {
            console.log(err);
        }
        console.table(results);
        getUserRequest();

    })
}

const addDepartment = function () {
    inquirer.prompt({
        type: "input",
        name: "name",
        message: "What is the department name?"
    })
        .then(({ name }) => {
            const connection = getConnection()
            connection.query("insert into departments (name) values(?)", name, function (err, results, fields) {
                if (err) {
                    console.log(err);
                }
                showDepartments();
            })
        })
}

const addRole = function () {
    inquirer.prompt([{
        type: "input",
        name: "name",
        message: "What is the role name?"
    },
    {
        type: "input",
        name: "salary",
        message: "What is the salary?"
    },
    {
        type: "input",
        name: "department",
        message: "What is the department id?"

    }])
    .then(({ name, salary, department }) => {
        const connection = getConnection()
            connection.query("insert into roles (title, salary, department_id) values(?,?,?)", [name, salary, department], function (err, results, fields) {
                if (err) {
                    console.log(err);
                }
                showRoles();
            })
    });
};

const addEmployee = function() {
    inquirer.prompt([{
        type: "input",
        name: "first_name",
        message: "What is the employees first name?"
    },{
        type: "input",
        name: "last_name",
        message: "What is the employees last name?"
    },{
        type: "input",
        name: "role",
        message: "What is the employees role id?"
    },{
        type: "input",
        name: "manager",
        message: "What is the id of the manager?"
    }])
    .then(({ first_name, last_name, role, manager }) => {
        const connection = getConnection()
            connection.query("insert into employees (first_name, last_name, role_id, manager_id) values(?,?,?,?)", [first_name, last_name, role, manager], function (err, results, fields) {
                if (err) {
                    console.log(err);
                }
                showEmployees();
            });
    });

};

const updateEmployee = function() {
    inquirer.prompt([ {
        type: "input",
        name: "employee",
        message: "What is the employee id?"
    },{
        type: "input",
        name: "role",
        message: "What is the new role id?"
    }])
    .then(({ employee, role }) => {
        const connection = getConnection()
        connection.query("update employees set role_id = ? where id = ?", [role, employee], function (err, results, fields) {
            if (err) {
                console.log(err);
            }
            showEmployees()
        })
    })
}

getUserRequest();