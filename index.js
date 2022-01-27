const inquirer = require("inquirer");

const getUserRequest = function() {
    inquirer.prompt( {
        type: "input",
        name: "request",
        message: "What would you like to do?"
    }).then(({ request }) => {
        console.log(request);
    })
}

getUserRequest();