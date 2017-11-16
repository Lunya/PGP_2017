CREATE TABLE Project (
		id            BIGINT(20)        UNSIGNED        PRIMARY KEY        AUTO_INCREMENT,
		name          VARCHAR(50)       NOT NULL,
		description   VARCHAR(2000),
		git           VARCHAR(512),
		begin         DATE            	NOT NULL,
		end           DATE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE utf8_bin;

CREATE TABLE User (
		id          	BIGINT(20)        	UNSIGNED        PRIMARY KEY      AUTO_INCREMENT,
		name        	VARCHAR(50)       	NOT NULL,
		password    	VARCHAR(512)    		NOT NULL,
		mail        	VARCHAR(100)    		NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE utf8_bin;

CREATE TABLE User_Project (
		id_project    BIGINT(20)        UNSIGNED,
		id_user       BIGINT(20)        UNSIGNED,
		FOREIGN KEY (id_project) REFERENCES Project(id),
		FOREIGN KEY (id_user) REFERENCES User(id),
		PRIMARY KEY (id_project, id_user)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE utf8_bin;

CREATE TABLE UserStory (
    id            BIGINT(20)        UNSIGNED        PRIMARY KEY        AUTO_INCREMENT,
    id_project    BIGINT(20)        UNSIGNED        NOT NULL,
    description   VARCHAR(512)    	NOT NULL,
    difficulty    INT(11)           UNSIGNED        DEFAULT 1 				 NOT NULL,
    priority    	INT(11)           UNSIGNED        DEFAULT 1					 NOT NULL,
    FOREIGN KEY (id_project) REFERENCES Project(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE utf8_bin;

CREATE TABLE Sprint (
    id            BIGINT(20)        UNSIGNED        PRIMARY KEY        AUTO_INCREMENT,
    id_project    BIGINT(20)        UNSIGNED        NOT NULL,
    begin        	DATE            	NOT NULL,
    end           DATE,
    FOREIGN KEY (id_project) REFERENCES Project(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE utf8_bin;

CREATE TABLE UserStory_Sprint (
    id_us    		 BIGINT(20)        UNSIGNED,
    id_sprint    BIGINT(20)        UNSIGNED,
    FOREIGN KEY (id_us) REFERENCES UserStory(id),
    FOREIGN KEY (id_sprint) REFERENCES Sprint(id),
    PRIMARY KEY (id_us, id_sprint)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE utf8_bin;
