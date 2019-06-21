CREATE TABLE IF NOT EXISTS ft_table (
	id INT(11) PRIMARY KEY AUTO_INCREMENT NOT NULL,
	login VARCHAR(10)  NOT NULL DEFAULT 'toto',
	`group` ENUM('staff','student','other') NOT NULL,
	creation_date DATE NOT NULL
);