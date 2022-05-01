const connection = require("./connection");

class Store {
  constructor(connection) {
    this.connection = connection;
  }
  viewEmployees() {
    return this.connection.promise().query("SELECT * FROM employee");
  }

  viewDepartments() {
    return this.connection.promise().query("SELECT * FROM department");
  }

  viewAllRoles() {
    return this.connection.promise().query("SELECT * FROM role");
  }

  addEmployee(newEmployee) {
    return this.connection
      .promise()
      .query("INSERT INTO employee SET ?", newEmployee);
  }

  // viewEmpByDept() {}

  // removeEmployee() {
  //   return this.connection
  //     .promise()
  //     .query("DELETE FROM employee SET ?", removedEmployee);
  // }
}

module.exports = new Store(connection);
