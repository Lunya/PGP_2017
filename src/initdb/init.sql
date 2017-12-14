CREATE DATABASE IF NOT EXISTS pgp;
USE pgp;

CREATE TABLE Project (
	id			BIGINT(20)		UNSIGNED		PRIMARY KEY		AUTO_INCREMENT,
	name		VARCHAR(50)		NOT NULL,
	description	VARCHAR(2000),
	url			VARCHAR(512),
	begin		DATE			NOT NULL,
	end			DATE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE utf8_bin;


CREATE TABLE User (
	id			BIGINT(20)		UNSIGNED		PRIMARY KEY		AUTO_INCREMENT,
	name		VARCHAR(50)		NOT NULL,
	password	VARCHAR(512)	NOT NULL,
	mail		VARCHAR(100)	NOT NULL,
	UNIQUE(mail)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE utf8_bin;


CREATE TABLE User_Project (
	id_project	BIGINT(20)		UNSIGNED,
	id_user		BIGINT(20)		UNSIGNED,
	status	enum('OWNER', 'DEVELOPER')	NOT NULL	DEFAULT 'DEVELOPER',
	FOREIGN KEY (id_project) REFERENCES Project(id) ON DELETE CASCADE,
	FOREIGN KEY (id_user) REFERENCES User(id) ON DELETE CASCADE,
	PRIMARY KEY (id_project, id_user)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE utf8_bin;


CREATE TABLE UserStory (
	id			BIGINT(20)		UNSIGNED		PRIMARY KEY		AUTO_INCREMENT,
	id_project	BIGINT(20)		UNSIGNED		NOT NULL,
	description	VARCHAR(512)	NOT NULL,
	difficulty	INT(11)			UNSIGNED		NOT NULL,
	priority	INT(11)			UNSIGNED		NOT NULL,
	state		ENUM('TODO', 'DONE')	NOT NULL		DEFAULT 'TODO',
	FOREIGN KEY (id_project) REFERENCES Project(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE utf8_bin;


CREATE TABLE Sprint (
	id					BIGINT(20)		UNSIGNED		PRIMARY KEY		AUTO_INCREMENT,
	id_project	BIGINT(20)		UNSIGNED		NOT NULL,
	begin		DATE			NOT NULL,
	end			DATE,
	FOREIGN KEY (id_project) REFERENCES Project(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE utf8_bin;


CREATE TABLE UserStory_Sprint (
	id_us			BIGINT(20)			UNSIGNED		NOT NULL,
	id_sprint	BIGINT(20)			UNSIGNED		NOT NULL,
	FOREIGN KEY (id_us) REFERENCES UserStory(id) ON DELETE CASCADE,
	FOREIGN KEY (id_sprint) REFERENCES Sprint(id) ON DELETE CASCADE,
	PRIMARY KEY (id_us, id_sprint)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE utf8_bin;


CREATE TABLE Task (
	id			BIGINT(20)		UNSIGNED		PRIMARY KEY		AUTO_INCREMENT,
	id_sprint	BIGINT(20)		UNSIGNED	NOT NULL,
	description	VARCHAR(512)	NOT NULL,
	developer VARCHAR(50),
	state		ENUM('TODO', 'DOING', 'DONE')	NOT NULL		DEFAULT 'TODO',
	FOREIGN KEY (id_sprint) REFERENCES Sprint(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE utf8_bin;



CREATE TABLE Version (
	id			BIGINT(20)		UNSIGNED		PRIMARY KEY		AUTO_INCREMENT,
	num_version_maj	BIGINT(20)		UNSIGNED NOT NULL,
	num_version_min BIGINT(20)    UNSIGNED NOT NULL,
	id_project	BIGINT(20)		UNSIGNED	NOT NULL,
	link_source VARCHAR(512) NOT NULL,
	link_build		VARCHAR(512) NOT NULL,
	link_test VARCHAR(512),
	link_doc VARCHAR(512),
	FOREIGN KEY (id_project) REFERENCES Project(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE utf8_bin;


/*CREATE TABLE UserStory (
	id			BIGINT(20)		UNSIGNED		PRIMARY KEY		AUTO_INCREMENT,
	id_us			BIGINT(20)		UNSIGNED		NOT NULL,
	id_project	BIGINT(20)		UNSIGNED		NOT NULL,
	description	VARCHAR(512)	NOT NULL,
	difficulty	INT(11)			UNSIGNED		NOT NULL,
	priority	INT(11)			UNSIGNED		NOT NULL,
	state		ENUM('TODO', 'DONE')	NOT NULL		DEFAULT 'TODO',
	FOREIGN KEY (id_project) REFERENCES Project(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE utf8_bin;

CREATE TABLE Sprint (
	id					BIGINT(20)		UNSIGNED		PRIMARY KEY		AUTO_INCREMENT,
	id_sprint		BIGINT(20)		UNSIGNED		NOT NULL,
	id_project	BIGINT(20)		UNSIGNED		NOT NULL,
	begin		DATE			NOT NULL,
	end			DATE,
	FOREIGN KEY (id_project) REFERENCES Project(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE utf8_bin;

CREATE TABLE UserStory_Sprint (
	id_us			BIGINT(20)			UNSIGNED		NOT NULL,
	id_sprint	BIGINT(20)			UNSIGNED		NOT NULL,
	FOREIGN KEY (id_us) REFERENCES UserStory(id) ON DELETE CASCADE,
	FOREIGN KEY (id_sprint) REFERENCES Sprint(id) ON DELETE CASCADE,
	PRIMARY KEY (id_us, id_sprint)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE utf8_bin;

CREATE TABLE Task (
	id			BIGINT(20)		UNSIGNED		PRIMARY KEY		AUTO_INCREMENT,
	id_task	BIGINT(20)		UNSIGNED		NOT NULL,
	id_sprint	BIGINT(20)		UNSIGNED	NOT NULL,
	description	VARCHAR(512)	NOT NULL,
	state		ENUM('TODO', 'DOING', 'DONE')	NOT NULL		DEFAULT 'TODO',
	FOREIGN KEY (id_sprint) REFERENCES Sprint(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE utf8_bin;
*/
