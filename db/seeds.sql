USE Coconut;
--INSERT INTO Departments (name) VALUES ("IT");
--INSERT INTO Departments (name) VALUES ("Finance");
--INSERT INTO Departments (name )VALUES ("Marketing");

--INSERT INTO Roles (title, salary, department_id) VALUES ("manager", 60000, 1);
--INSERT INTO Roles (title, salary, department_id) VALUES ("accountant", 50000, 2);
--INSERT INTO Roles (title, salary, department_id) VALUES ("sales person", 40000, 3);

INSERT INTO Employees (first_name, last_name, role_id, manager_id) VALUES ("Alyssa", "Heap", 1, NULL);
INSERT INTO Employees (first_name, last_name, role_id, manager_id) VALUES ("Quinn", "Heap", 2, 1);