CREATE USER admin@localhost identified BY 'admin';
GRANT usage ON *.* TO admin@localhost identified BY 'admin';
CREATE DATABASE IF NOT EXISTS crossfitDB;
GRANT ALL privileges ON crossfitDB.* TO admin@localhost;
FLUSH PRIVILEGES;
USE crossfitDB;


DROP TABLE IF EXISTS exercises;
DROP TABLE IF EXISTS workoutType;
DROP TABLE IF EXISTS results;

CREATE TABLE exercises (
	id int PRIMARY KEY AUTO_INCREMENT,
	name varchar (50),
	description varchar (150)
) ENGINE InnoDB;



CREATE TABLE workoutType (
	id int PRIMARY KEY AUTO_INCREMENT,
	name varchar (50),
	description varchar (150)
) ENGINE InnoDB;

CREATE TABLE results (
	id int PRIMARY KEY AUTO_INCREMENT,
	userId int UNIQUE,
	workoutDate date,
	workoutType int NOT NULL,
	workoutExercise int NOT NULL,
	result varchar (255),
	comment varchar (255),
	FOREIGN KEY (workoutType) REFERENCES workoutType (id),
	FOREIGN KEY (workoutExercise) REFERENCES exercises (id)
) ENGINE InnoDB;
