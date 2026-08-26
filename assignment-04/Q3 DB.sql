CREATE DATABASE retail_store;

USE  retail_store; 
 
 
 CREATE TABLE suppliers (
id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
s_name VARCHAR(100) NOT NULL ,
ContactNumber VARCHAR(100) NOT NULL 

) ;

CREATE TABLE products(
p_id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY ,
p_name VARCHAR(100) NOT NULL , 
price DECIMAL(10,2) NOT NULL CHECK (price>=0),
supplier_id INT  UNSIGNED NOT NULL   ,
FOREIGN KEY(supplier_id)
REFERENCES 
suppliers(id)


);


CREATE TABLE sales(
id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
quantity_sold INT  UNSIGNED NOT NULL CHECK(quantity_sold >0) ,
sale_date DATE NOT NULL,
product_id INT UNSIGNED NOT NULL,

FOREIGN KEY (product_id)
REFERENCES products(p_id)

);