CREATE DATABASE retail_store;
USE  retail_store; 


 CREATE TABLE suppliers (
id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
supplier_name VARCHAR(100) NOT NULL ,
contact_number VARCHAR(100) NOT NULL  UNIQUE
) ;

CREATE TABLE products(
p_id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY ,
p_name VARCHAR(100) NOT NULL , 
price DECIMAL(10,2) NOT NULL CHECK (price>=0),
Stock_Quantity INT UNSIGNED NOT Null,
supplier_id INT  UNSIGNED NOT NULL   ,

FOREIGN KEY(supplier_id)
REFERENCES 
suppliers(id)
ON DELETE CASCADE


);
CREATE TABLE sales(
id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
quantity_sold INT  UNSIGNED NOT NULL CHECK(quantity_sold >0) ,
sale_date DATETIME DEFAULT CURRENT_TIMESTAMP ,
product_id INT UNSIGNED NOT NULL,

FOREIGN KEY (product_id)
REFERENCES products(p_id)
ON DELETE CASCADE


);


INSERT INTO suppliers (supplier_name, contact_number)
VALUES
('Tech Supplier', '01012345678'),
('Global Electronics', '01123456789'),
('Smart Store', '01234567890'),
('Future Supplies', '01512345678'),
('Digital World', '01098765432');

INSERT INTO products
(p_name, price, Stock_Quantity, supplier_id)
VALUES
('Laptop', 25000.00, 15, 1),
('Wireless Mouse', 750.00, 50, 2),
('Mechanical Keyboard', 1800.00, 30, 3),
('Monitor 24 Inch', 6500.00, 20, 1),
('USB-C Cable', 300.00, 100, 4),
('Headphones', 2200.00, 40, 5),
('Webcam', 1500.00, 25, 2),
('Power Bank', 1200.00, 60, 3);

INSERT INTO sales
(quantity_sold, product_id)
VALUES
(2, 1),
(5, 2),
(3, 3),
(4, 2),
(1, 4),
(10, 5),
(6, 6),
(3, 7),
(8, 8),
(2, 1),
(7, 5),
(4, 8),
(5, 3),
(2, 6),
(3, 2);


select * from products;

select * from sales;
select *
from products inner join suppliers 
on products.supplier_id=suppliers.id;

