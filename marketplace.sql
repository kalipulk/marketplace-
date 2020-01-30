CREATE DATABASE marketplace_DB;

USE marketplace_DB;

CREATE TABLE products (
id INT NOT NULL AUTO_INCREMENT, 
name VARCHAR (50) NOT NULL,
department VARCHAR (50) NOT NULL,
price DECIMAL(10 , 2 ) NOT NULL,
quantity INT NOT NULL,
PRIMARY KEY (id)
);

INSERT INTO products (name, department, price, quantity)
VALUES ("Coffee Mug", "Home & Kitchen", 9.99, 20);

INSERT INTO products (name, department, price, quantity)
VALUES ("Sriracha", "Food & Grocery", 7.39, 40);

INSERT INTO products (name, department, price, quantity)
VALUES ("Avocados", "Food & Grocery", 2.50, 35);

INSERT INTO products (name, department, price, quantity)
VALUES ("Aloe Vera Plant", "Home & Kitchen", 17.42, 10);

INSERT INTO products (name, department, price, quantity)
VALUES ("Coconut Body Butter", "Beauty & Health", 20.54, 15);

INSERT INTO products (name, department, price, quantity)
VALUES ("Vitamin E Night Creaem", "Beauty & Health", 20.00, 15);

INSERT INTO products (name, department, price, quantity)
VALUES ("Vans Slip On Sneaker", "Clothing & Shoes", 63.91, 30);

INSERT INTO products (name, department, price, quantity)
VALUES ("Cardigan Sweater", "Clothing & Shoes", 49.99, 10);


SELECT * FROM products; 

