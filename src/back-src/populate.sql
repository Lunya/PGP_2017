INSERT INTO User(name, password, mail) VALUES
	('john', 'doe', 'john@doe.fr'),
	('neko', 'nyen', 'neko@nyan.com');

INSERT INTO Project(name, description, git, begin) VALUES
	('Project 1', 'Description of a project', TO_DATE('17/12/2015', 'DD/MM/YYYY')),
	('Project 2', 'Another description of a project', TO_DATE('12/7/2017', 'DD/MM/YYYY'));

INSERT INTO User_Project(id_project, id_user) VALUES
	(0, 0),
	(1, 0);

INSERT INTO UserStory(id_project, description, difficulty, priority) VALUES
	(0, 'Some user story', 1, 1),
	(1, 'Some other user story', 2, 1);
