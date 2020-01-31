CREATE TABLE IF NOT EXISTS users(
                id SERIAL PRIMARY KEY ,
                email VARCHAR(100) NOT NULL UNIQUE,
                firstname VARCHAR(100),
                lastname VARCHAR(100),
                password text NOT NULL,
                phonenumber VARCHAR(19) NOT NULL,
                address VARCHAR(100) NOT NULL,
                isadmin BOOLEAN NOT NULL);


CREATE TABLE IF NOT EXISTS announcements(
                id SERIAL PRIMARY KEY ,
                owner INT NOT NULL,
                status VARCHAR(100),
                text TEXT NOT NULL,
                startdate DATE NOT NULL,
                enddate DATE NOT NULL);

INSERT INTO users (email, firstname, lastname, password, phonenumber, address, isadmin ) 
VALUES ('admin@admin.com','Admin','Admin','$2b$10$Cd/IsqS6d10l5lW4I7nKMOo9VFrKKOSZ/.DbEnTLdZRcp1OS5.CgK','078-090-0987','Gasabo',true)

