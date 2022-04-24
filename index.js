const inquirer = require("inquirer");
require("console.table");
const store = require("./store");

startPrompt();

function startPrompt() {
  inquirer
    .prompt({
      type: "list",
      name: "task",
      message: "What would you like to do?",
      choices: [
        "View Employees",
        "View Departments",
        "View All Roles",
        "View Employees By Department",
        "Add Employee",
        "Remove Employee",
        "Update Employee Role",
        "Add New Role",
        "Add New Department",
        "End",
      ],
    })
    .then(function ({ task }) {
      switch (task) {
        case "View Employees":
          viewEmployees();
          break;
        case "View Departments":
          viewDepartments();
          break;
        case "View All Roles":
          viewAllRoles();
          break;
        case "View Employees By Department":
          viewEmpByDept();
          break;
        case "Add Employee":
          addEmployee();
          break;
        case "Remove Employee":
          removeEmployee();
          break;
        case "Update Employee Role":
          updateEmployeeRole();
          break;
        case "Add New Role":
          addRole();
          break;
        case "Add New Department":
          addDepartment();
          break;
        case "End":
          end();
          break;
      }
    });
}

function viewEmployees() {
  store
    .viewEmployees()
    .then(([employees]) => {
      console.table(employees);
    })
    .then(() => {
      startPrompt();
    });
}

function viewDepartments() {
  store
    .viewDepartments()
    .then(([departments]) => {
      console.table(departments);
    })
    .then(() => {
      startPrompt();
    });
}

function viewAllRoles() {
  store
    .viewAllRoles()
    .then(([roles]) => {
      console.table(roles);
    })
    .then(() => {
      startPrompt();
    });
}

function viewEmpByDept() {
  console.log("viewing employees by department");
}

function addEmployee() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "first_name",
        message: "What is the employee's first name?",
      },
      {
        type: "input",
        name: "last_name",
        message: "What is the employee's last name?",
      },
    ])
    .then(({ first_name, last_name }) => {
      store.viewAllRoles().then(([roles]) => {
        const roleChoices = roles.map((role) => {
          return {
            name: role.title,
            value: role.id,
          };
        });
        inquirer
          .prompt([
            {
              type: "list",
              name: "role",
              message: "What is the employee's role?",
              choices: roleChoices,
            },
          ])
          .then(({ role }) => {
            store.viewEmployees().then(([employees]) => {
              const managerChoices = employees.map((manager) => {
                return {
                  name: `${manager.first_name} ${manager.last_name}`,
                  value: manager.id,
                };
              });
              managerChoices.push({
                name: "No Manager",
                value: null,
              });
              inquirer
                .prompt([
                  {
                    type: "list",
                    name: "manager",
                    message: "Who is the employee's manager",
                    choices: managerChoices,
                  },
                ])
                .then(({ manager }) => {
                  let newEmployee = {
                    first_name,
                    last_name,
                    role_id: role,
                    manager_id: manager,
                  };
                  store.addEmployee(newEmployee);
                })
                .then(() => {
                  console.log("Employee added to database");
                  startPrompt();
                });
            });
          });
      });
    });
}

function viewAllRoles() {
  console.log("viewing roles");
  startPrompt();
}

function viewEmpByDept() {
  console.log("viewing emp by dept");
  startPrompt();
}

function removeEmployee() {
  console.log("remove employees");
  startPrompt();
}

function updateEmployeeRole() {
  console.log("update employees");
  startPrompt();
}

function addRole() {
  console.log("add role");
  startPrompt();
}

function addDepartment() {
  console.log("add department");
  startPrompt();
}

function end() {
  console.log("Goodbye");
  process.exit();
}
