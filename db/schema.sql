
### Schema
CREATE DATABASE my_schema; 
USE my_schema; 
 
 
CREATE TABLE dbconfig 
( 
 	`id` INT UNSIGNED NOT NULL AUTO_INCREMENT, 
    `username` VARCHAR(20) NOT NULL, 
    `password` CHAR(60) NOT NULL, 
    PRIMARY KEY (`id`), 
    UNIQUE INDEX `id_UNIQUE` (`id` ASC), 
    UNIQUE INDEX `username_UNIQUE` (`username` ASC) 
 ); 


create table foodinfo
(
	id int not null auto_increment,
    mealtype varchar(255) not null,
    date timestamp default now() on update now(),
    restaurant varchar(255) not null,
    cost decimal(5,2),
    Fid varchar(255) not null,
    primary key (id)
);