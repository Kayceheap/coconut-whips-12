CREATE TABLE Departments (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR (30)
);

CREATE TABLE Roles (
    id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR (30),
    salary DECIMAL,
    department_id INT,
    FOREIGN KEY (department_id) REFERENCES Departments(id)
);

CREATE TABLE Employees (
    id INT PRIMARY KEY AUTO_INCREMENT,
    first_name VARCHAR (30),
    last_name VARCHAR (30),
    role_id INT,
    manager_id INT
);